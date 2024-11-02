/**
 * 资料完善页面的基础布局组件
 */
export default function ProfileFormLayout({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-gray-600">{subtitle}</p>
        </div>

        <div className="bg-white shadow rounded-lg">
          {children}
        </div>

        <p className="mt-4 text-sm text-center text-gray-500">
          You can always update this information later in your profile settings.
        </p>
      </div>
    </div>
  )
}
