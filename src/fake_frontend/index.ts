import { FFWSApi } from '@/apigen/FFWSApi';
import CardTemplate from '@/trpg/card_template/v3/CardTemplate';
import Card from '@/trpg/card/Card';
import type { InitGameEvent } from '@/apigen/generated/script/init';
import { PropertyType } from '@/trpg/card_template/v2/Property';
import EvalScript from '@/trpg/script/EvalScript';

class Room {
    private static maxId = 0;
    id: number;
    name: string;
    template: CardTemplate;
    scripts: string[];
    cards = new Map<string, Card>();
    constructor(request: InitGameEvent) {
        this.id = Room.maxId++;
        this.name = request.roomId;
        this.template = new CardTemplate(JSON.parse(request.template.value));
        this.scripts = request.template.scripts;
        for (let i = 0; i < request.cards.length; i++) {
            const player = request.players[i];
            const card = Card.fromJSON(request.cards[i]);
            this.cards.set(player, card);
        }
    }
}

export default class FakeFrontend {
    private socket = new FFWSApi();
    private rooms = new Map<number, Room>();
    private userRooms = new Map<string, Room>();
    constructor() {
        this.socket.subscribe('script:init_game', (data) => {
            const room = new Room(data);
            this.rooms.set(room.id, room);
            room.cards.forEach((_value, key) => {
                this.userRooms.set(key, room);
            });
            this.socket.emitToSocket('script:on_init_game', {
                roomId: room.name,
                gameId: room.id,
            });
        });
        this.socket.subscribe('script:clean_game', (data) => {
            const room = this.rooms.get(data.gameId);
            if (room != null) {
                room.cards.forEach((_value, key) => {
                    this.userRooms.delete(key);
                });
            }
            this.rooms.delete(data.gameId);
            this.socket.emitToSocket('script:on_clean_game', {});
        });
        this.socket.subscribe('script:edit_card', (data) => {
            const room = this.userRooms.get(data.user);
            if (room == null) {
                this.socket.emitToSocket('script:on_edit_card', {
                    code: 2,
                    card: null as any,
                    user: null as any,
                    roomId: null as any,
                });
                return;
            }
            const card = room.cards.get(data.user);
            if (card == null) {
                this.socket.emitToSocket('script:on_edit_card', {
                    code: 4,
                    card: null as any,
                    user: null as any,
                    roomId: null as any,
                });
                return;
            }
            const property = room.template.properties.get(data.propertyId);
            if (
                property == null ||
                (property.type != PropertyType.INT &&
                    property.type != PropertyType.BOOL &&
                    property.type != PropertyType.FLOAT &&
                    property.type != PropertyType.SELECTION &&
                    property.type != PropertyType.STRING)
            ) {
                this.socket.emitToSocket('script:on_edit_card', {
                    code: 3,
                    card: null as any,
                    user: null as any,
                    roomId: null as any,
                });
                return;
            }
            card.properties.set(data.propertyId, data.newValue);

            this.socket.emitToSocket('script:on_edit_card', {
                code: 0,
                card: JSON.stringify(card),
                user: data.user,
                roomId: room.name,
            });
        });
        this.socket.subscribe('script:exec', (data) => {
            const room = this.userRooms.get(data.user);
            if (room == null) {
                this.socket.emitToSocket('script:on_exec', {
                    code: 2,
                    card: null as any,
                    roomId: null as any,
                    user: null as any,
                });
                return;
            }
            const card = room.cards.get(data.user);
            if (card == null) {
                this.socket.emitToSocket('script:on_exec', {
                    code: 4,
                    card: null as any,
                    roomId: null as any,
                    user: null as any,
                });
                return;
            }
            try {
                const script = room.scripts[data.scriptId];
                const evalScript = new EvalScript(script);
                evalScript.run(card, room.template.v2, room.scripts);
                this.socket.emitToSocket('script:on_exec', {
                    code: 0,
                    card: JSON.stringify(card),
                    roomId: room.name,
                    user: data.user,
                });
            } catch (err) {
                this.socket.emitToSocket('script:on_exec', {
                    code: 3,
                    card: null as any,
                    roomId: null as any,
                    user: null as any,
                });
            }
        });
    }
}
