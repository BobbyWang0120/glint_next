/**
 * 全局导航栏组件
 * 根据登录状态显示不同的导航元素
 */
'use client'

import Link from 'next/link'
import MobileNav from './MobileNav'
import UserMenu from './UserMenu'
import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { user, loading } = useAuth()

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-4 bg-white shadow-sm">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-indigo-600 flex-shrink-0">
        Glint
      </Link>

      {/* 导航链接 - 居中 */}
      <div className="hidden md:flex items-center justify-center flex-1 px-8">
        <div className="flex space-x-8">
          <Link href="/jobs" className="nav-link">Find Jobs</Link>
          <Link href="/talent" className="nav-link">Find Talent</Link>
          <Link href="/companies" className="nav-link">Companies</Link>
          <Link href="/resources" className="nav-link">Resources</Link>
        </div>
      </div>

      {/* 用户菜单或登录注册按钮 */}
      <div className="flex items-center">
        {loading ? (
          // 加载状态
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
        ) : user ? (
          // 已登录 - 显示用户菜单
          <UserMenu />
        ) : (
          // 未登录 - 显示登录注册按钮
          <div className="hidden md:flex space-x-4">
            <Link href="/login" className="btn-outline">
              Login
            </Link>
            <Link href="/register" className="btn-primary">
              Register
            </Link>
          </div>
        )}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}
