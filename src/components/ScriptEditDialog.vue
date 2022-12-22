<template>
    <el-dialog v-model="showDialog">
        <template #header>脚本编辑器</template>
        <ScriptEdit
            :width="width"
            :height="height"
            :language="language"
            :theme="theme"
            :options="options"
            ref="script-edit"
        ></ScriptEdit>
        <template #footer>
            <el-button @click="emitFinishEdit">保存并退出</el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { refHelper } from '@/utils/refHelper';
import { defineComponent, ref, type Ref } from 'vue';
import { editorProps } from '../component_logics/monacoEditorType';
import ScriptEdit from './ScriptEdit.vue';

export default defineComponent({
    name: 'monacoEditor',
    props: editorProps,
    data() {
        return { showDialog: false };
    },
    emits: {
        finishEdit(script: string) {
            return typeof script == 'string';
        },
    },
    methods: {
        setValue(value: string) {
            refHelper(this, 'script-edit', ScriptEdit).setValue(value);
        },
        emitFinishEdit() {
            this.$emit(
                'finishEdit',
                refHelper(this, 'script-edit', ScriptEdit).getValue()
            );
            this.showDialog = false;
        },
        show() {
            this.showDialog = true;
        },
    },
    components: { ScriptEdit },
});
</script>
