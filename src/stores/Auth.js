import { defineStore } from 'pinia'
import { BaseRepository } from '@/api/BaseRepository'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true', 
    accessToken: localStorage.getItem('accessToken') || null,
    status: localStorage.getItem('status') || null,
    balance: localStorage.getItem('balance') || null,
    cars: JSON.parse(localStorage.getItem('cars')) || [],
    error: null,
  }),
  actions: {
    async login({ data }) {
      try {

        const repository = new BaseRepository()
        const response = await repository.post('auth/login', data)
        
        console.log('Успешный вход:', response)
        this.isLoggedIn = true
        this.accessToken = response.data.access_token
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('accessToken', this.accessToken);
        
        await this.userInfo()
        await this.freeCars()

        return { success: true }
      
      } catch (error) {
        console.error('Ошибка входа:', error)
        this.isLoggedIn = false
        this.accessToken = null
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('accessToken')
        this.error = error.response.data.error || 'Ошибка авторизации'
        return { success: false, error: this.error }
      }
    },

    async userInfo() {
      try {
        const repository = new BaseRepository(this.accessToken)
        const userResponse = await repository.post('auth/user')
        this.status = userResponse.data.status
        this.balance = userResponse.data.balance
        localStorage.setItem('status', this.status) 
        localStorage.setItem('balance', this.balance)
        return { success: true }
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error)
        return { success: false, error: 'Ошибка при получении данных пользователя' }
      }
    },

    async freeCars() {
      try {
        const repository = new BaseRepository(this.accessToken)
        const carsResponse = await repository.index('cars?include[]=location')
        this.cars = carsResponse.data
        localStorage.setItem('cars', JSON.stringify(this.cars))
        this.error = null
        return { success: true }
      } catch {
        console.log('fuck')
      }
    },

    logout() {
      this.isLoggedIn = false
      this.accessToken = null
      this.status = null
      this.balance = null
      this.cars = []
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('status')
      localStorage.removeItem('balance')
      localStorage.removeItem('cars')
    },
  },
})
