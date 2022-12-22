<template>
    <el-container class="big-frame">
        <el-header class="editor-header">
            <el-menu mode="horizontal" height="2em">
                <el-menu-item @click="save">保存并完成编辑</el-menu-item>
            </el-menu>
        </el-header>
        <el-main class="editor-frame">
            <div>人物卡名称：</div>
            <el-input v-model="cardName"></el-input>
            <CardComponent
                :card="ceStore.card"
                :card-template="ceStore.template"
                :scripts="ceStore.scripts"
                :can-edit="ceStore.canEdit"
            />
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { HTTPApi } from '@/apigen';
import CardComponent from '@/components/card_editor/CardComponent.vue';
import { useCEStore } from '@/stores/cardEditor';
import { useUserStore } from '@/stores/user';
import { defineComponent } from 'vue';

export default defineComponent({
    computed: {
        ceStore() {
            return useCEStore();
        },
    },
    components: { CardComponent },
    data() {
        return {
            cardName: '',
        };
    },
    methods: {
        async save() {
            if (this.ceStore.canEdit) {
                this.ceStore.cardName = this.cardName;
                const response = await HTTPApi.post('/card/create', {
                    session: useUserStore().session,
                    name: this.ceStore.cardName,
                    card: JSON.stringify(this.ceStore.card),
                    templateId: this.ceStore.templateId,
                });

                if (response.code != 0) {
                    alert(`错误，代码${response.code}`);
                }
            }

            this.$router.push('/home/cards');
        },
    },
});
</script>

<style>
.big-frame {
    position: fixed;
    width: 100vw;
    height: 100vh;
}

.editor-frame {
    padding: 0px;
    height: calc(100% - 2em);
}

.editor-container {
    width: 100%;
    height: 100%;
    overflow: scroll;
}
</style>
