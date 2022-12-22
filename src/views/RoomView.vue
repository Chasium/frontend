<template>
    <div>
        <div>房间邀请码：</div>
        <div>{{ wsStore.currentRoomId }}</div>
        <div>房间内玩家：</div>
        <div v-for="item in wsStore.currentUsers">{{ item }}</div>
        <div>
            <el-button v-if="wsStore.isHost">开始游戏</el-button>
            <el-button v-else>准备</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { useWSStore } from '@/stores/ws';
import { defineComponent } from 'vue';

export default defineComponent({
    computed: {
        wsStore() {
            return useWSStore();
        },
    },
});
</script>
