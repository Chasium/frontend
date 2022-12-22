<template>
    <el-form label-width="15em">
        <el-form-item label="新人物卡模板名称">
            <el-input v-model="newName"></el-input>
        </el-form-item>
        <el-button @click="newTemplate">新建</el-button>
    </el-form>
    <ListComponent :list="templateList" :page="currentPage" />
</template>

<script lang="ts">
import { HTTPApi } from '@/apigen';
import type { CardTemplate } from '@/apigen/generated/card_template/get_mine';
import ListComponent from '@/components/list/ListComponent.vue';
import { ListObject } from '@/component_logics/ListObject';
import { useCEStore } from '@/stores/cardEditor';
import { useTEStore } from '@/stores/templateEditor';
import { useTEPStore } from '@/stores/templateEditorPersist';
import { useUserStore } from '@/stores/user';
import CardTemplateV1 from '@/trpg/card_template/CardTemplate';
import { TemplateBuilder } from '@/trpg/card_template/TemplateBuilder';
import { defineComponent } from 'vue';

class TemplateList extends ListObject<CardTemplate> {
    private gotPages = -1;
    async pages(): Promise<number> {
        if (this.gotPages < 0) {
            this.gotPages = (
                await HTTPApi.post('/card-template/get-mine', {
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
        return '';
    }
    onItemClick(item: CardTemplate): void {}
}

export default defineComponent({
    components: { ListComponent },
    data() {
        return {
            templateList: new TemplateList(),
            currentPage: 1,
            newName: '',
        };
    },
    mounted() {
        this.templateList.onItemClick = (item: CardTemplate) => {
            const raw = JSON.parse(item.value);
            useTEPStore().currentTemplate = TemplateBuilder.v2Tov1(
                raw,
                item.scripts
            );
            useTEStore().buildTree();
            useTEStore().currentTemplateId = item.id;
            this.$router.push('/template-edit');
        };
    },
    methods: {
        async newTemplate() {
            useTEPStore().currentTemplate = new CardTemplateV1(
                this.newName,
                '',
                false,
                '',
                -1,
                '',
                ''
            );
            useTEStore().buildTree();
            const response = await HTTPApi.post('/card-template/create', {
                name: this.newName,
                session: useUserStore().session,
                template: JSON.stringify(
                    TemplateBuilder.v1Tov2(useTEPStore().currentTemplate)
                        .template
                ),
                scripts: [],
            });
            if (response.code != 0) {
                alert(`错误，代码：${response.code}`);
            } else {
                useTEStore().currentTemplateId = response.id;
                this.$router.push('/template-edit');
            }
        },
    },
});
</script>
