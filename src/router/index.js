import { createRouter, createWebHistory } from 'vue-router'

import App from '../App.vue'
import LoginView from '../views/Login.vue'
import HomeView from '../views/Home.vue'

const routes = [
    { path: '/', component: App }, 
    { path: '/login', component: LoginView },
    { path: '/home', component: HomeView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
