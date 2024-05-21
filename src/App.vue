<script>
import {useAuthStore} from "@/stores/Auth.js";
import API from "@/api/Api.js";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'App',
    setup() {
        const authStore = useAuthStore()

        if (authStore.accessToken !== undefined) {
            API.defaults.headers.common['Authorization'] = `Bearer ${authStore.accessToken}`
        }
    },
})
</script>

<template>
   <router-view/>
</template>

<style scoped>
</style>
