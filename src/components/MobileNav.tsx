/**
 * 移动端导航菜单组件
 */
'use client'

import { useState, useEffect } from 'react'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  // 控制body的overflow，防止菜单打开时页面滚动
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }

    // 清理函数
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isOpen])

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

      {/* 背景遮罩 */}
      {isOpen && (
        <div 
          className="mobile-nav-overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 移动端菜单 */}
      <div 
        className={`mobile-nav ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* 菜单头部 */}
          <div className="flex items-center justify-between p-4 border-b">
            <a href="/" className="text-2xl font-bold text-indigo-600">
              Glint
            </a>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              aria-label="Close menu"
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

          {/* 菜单链接 */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <a href="/jobs" className="mobile-nav-link">
              Find Jobs
            </a>
            <a href="/talent" className="mobile-nav-link">
              Find Talent
            </a>
            <a href="/companies" className="mobile-nav-link">
              Companies
            </a>
            <a href="/resources" className="mobile-nav-link">
              Resources
            </a>
          </nav>

          {/* 登录注册按钮 */}
          <div className="p-4 border-t space-y-4">
            <a 
              href="/login" 
              className="mobile-nav-button btn-outline"
            >
              Login
            </a>
            <a 
              href="/register" 
              className="mobile-nav-button btn-primary"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
