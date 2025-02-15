import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'

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

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  if (
    !authStore.isLoggedIn &&
    to.path !== '/login'
  ) {    
    return { path: '/login' }
  }
})

export default router;
