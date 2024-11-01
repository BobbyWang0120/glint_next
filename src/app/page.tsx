/**
 * 首页组件
 */
import UserInfo from '../components/UserInfo'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Glint
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            AI-Powered Recruitment Platform
          </p>
        </div>

        {/* 用户信息显示 */}
        <div className="max-w-md mx-auto">
          <UserInfo />
        </div>
      </div>
    </main>
  )
}
