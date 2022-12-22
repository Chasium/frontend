<template>
    <el-form label-width="15em">
        <el-form-item label="名称生成脚本">
            <el-button @click="editScript('nameScript')">编辑</el-button>
        </el-form-item>
        <el-row>
            <el-button @click="close(true)">确定</el-button>
            <el-button @click="close(false)">取消</el-button>
        </el-row>
    </el-form>
    <ScriptEditDialog
        width="50%"
        ref="script-edit"
        @finish-edit="onScriptEdit"
    ></ScriptEditDialog>
</template>

<script lang="ts">
import { NodeType, type Tree } from '@/trpg/card_template/Tree';
import { refHelper } from '@/utils/refHelper';
import type { ScriptFields } from '@/utils/scriptTypeHelper';
import { defineComponent } from 'vue';
import ScriptEditDialog from '../ScriptEditDialog.vue';

class Data {
    nameScript = '';
    currentNode?: Tree = undefined;
    currentScriptField: ScriptFields<Data> = 'nameScript';
    dialogVisible = false;
}

export default defineComponent({
    data() {
        return new Data();
    },
    emits: ['close'],
    computed: {
        scriptEdit() {
            return refHelper(this, 'script-edit', ScriptEditDialog);
        },
    },
    methods: {
        open(node: Tree) {
            this.currentNode = node;
            if (node.type == NodeType.PROPERTY) {
                this.nameScript = node.property.nameScript;
            }
        },
        close(save: boolean) {
            if (
                save &&
                this.currentNode &&
                this.currentNode.type == NodeType.PROPERTY
            ) {
                const property = this.currentNode.property;
                property.nameScript = this.nameScript;
            }
            this.$emit('close');
        },
        editScript(key: ScriptFields<Data>) {
            this.currentScriptField = key;
            this.scriptEdit.show();
            setTimeout(() => this.scriptEdit.setValue(this[key]), 10);
        },
        onScriptEdit(script: string) {
            this[this.currentScriptField] = script;
        },
    },
    components: { ScriptEditDialog },
});
</script>
