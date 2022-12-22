import type CardTemplate from '../card_template/v2/CardTemplate';

export default class Card {
    readonly properties = new Map<number, any>();
    constructor(readonly templateId: number) {}
    toJSON() {
        const temp: any[] = [];
        this.properties.forEach((value, key) => {
            temp.push({ key: key, value: value });
        });
        return {
            properties: temp,
            templateId: this.templateId,
        };
    }
    static fromJSON(json: string) {
        const obj = JSON.parse(json) as any;
        const out = new Card(obj.templateId);
        const temp = obj.properties as any[];
        temp.forEach((value) => out.properties.set(value.key, value.value));
        return out;
    }
}
