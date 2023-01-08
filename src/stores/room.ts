import CardTemplate from '@/trpg/card_template/v2/CardTemplate';
import type Card from '@/trpg/card/Card';
import { defineStore } from 'pinia';

export const useRoomStore = defineStore('room', {
    state() {
        return {
            template: new CardTemplate('', '', false, -1, -1, -1, -1),
            scripts: [] as string[],
            cardMap: new Map<string, Card>(),
        };
    },
});
