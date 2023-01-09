<template>
    <el-form label-width="15em">
        <el-button @click="createRoom">创建房间</el-button>
        <el-form-item label="房间邀请码：">
            <el-input v-model="roomId"></el-input>
        </el-form-item>
        <el-button @click="joinRoom">加入房间</el-button>
    </el-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWSStore } from '@/stores/ws';
import { useUserStore } from '@/stores/user';
export default defineComponent({
    data() {
        return {
            roomId: '',
        };
    },
    computed: {
        wsStore() {
            return useWSStore();
        },
    },
    methods: {
        createRoom() {
            this.wsStore.socket.emitToSocket('room:new', {
                session: useUserStore().session,
            });
            this.wsStore.isHost = true;
            this.$router.push('/room');
        },
        joinRoom() {
            this.wsStore.currentRoomId = this.roomId;
            this.wsStore.socket.emitToSocket('room:join', {
                session: useUserStore().session,
                room: this.roomId,
            });
            this.wsStore.isHost = false;
            this.$router.push('/room');
        },
    },
    mounted() {
        this.wsStore.socket.subscribe('room:on_new', (data) => {
            useWSStore().currentRoomId = data.roomId;
            useWSStore().currentUsers = [useUserStore().userName];
        });
        this.wsStore.socket.subscribe('room:on_join', (data) => {
            useWSStore().currentUsers = data.users;
        });
    },
});
</script>
