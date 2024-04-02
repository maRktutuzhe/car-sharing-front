<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/Auth.js'
import axios from 'axios'


const { login2, error } = useAuthStore()
// Реактивные данные
const data = reactive({
    email: '',
    password: '',
})

// Функция для входа пользователя
const login = () => {
  axios.post('http://localhost:80/api/auth/login', data)
    .then(response => {
      console.log('Успешный вход:', response.data)
      // Проверяем, что authStore действительно имеет метод login
      if (typeof authStore.login === 'function') {
        authStore.login(response.data)
      } else {
        console.error('Метод login не найден в хранилище authStore')
      }
    })
    .catch(error => {
      console.error('Ошибка входа:', error)
    })
}

const login3 = async () => {
    await login2({ data: data})
}

</script>

<template>
    <div class="login">
        <p>Добро пожаловать!</p>
        <p>Логин</p>
        <input v-model="data.email">
        <p>Пароль</p>
        <input v-model="data.password">
        <button @click="login3" title="login">Войти</button>
    </div>
</template>

<style>
    body {
        display: flex;
        background-color: rgb(112, 187, 186);
        color: #000;
    }
</style>
