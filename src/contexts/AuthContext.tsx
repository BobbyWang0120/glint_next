/**
 * 认证上下文
 * 管理用户登录状态和认证信息
 */
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// 用户类型定义
interface User {
  id: number
  email: string
  role: 'seeker' | 'employer'
}

// 认证上下文状态
interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
}

// 认证上下文接口
interface AuthContextType extends AuthState {
  login: (token: string, user: User) => void
  logout: () => void
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 认证提供者属性
interface AuthProviderProps {
  children: ReactNode
}

// 认证提供者组件
export function AuthProvider({ children }: AuthProviderProps) {
  // 认证状态
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true
  })

  // 初始化时从localStorage加载认证状态
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        setAuthState({
          user,
          token,
          isLoading: false
        })
      } catch (error) {
        console.error('Failed to parse user data:', error)
        setAuthState(prev => ({ ...prev, isLoading: false }))
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  // 登录处理
  const login = (token: string, user: User) => {
    // 保存到状态
    setAuthState({
      user,
      token,
      isLoading: false
    })

    // 保存到localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  // 登出处理
  const logout = () => {
    // 清除状态
    setAuthState({
      user: null,
      token: null,
      isLoading: false
    })

    // 清除localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// 使用认证上下文的Hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
