import type { WSApi } from '@/apigen';
import { defineStore } from 'pinia';

export const useWSStore = defineStore('ws', {
    state() {
        return {
            socket: null as unknown as WSApi,
            currentRoomId: '',
            isHost: false,
            currentUsers: [] as string[],
            preparedUsers: [] as string[],
        };
    },
});
