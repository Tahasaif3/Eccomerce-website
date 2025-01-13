import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import type { ApiError } from '@/types/auth'

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const errorMessage = error.response.data?.message || 'An unexpected error occurred'
      toast.error(errorMessage)
    } else if (error.request) {
      toast.error('No response received from the server. Please check your internet connection.')
    } else {
      toast.error('An unexpected error occurred')
    }
    return Promise.reject(error)
  }
)

export default api

