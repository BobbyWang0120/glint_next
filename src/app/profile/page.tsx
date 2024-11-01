/**
 * 个人信息页面
 * 包含基本信息表单和头像上传功能
 */
'use client'

import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Image from 'next/image'

interface UserProfile {
  name?: string
  phone?: string
  avatar?: string
  bio?: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    phone: '',
    bio: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // 加载用户资料
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch('/api/profile')
        const data = await response.json()
        
        if (response.ok && data.success) {
          setFormData({
            name: data.data.name || '',
            phone: data.data.phone || '',
            avatar: data.data.avatar || '',
            bio: data.data.bio || ''
          })
          if (data.data.avatar) {
            setAvatarPreview(data.data.avatar)
          }
        }
      } catch (error) {
        console.error('加载用户资料失败:', error)
      }
    }

    if (user) {
      loadProfile()
    }
  }, [user])

  // 处理头像上传
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB限制
        setError('头像文件大小不能超过5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 处理表单提交
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name || '')
      formDataToSend.append('phone', formData.phone || '')
      formDataToSend.append('bio', formData.bio || '')
      
      // 如果有新的头像预览，说明用户上传了新头像
      if (avatarPreview && avatarPreview !== formData.avatar) {
        // 将base64转换为文件
        const response = await fetch(avatarPreview)
        const blob = await response.blob()
        formDataToSend.append('avatar', blob, 'avatar.jpg')
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        body: formDataToSend
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || '更新失败')
      }

      setSuccess('个人信息更新成功')
    } catch (error) {
      setError(error instanceof Error ? error.message : '更新失败')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              个人信息
            </h3>
            
            <form onSubmit={handleSubmit} className="mt-5 space-y-6">
              {/* 头像上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  头像
                </label>
                <div className="mt-2 flex items-center space-x-6">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">无头像</span>
                      </div>
                    )}
                  </div>
                  <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span>更换头像</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      disabled={isLoading}
                    />
                  </label>
                </div>
              </div>

              {/* 姓名 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  姓名
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* 电话 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  电话
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* 简介 */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  个人简介
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* 错误提示 */}
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {error}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              {/* 成功提示 */}
              {success && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        {success}
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              {/* 提交按钮 */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? '保存中...' : '保存'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
