import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Login from './views/Login.vue'
import router from './router/index'

const app = createApp(App)
app.use(router)

app.use(createPinia())

app.mount('#app')
