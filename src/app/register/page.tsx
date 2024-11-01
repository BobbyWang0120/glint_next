/**
 * 用户注册页面
 * 包含邮箱、密码和用户类型选择的注册表单
 */
'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  
  // 表单状态
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'seeker' // 默认选择求职者
  })

  // 错误信息状态
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    submit: ''
  })

  // 加载状态
  const [isLoading, setIsLoading] = useState(false)

  // 表单验证函数
  const validateForm = () => {
    let isValid = true
    const newErrors = {
      email: '',
      password: '',
      submit: ''
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
      isValid = false
    }

    // 验证密码长度（最少6位）
    if (formData.password.length < 6) {
      newErrors.password = '密码长度至少为6位'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // 表单提交处理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({ email: '', password: '', submit: '' })

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || '注册失败')
      }

      // 注册成功，重定向到首页或登录页
      router.push('/')
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : '注册过程中发生错误'
      }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          创建新账号
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 邮箱输入框 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                邮箱地址
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* 密码输入框 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                密码
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* 用户类型选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                用户类型
              </label>
              <div className="mt-2 space-y-4">
                <div className="flex items-center">
                  <input
                    id="role-seeker"
                    name="role"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    checked={formData.role === 'seeker'}
                    onChange={() => setFormData({ ...formData, role: 'seeker' })}
                    disabled={isLoading}
                  />
                  <label htmlFor="role-seeker" className="ml-3 block text-sm font-medium text-gray-700">
                    求职者
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="role-employer"
                    name="role"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    checked={formData.role === 'employer'}
                    onChange={() => setFormData({ ...formData, role: 'employer' })}
                    disabled={isLoading}
                  />
                  <label htmlFor="role-employer" className="ml-3 block text-sm font-medium text-gray-700">
                    招聘者
                  </label>
                </div>
              </div>
            </div>

            {/* 提交错误信息 */}
            {errors.submit && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {errors.submit}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {/* 提交按钮 */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? '注册中...' : '注册'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
