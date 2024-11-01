/**
 * 用户信息显示组件
 */
'use client'

import { useAuth } from '../contexts/AuthContext'

export default function UserInfo() {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Welcome back!
          </h3>
          <p className="text-sm text-gray-500">
            {user.email}
          </p>
          <p className="text-sm text-gray-500 capitalize">
            Role: {user.role}
          </p>
        </div>
        <button
          onClick={logout}
          className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
