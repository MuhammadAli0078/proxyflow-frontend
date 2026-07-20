import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
  updateProfile: (updates: Partial<Pick<User, 'name' | 'email'>>) => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

const mockUsers: User[] = [
  { id: 'admin-1', name: 'Admin User', email: 'admin@proxyflow.com', role: 'admin', createdAt: '2026-01-01', status: 'active' },
  { id: 'cust-1', name: 'Alex Johnson', email: 'alex@example.com', role: 'customer', createdAt: '2026-06-01', status: 'active' },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('proxyflow_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = (email: string, _password: string) => {
    const found = mockUsers.find((u) => u.email === email)
    if (found) {
      setUser(found)
      localStorage.setItem('proxyflow_user', JSON.stringify(found))
      return true
    }
    if (email.includes('@')) {
      const newUser: User = {
        id: `cust-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'customer',
        createdAt: new Date().toISOString(),
        status: 'active',
      }
      setUser(newUser)
      localStorage.setItem('proxyflow_user', JSON.stringify(newUser))
      return true
    }
    return false
  }

  const register = (name: string, email: string, _password: string) => {
    const newUser: User = {
      id: `cust-${Date.now()}`,
      name,
      email,
      role: 'customer',
      createdAt: new Date().toISOString(),
      status: 'active',
    }
    setUser(newUser)
    localStorage.setItem('proxyflow_user', JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('proxyflow_user')
  }

  const updateProfile = (updates: Partial<Pick<User, 'name' | 'email'>>) => {
    setUser((prev) => {
      if (!prev) return prev
      const updated = { ...prev, ...updates }
      localStorage.setItem('proxyflow_user', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
