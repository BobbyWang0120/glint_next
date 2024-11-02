/**
 * 认证上下文
 * 管理用户的登录状态和认证相关功能
 */
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

// 定义用户类型
interface User {
  id: string
  email: string
  role?: string
}

// 定义上下文类型
interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
}

// 创建上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 创建Provider组件
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  // 初始化时检查用户状态
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          throw error
        }

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
          })
        }
      } catch (error) {
        console.error('检查用户状态失败:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
          })
        } else {
          setUser(null)
        }
        router.refresh()
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  // 登录方法
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/')
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 注册方法
  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      router.push('/login')
    } catch (error) {
      console.error('注册失败:', error)
      throw error
    }
  }

  // 退出登录方法
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
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
