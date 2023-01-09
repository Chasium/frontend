<template>
    <h1>剧本编辑器</h1>
    <el-input v-model="newName" placeholder="请输入剧本名称" style="margin-bottom: 10px;"></el-input>
    <md-editor
        toolbarsExclude="['mermaid', 'image', 'github']"
        v-model="text"
    />
    <div class="tooltip">
        help
        <span class="tooltiptext"
            >请使用markdown语言输入剧本。插入脚本代码的部分和剧本的其余内容通过%%分隔开。例如：剧本剧本%%脚本%%剧本剧本</span
        >
    </div>
    <el-button @click="onclick" id="button">提交剧本</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useUserStore } from '@/stores/user';
import { HTTPApi } from '@/apigen';

export default defineComponent({
    components: { MdEditor },
    data() {
        return { text: '', newName: ''};
    },
    methods: {
        async onclick() {
            // TODO 将剧本中的内容和脚本分别存入后端
            console.log(this.newName + this.text);
            const response = await HTTPApi.post('/mod/create', {
                session: useUserStore().session,
                name: this.newName,
                content: this.text
            });

            if (response.code != 0) {
                alert(`错误，代码${response.code}`);
            }
            alert('提交成功');
        },
    },
});
</script>

<style>
h1 {
    margin-left: 5px;
}
.tooltip {
    margin-top: 10px;
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 250px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 10px;

    /* 定位 */
    position: absolute;
    z-index: 1;
}
.tooltip:hover .tooltiptext {
    visibility: visible;
}

#button {
    margin-top: 20px;
    float: right;
}
</style>

