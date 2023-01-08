<template>
    <ListComponent :list="cardList" :page="currentPage" />
</template>

<script lang="ts">
import { HTTPApi } from '@/apigen';
import type { Card } from '@/apigen/generated/card/get';
import ListComponent from '@/components/list/ListComponent.vue';
import { ListObject } from '@/component_logics/ListObject';
import { useCEStore } from '@/stores/cardEditor';
import { useUserStore } from '@/stores/user';
import CardObj from '@/trpg/card/Card';
import { defineComponent } from 'vue';

class CardList extends ListObject<Card> {
    private gotPages = -1;
    async pages(): Promise<number> {
        if (this.gotPages < 0) {
            this.gotPages = (
                await HTTPApi.post('/card/get-mine', {
                    session: useUserStore().session,
                    page: 1,
                    pageSize: this.perPage,
                })
            ).pages;
        }
        return this.gotPages;
    }
    async get(page: number): Promise<Card[]> {
        return (
            await HTTPApi.post('/card/get-mine', {
                session: useUserStore().session,
                page: page,
                pageSize: this.perPage,
            })
        ).cards;
    }
    getImage(item: Card): string {
        return '';
    }
    getName(item: Card): string {
        return item.name;
    }
    getDescription(item: Card): string {
        return `id: ${item.id}`;
    }
    onItemClick(item: Card): void {}
}

export default defineComponent({
    components: { ListComponent },
    data() {
        return {
            cardList: new CardList(),
            currentPage: 1,
        };
    },
    mounted() {
        this.cardList.onItemClick = (item) => {
            useCEStore().card = CardObj.fromJSON(item.value);
            useCEStore().canEdit = false;
            HTTPApi.post('/card-template/get-by-id', {
                session: useUserStore().session,
                id: useCEStore().card.templateId,
            }).then((value) => {
                useCEStore().templateId = value.template.id;
                useCEStore().template = JSON.parse(value.template.value);
                useCEStore().scripts = value.template.scripts;
                this.$router.push('/card-edit');
            });
        };
    },
});
</script>
