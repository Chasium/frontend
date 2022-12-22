import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state() {
        return {
            userName: '',
            session: '',
            loggedIn: false,
        };
    },
    persist: {
        enabled: true,
    },
});
