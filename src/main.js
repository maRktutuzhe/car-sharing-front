import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)

app.use(createYmaps({
    apikey: import.meta.env.VITE_APP_APIKEY,
}))

app.use(router)

app.use(createPinia())

app.mount('#app')
