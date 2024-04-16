// Auth.js

import { defineStore } from 'pinia'
import { BaseRepository } from '@/api/BaseRepository'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', // Загружаем данные о состоянии аутентификации из localStorage
    accessToken: localStorage.getItem('accessToken') || null,
    status: null,
    balance: null,
    cars: [],
    error: null,
  }),
  actions: {
    async login({ data }) {
      try {
        // TODO: сделать отдельную штуку для запросов, заголовки там поставить изначально взятые из pinia, все делать через pinia
        const response = await axios.post('http://localhost:80/api/auth/login', data)
        console.log('Успешный вход:', response)
        this.isLoggedIn = true
        this.accessToken = response.data.access_token
        localStorage.setItem('isLoggedIn', 'true'); // Сохраняем данные об аутентификации в localStorage
        localStorage.setItem('accessToken', this.accessToken);
       const repos = new BaseRepository(this.accessToken)
      //  console.log(repos)
       try {

         const cars = await repos.index('cars?include[]=location')
         this.cars = cars
        console.log('eeeeeeeeeeeeeeeeeee')
         this.error = null
        } catch {
          console.log('fuck')
        }

        try {
          const userResponse = await axios.post('http://localhost:80/api/auth/user', this.accessToken)
          console.log(userResponse)
          this.status = userResponse.data.status
          this.balance = userResponse.data.balance
          return { success: true }
        } catch (error) {
          console.error('Ошибка при получении данных пользователя:', error)
          return { success: false, error: 'Ошибка при получении данных пользователя' }
        }
      } catch (error) {
        console.error('Ошибка входа:', error)
        this.isLoggedIn = false
        this.accessToken = null
        localStorage.removeItem('isLoggedIn'); // Если вход неудачный, удаляем данные об аутентификации из localStorage
        localStorage.removeItem('accessToken');
        this.error = error.response.data.error || 'Ошибка авторизации'
        return { success: false, error: this.error }
      }
    },
    logout() {
      this.isLoggedIn = false
      this.accessToken = null
      localStorage.removeItem('isLoggedIn'); // Удаляем данные об аутентификации из localStorage при выходе из системы
      localStorage.removeItem('accessToken');
    },
  },
})
