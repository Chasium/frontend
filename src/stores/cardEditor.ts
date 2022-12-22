import Card from '@/trpg/card/Card';
import CardTemplate from '@/trpg/card_template/v2/CardTemplate';
import { defineStore } from 'pinia';

export const useCEStore = defineStore('cardEditor', {
    state() {
        return {
            templateId: -1,
            template: new CardTemplate('', '', false, -1, -1, -1, -1),
            card: new Card(-1),
            scripts: [] as string[],
            cardName: '',
            canEdit: false,
        };
    },
    persist: {
        enabled: true,
    },
});
