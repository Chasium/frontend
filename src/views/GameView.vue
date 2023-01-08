<template>
    <div>
        <el-tabs>
            <el-tab-pane label="人物卡">
                <div>
                    <CardComponent
                        :card="card"
                        can-edit
                        in-game
                        :user="userStore.userName"
                        :card-template="roomStore.template"
                        :scripts="roomStore.scripts"
                    ></CardComponent>
                </div>
            </el-tab-pane>
            <el-tab-pane label="聊天框">
                <el-input
                    type="textarea"
                    disabled
                    v-model="areaText"
                ></el-input>
                <el-input v-model="inputText"></el-input>
                <el-button @click="send">发送</el-button>
            </el-tab-pane>
            <el-tab-pane label="骰子"></el-tab-pane>
            <el-tab-pane label="地图"></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import CardComponent from '@/components/card_editor/CardComponent.vue';
import { useRoomStore } from '@/stores/room';
import { useUserStore } from '@/stores/user';
import { useWSStore } from '@/stores/ws';
import Card from '@/trpg/card/Card';
import { defineComponent } from 'vue';

export default defineComponent({
    components: { CardComponent },
    data() {
        return {
            card: null as unknown as Card,
            areaText: '',
            inputText: '',
        };
    },
    computed: {
        roomStore() {
            return useRoomStore();
        },
        userStore() {
            return useUserStore();
        },
        wsStore() {
            return useWSStore();
        },
    },
    methods: {
        send() {
            this.wsStore.socket.emitToSocket('room:chat', {
                session: this.userStore.session,
                message: this.inputText,
            });
        },
    },
    mounted() {
        this.wsStore.socket.subscribe('room:on_chat', (data) => {
            if (data.code == 0) {
                this.areaText += data.message + '\n';
            }
        });
        this.wsStore.socket.subscribe('room:on_edit_card', (data) => {
            if (data.code == 0) {
                this.card = Card.fromJSON(data.card);
            }
        });
    },
});
</script>
