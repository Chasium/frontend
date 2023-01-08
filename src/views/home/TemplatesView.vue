<template>
    <ListComponent :list="templateList" :page="currentPage"></ListComponent>
</template>

<script lang="ts">
import { HTTPApi } from '@/apigen';
import type { CardTemplate } from '@/apigen/generated/card_template/get_mine';
import ListComponent from '@/components/list/ListComponent.vue';
import { ListObject } from '@/component_logics/ListObject';
import { useCEStore } from '@/stores/cardEditor';
import { useUserStore } from '@/stores/user';
import Card from '@/trpg/card/Card';
import { defineComponent } from 'vue';

class TemplateList extends ListObject<CardTemplate> {
    private gotPages = -1;
    async pages(): Promise<number> {
        if (this.gotPages < 0) {
            this.gotPages = (
                await HTTPApi.post('/card-template/get', {
                    session: useUserStore().session,
                    page: 1,
                    pageSize: this.perPage,
                })
            ).pages;
        }
        return this.gotPages;
    }
    async get(page: number): Promise<CardTemplate[]> {
        return (
            await HTTPApi.post('/card-template/get', {
                session: useUserStore().session,
                page: page,
                pageSize: this.perPage,
            })
        ).templates;
    }
    getImage(item: CardTemplate): string {
        return '';
    }
    getName(item: CardTemplate): string {
        return item.name;
    }
    getDescription(item: CardTemplate): string {
        return `id: ${item.id}`;
    }
    onItemClick(item: CardTemplate): void {}
}

export default defineComponent({
    components: { ListComponent },
    data() {
        return {
            templateList: new TemplateList(),
            currentPage: 1,
        };
    },
    mounted() {
        this.templateList.onItemClick = (item: CardTemplate) => {
            useCEStore().templateId = item.id;
            useCEStore().template = JSON.parse(item.value);
            useCEStore().scripts = item.scripts;
            useCEStore().card = new Card(useCEStore().templateId);
            useCEStore().canEdit = true;
            this.$router.push('/card-edit');
        };
    },
});
</script>
