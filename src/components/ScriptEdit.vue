<template>
    <div class="editor" ref="editor"></div>
</template>
<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue';
import { editorProps } from '../component_logics/monacoEditorType';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import * as monaco from 'monaco-editor';

class Data {
    editor?: monaco.editor.IStandaloneCodeEditor;
    script = '/* Please enter your script here :) */';
}

export default defineComponent({
    name: 'monacoEditor',
    props: editorProps,
    data() {
        return new Data();
    },
    setup() {
        self.MonacoEnvironment = {
            getWorker(_: string, label: string) {
                if (label === 'json') {
                    return new jsonWorker();
                }
                if (['css', 'scss', 'less'].includes(label)) {
                    return new cssWorker();
                }
                if (['html', 'handlebars', 'razor'].includes(label)) {
                    return new htmlWorker();
                }
                if (['typescript', 'javascript'].includes(label)) {
                    return new tsWorker();
                }
                return new EditorWorker();
            },
        };
    },
    mounted() {
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: true,
            noSyntaxValidation: false,
        });
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2020,
            allowNonTsExtensions: true,
        });

        this.editor = monaco.editor.create(
            this.$refs['editor'] as HTMLElement,
            {
                value: '',
                language: this.language,
                theme: this.theme,
                ...this.options,
            }
        );

        this.editor.onDidChangeModelContent(() => {
            if (!this.editor) {
                throw Error();
            }
            this.script = this.editor?.getValue();
        });
        this.$watch(
            () => this.options,
            (newValue) => this.editor?.updateOptions(newValue),
            { deep: true }
        );
        this.$watch(
            () => this.language,
            (newValue) =>
                monaco.editor.setModelLanguage(
                    this.editor?.getModel()!,
                    newValue
                )
        );
    },
    beforeUnmount() {
        this.editor?.dispose();
    },
    methods: {
        setValue(value: string) {
            this.script = value;
            this.editor?.getModel()?.setValue(value);
        },
        getValue() {
            const out = this.editor?.getModel()?.getValue();
            if (out == null) {
                return '';
            }
            return out;
        },
    },
});
</script>

<style lang="scss" scoped>
.editor {
    width: 100%;
    height: 400px;
}
</style>
