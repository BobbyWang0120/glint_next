/**
 * Supabase客户端工具
 * 用于初始化和复用supabase实例
 */
import { createClient, AuthError } from '@supabase/supabase-js'

// 从环境变量获取配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

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
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    throw error
  }
  
  return data
}

/**
 * 注册方法
 */
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  
  if (error) {
    throw error
  }
  
  return data
}

/**
 * 退出登录方法
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
}
