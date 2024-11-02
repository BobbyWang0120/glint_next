/**
 * Glint首页
 * 展示主要功能和统计数据
 */
import MobileNav from '@/components/MobileNav'

export default function Home() {
  const popularTags = ["Software Engineer", "Product Manager", "Data Scientist", "Remote Jobs"];

  return (
    <div className="min-h-screen">
      {/* 导航栏 */}
      <nav className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-2xl font-bold text-indigo-600">Glint</a>
            <div className="hidden md:flex space-x-6">
              <a href="/jobs" className="nav-link">Find Jobs</a>
              <a href="/talent" className="nav-link">Find Talent</a>
              <a href="/companies" className="nav-link">Companies</a>
              <a href="/resources" className="nav-link">Resources</a>
            </div>
          </div>
          <MobileNav />
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="/login" className="btn-outline">Login</a>
          <a href="/register" className="btn-primary">Register</a>
        </div>
      </nav>

      {/* 主搜索区域 */}
      <div className="bg-indigo-600 py-12 md:py-20 px-4 md:px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your Career Journey Starts Here
        </h1>
        <p className="text-white text-base md:text-lg mb-8">
          Connect with over 1 million opportunities from top companies worldwide
        </p>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-full p-2 flex flex-col md:flex-row gap-2 md:gap-0 shadow-lg">
          <div className="flex-1 flex items-center px-4">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Job title, skills, or company"
              className="search-input"
            />
          </div>
          <div className="flex-1 flex items-center px-4 md:border-l border-t md:border-t-0">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="City or remote"
              className="search-input"
            />
          </div>
          <button className="btn-primary rounded-full w-full md:w-auto px-8 py-3 md:py-2">
            Search Jobs
          </button>
        </div>

        {/* 热门标签 */}
        <div className="mt-6 text-white text-sm md:text-base overflow-x-auto whitespace-nowrap">
          <span className="mr-2">Popular:</span>
          <div className="inline">
            {popularTags.map((tag, index) => (
              <span key={tag} className="inline-flex items-center">
                <a href={`/jobs/${tag.toLowerCase().replace(/ /g, "-")}`} className="mx-2 hover:underline">
                  {tag}
                </a>
                {index < popularTags.length - 1 && (
                  <span className="text-indigo-300">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { number: "1M+", label: "Active Jobs" },
            { number: "500K+", label: "Companies" },
            { number: "2M+", label: "Job Seekers" },
            { number: "98%", label: "Success Rate" }
          ].map(({ number, label }) => (
            <div key={label} className="text-center">
              <div className="stat-number mb-2">{number}</div>
              <div className="text-gray-600 text-sm md:text-base">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 职位类别 */}
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Explore Job Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              "Software Development",
              "Data Science & Analytics",
              "Product Management",
              "Design & Creative",
              "Marketing & Sales",
              "Business & Finance",
              "Human Resources",
              "Customer Service",
              "Operations"
            ].map((category) => (
              <a
                key={category}
                href={`/jobs/${category.toLowerCase().replace(/ /g, "-")}`}
                className="p-6 bg-white rounded-lg hover-card"
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{category}</h3>
                <p className="text-gray-600 text-sm md:text-base">Explore opportunities in {category}</p>
                <div className="mt-4">
                  <span className="tag">View Jobs</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
