import { BaseRepository } from '@/api/BaseRepository'
import { useAuthStore } from '@/stores/Auth'
console.log('hui')
class Repository extends BaseRepository {}
// const store = useAuthStore()
// console.log(store)
export const useRepository = new Repository(useAuthStore.accessToken)
