<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/stores/Auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login, error } = useAuthStore()

const data = reactive({
    email: '',
    password: '',
})

const handleLogin = async () => {
  const result = await login({ data: data})
  if (result.success) {
    router.push({ path:'/home' })
  } else {
    console.error('Ошибка при входе:', result.error)
  }
}


</script>

<template>

  <div class="d-flex align-items-center">
    
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Логин</label>
      <input v-model="data.email" type="email" class="form-control" placeholder="name@example.com">
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Пароль</label>
      <input v-model="data.password" type="password" class="form-control">
    </div>
    <button class="btn secondary-bg w-100" @click="handleLogin" title="login">Войти</button>
  </div>
</template>

<style>
 
  .d-flex {
    flex-direction: column;
    border-radius: var(--secondary-color);
  }
  .btn {
    color: white;
  }
  .btn:hover {
    color: var(--secondary-color);
  }

  
</style>
