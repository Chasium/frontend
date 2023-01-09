<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="user"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
    >
        <el-menu-item @click="clickHome" index="begin">
            <el-icon><VideoPlay /></el-icon>
            <span>游戏大厅</span>
        </el-menu-item>
        <el-menu-item @click="clickCards" index="card">
            <el-icon><Postcard /></el-icon>
            <span>人物卡</span>
        </el-menu-item>
        <el-sub-menu index="1">
            <template #title>
                <el-icon><Memo /></el-icon>
                <span>人物卡模板</span>
            </template>
            <el-menu-item-group>
                <el-menu-item @click="clickMyTemplates" index="1-1"
                    >我的模板</el-menu-item
                >
                <el-menu-item @click="clickTemplates" index="1-2"
                    >可用模板</el-menu-item
                >
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon><Collection /></el-icon>
                <span>剧本</span>
            </template>
            <el-menu-item-group>
                <el-menu-item @click="clickMyMods" index="2-1"
                    >我的剧本</el-menu-item
                >
                <el-menu-item @click="clickMod" index="2-2"
                    >可用剧本</el-menu-item
                >
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts">
import {
    User,
    VideoPlay,
    Postcard,
    Collection,
    Setting,
    Memo,
} from '@element-plus/icons-vue';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {};
    },
    methods: {
        handleOpen(key: string, keyPath: string[]) {
            console.log(key, keyPath);
        },
        handleClose(key: string, keyPath: string[]) {
            console.log(key, keyPath);
        },
        clickHome() {
            if (this.$route.path != '/home/begin') {
                this.$router.push('/home/begin');
            }
        },
        clickCards() {
            if (this.$route.path != '/home/cards') {
                this.$router.push('/home/cards');
            }
        },
        clickTemplates() {
            if (this.$route.path != '/home/templates') {
                this.$router.push('/home/templates');
            }
        },
        clickMyTemplates() {
            if (this.$route.path != '/home/my-templates') {
                this.$router.push('/home/my-templates');
            }
        },
        clickMod() {
            if (this.$route.path != '/home/mods') {
                this.$router.push('/home/mods');
            }
        },
        clickMyMods() {
            if (this.$route.path != '/home/my-mods') {
                this.$router.push('/home/my-mods');
            }
        },
    },
    components: {
        VideoPlay,
        Postcard,
        Collection,
        Memo,
    },
    computed: {},
});
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
}
span {
    font-size: 15px;
}
</style>
