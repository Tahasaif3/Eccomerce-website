'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import api from '../lib/api-client'
import type { User,  } from '../types/auth'
import { loginSchema, signupSchema, updateProfileSchema } from '../lib/validations/auth'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data } = await api.get('/api/auth/me')
      setUser(data.user)
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const validated = loginSchema.parse({ email, password })
      const { data } = await api.post('/api/auth/login', validated)
      setUser(data.user)
      router.push('/account')
      toast.success('Logged in successfully')
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Login failed'
        toast.error(message)
      } else {
        toast.error('An unexpected error occurred')
      }
      throw error
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      const validated = signupSchema.parse({ name, email, password, confirmPassword: password })
      const { data } = await api.post('/api/auth/signup', validated)
      setUser(data.user)
      router.push('/account')
      toast.success('Account created successfully')
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Failed to create account'
        toast.error(message)
      } else {
        toast.error('An unexpected error occurred')
      }
      throw error
    }
  }

  const logout = async () => {
    try {
      await api.post('/api/auth/logout')
      setUser(null)
      router.push('/login')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Failed to logout')
      console.error('Logout failed:', error)
    }
  }

  const updateProfile = async (data: any) => {
    try {
      const validated = updateProfileSchema.parse(data)
      const response = await api.patch('/api/auth/profile', validated)
      setUser(response.data.user)
      toast.success('Profile updated successfully')
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Profile update failed'
        toast.error(message)
      } else {
        toast.error('An unexpected error occurred')
      }
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

