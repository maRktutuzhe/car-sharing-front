import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Login from './views/Login.vue'

const app = createApp(Login)

app.use(createPinia())

app.mount('#app')
