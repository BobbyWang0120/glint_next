/**
 * 移动端导航菜单组件
 * 根据登录状态显示不同的导航选项
 */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsOpen(false)
    } catch (error) {
      console.error('退出登录失败:', error)
    }
  }

  return (
    <div className="md:hidden">
      {/* 菜单按钮 */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* 移动端菜单 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            {/* 菜单头部 */}
            <div className="flex items-center justify-between p-4 border-b">
              <Link 
                href="/" 
                className="text-2xl font-bold text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                Glint
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-indigo-600"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 用户信息 */}
            {user && (
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                      {user.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 导航链接 */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              <div className="space-y-1">
                <Link
                  href="/jobs"
                  className="block py-2.5 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Find Jobs
                </Link>
                <Link
                  href="/talent"
                  className="block py-2.5 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Find Talent
                </Link>
                <Link
                  href="/companies"
                  className="block py-2.5 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Companies
                </Link>
                <Link
                  href="/resources"
                  className="block py-2.5 px-4 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Resources
                </Link>
              </div>

              {/* 用户相关链接 */}
              {user ? (
                <div className="mt-6 pt-6 border-t space-y-1">
                  <Link
                    href="/profile"
                    className="block py-2.5 px-4 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <Link
                    href="/applications"
                    className="block py-2.5 px-4 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    My Applications
                  </Link>
                  <Link
                    href="/saved-jobs"
                    className="block py-2.5 px-4 rounded-lg hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Saved Jobs
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left py-2.5 px-4 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="mt-6 pt-6 border-t space-y-4 px-4">
                  <Link
                    href="/login"
                    className="block w-full py-2.5 text-center rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full py-2.5 text-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
