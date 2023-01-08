<template>
    <div>
        <div>房间邀请码：</div>
        <div>{{ wsStore.currentRoomId }}</div>
        <div>房间内玩家：</div>
        <div v-for="item in wsStore.currentUsers">{{ item }}</div>
        <div>
            <el-button v-if="wsStore.isHost" @click="chooseTemplate()">
                选择人物卡模板
            </el-button>
            <el-button v-else @click="chooseCard()">选择人物卡</el-button>
        </div>
        <div>
            <el-button v-if="wsStore.isHost" @click="startGame()">
                开始游戏
            </el-button>
            <el-button v-else @click="prepare()">准备</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { useRoomStore } from '@/stores/room';
import { useUserStore } from '@/stores/user';
import { useWSStore } from '@/stores/ws';
import { ElMessageBox } from 'element-plus';
import { defineComponent } from 'vue';
import Card from '@/trpg/card/Card';

export default defineComponent({
    computed: {
        wsStore() {
            return useWSStore();
        },
        userStore() {
            return useUserStore();
        },
        roomStore() {
            return useRoomStore();
        },
    },
    methods: {
        async chooseTemplate() {
            const idStr = await ElMessageBox.prompt('请输入人物卡模板的ID', {
                inputType: 'number',
            });
            const id = parseInt(idStr);
            this.wsStore.socket.emitToSocket('room:set_template', {
                session: this.userStore.session,
                templateId: id,
            });
        },
        async chooseCard() {
            const idStr = await ElMessageBox.prompt('请输入人物卡的ID', {
                inputType: 'number',
            });
            const id = parseInt(idStr);
            this.wsStore.socket.emitToSocket('room:set_card', {
                session: this.userStore.session,
                cardId: id,
            });
        },
        prepare() {
            this.wsStore.socket.emitToSocket('room:prepare', {
                session: this.userStore.session,
            });
        },
        startGame() {
            this.wsStore.socket.emitToSocket('room:start', {
                session: this.userStore.session,
            });
        },
    },
    mounted() {
        this.wsStore.socket.subscribe('room:on_set_template', (data) => {
            if (data.code == 0) {
                this.roomStore.template = JSON.parse(data.template.value);
                this.roomStore.scripts = data.template.scripts;
            }
        });

        this.wsStore.socket.subscribe('room:on_set_card', (data) => {
            if (data.code == 0) {
                this.roomStore.cardMap.set(data.user, Card.fromJSON(data.card));
            }
        });

        this.wsStore.socket.subscribe('room:on_start', (data) => {
            if (data.code == 0) {
                this.$router.push('/game');
            }
        });
    },
});
</script>
