/**
 * 认证上下文
 * 管理用户的登录状态和认证相关功能
 */
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, AuthError } from '@supabase/supabase-js'
import * as supabaseClient from '@/lib/supabase'
import { UserRole } from '@/lib/supabase'

// 定义上下文类型
interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string, role: UserRole) => Promise<void>
}

// 创建上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 创建Provider组件
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // 初始化时检查用户状态
  useEffect(() => {
    const initAuth = async () => {
      try {
        // 获取当前会话
        const session = await supabaseClient.getCurrentSession()
        if (session?.user) {
          setUser(session.user)
        }
      } catch (error) {
        console.error('初始化认证状态失败:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // 监听认证状态变化
    const { data: { subscription } } = supabaseClient.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
        } else {
          setUser(null)
        }
        router.refresh()
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  // 登录方法
  const signIn = async (email: string, password: string) => {
    try {
      const { session } = await supabaseClient.signIn(email, password)
      if (session?.user) {
        setUser(session.user)
        router.push('/')
      }
    } catch (error) {
      console.error('登录错误:', error)
      // 直接抛出错误，让调用者处理
      throw error
    }
  }

  // 注册方法
  const signUp = async (email: string, password: string, role: UserRole) => {
    try {
      const { user: newUser, session } = await supabaseClient.signUp(email, password, role)
      
      // 注册成功后不自动登录，等待邮箱确认
      if (newUser && !session) {
        // 用户需要确认邮箱
        return
      }

      if (session?.user) {
        setUser(session.user)
        // 根据角色重定向到不同的资料完善页面
        router.push(role === 'SEEKER' ? '/onboarding/seeker' : '/onboarding/company')
      }
    } catch (error) {
      console.error('注册错误:', error)
      // 直接抛出错误，让调用者处理
      throw error
    }
  }

  // 退出登录方法
  const signOut = async () => {
    try {
      await supabaseClient.signOut()
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('退出登录失败:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

// 创建自定义Hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
