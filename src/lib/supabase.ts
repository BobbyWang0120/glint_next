/**
 * Supabase客户端工具
 * 用于初始化和复用supabase实例
 */
import { createClient, AuthError } from '@supabase/supabase-js'

// 从环境变量获取配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export type UserRole = 'SEEKER' | 'COMPANY'

// 创建supabase客户端实例
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    // 自动刷新token
    autoRefreshToken: true,
    // 检测会话变化
    detectSessionInUrl: true
  }
})

/**
 * 获取当前用户会话
 */
export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('获取会话失败:', error)
    return null
  }
}

/**
 * 获取当前用户信息
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('获取用户信息失败:', error)
    return null
  }
}

/**
 * 监听认证状态变化
 */
export const onAuthStateChange = (callback: (event: any, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback)
}

/**
 * 登录方法
 */
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      // 处理具体的错误类型
      if (error.message === 'Invalid login credentials') {
        throw new Error('邮箱或密码错误')
      } else if (error.message === 'Email not confirmed') {
        throw new Error('请先确认邮箱后再登录')
      }
      throw error
    }
    
    return data
  } catch (error) {
    console.error('登录失败:', error)
    throw error
  }
}

/**
 * 注册方法
 */
export const signUp = async (email: string, password: string, role: UserRole) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role,
        }
      }
    })
    
    if (error) {
      // 处理具体的错误类型
      if (error.message.includes('already registered')) {
        throw new Error('该邮箱已被注册')
      }
      throw error
    }

    // 如果注册成功，创建用户记录
    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            role: role,
          }
        ])

      if (profileError) {
        console.error('创建用户记录失败:', profileError)
      }
    }
    
    return data
  } catch (error) {
    console.error('注册失败:', error)
    throw error
  }
}

/**
 * 退出登录方法
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  } catch (error) {
    console.error('退出登录失败:', error)
    throw error
  }
}
