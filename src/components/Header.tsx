/**
 * 全局导航栏组件
 */
import Link from 'next/link'
import MobileNav from './MobileNav'

export default function Header() {
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

      {/* 移动端菜单按钮和登录注册按钮 */}
      <div className="flex items-center">
        <div className="hidden md:flex space-x-4">
          <Link href="/login" className="btn-outline">
            Login
          </Link>
          <Link href="/register" className="btn-primary">
            Register
          </Link>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </nav>
  )
}
