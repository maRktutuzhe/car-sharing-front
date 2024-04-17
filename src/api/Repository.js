import { BaseRepository } from '@/api/BaseRepository'
import { useAuthStore } from '@/stores/Auth'

export const useRepository = new BaseRepository(useAuthStore.accessToken)
