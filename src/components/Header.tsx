/**
 * 全局导航栏组件
 */
import Link from 'next/link'
import MobileNav from './MobileNav'

export default function Header() {
  return (
    <nav className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Glint
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/jobs" className="nav-link">Find Jobs</Link>
            <Link href="/talent" className="nav-link">Find Talent</Link>
            <Link href="/companies" className="nav-link">Companies</Link>
            <Link href="/resources" className="nav-link">Resources</Link>
          </div>
        </div>
        <MobileNav />
      </div>
      <div className="hidden md:flex space-x-4">
        <Link href="/login" className="btn-outline">
          Login
        </Link>
        <Link href="/register" className="btn-primary">
          Register
        </Link>
      </div>
    </nav>
  )
}
