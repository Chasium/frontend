import CardEditView from '@/views/CardEditView.vue';
import BeginView from '@/views/home/BeginView.vue';
import CardsView from '@/views/home/CardsView.vue';
import ModsView from '@/views/home/ModsView.vue';
import MyModsView from '@/views/home/MyModsView.vue';
import MyTemplatesView from '@/views/home/MyTemplatesView.vue';
import TemplatesView from '@/views/home/TemplatesView.vue';
import LoginView from '@/views/LoginView.vue';
import TemplateEditView from '@/views/TemplateEditView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RoomView from '@/views/RoomView.vue';
import RegisterView from '@/views/RegisterView.vue';
import GameView from '@/views/GameView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: HomeView,
            children: [
                { path: 'begin', component: BeginView },
                { path: 'cards', component: CardsView },
                { path: 'templates', component: TemplatesView },
                { path: 'my-templates', component: MyTemplatesView },
                { path: 'mods', component: ModsView },
                { path: 'my-mods', component: MyModsView },
            ],
        },
        {
            path: '/',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        {
            path: '/template-edit',
            name: 'templateEdit',
            component: TemplateEditView,
        },
        {
            path: '/card-edit',
            name: 'cardEdit',
            component: CardEditView,
        },
        {
            path: '/room',
            name: 'room',
            component: RoomView,
        },
        {
            path: '/game',
            name: 'game',
            component: GameView,
        },
    ],
});

export default router;
