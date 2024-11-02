/**
 * 职位列表页面
 */
'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JobCard from '@/components/JobCard'
import FilterSidebar from '@/components/FilterSidebar'
import Badge from '@/components/Badge'

// 模拟数据
const mockJobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Google',
    location: 'San Francisco, CA',
    salary: '$150K - $200K',
    description: 'Join our team to build next-generation cloud infrastructure and help scale Google\'s most critical services.',
    tags: ['Python', 'React', 'Cloud'],
    postedAt: '2 days ago',
    type: ['Full-time', 'Remote']
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'Microsoft',
    location: 'Seattle, WA',
    salary: '$130K - $180K',
    description: 'Work on cutting-edge web applications and help shape the future of Microsoft\'s cloud services.',
    tags: ['JavaScript', 'Node.js', 'Hybrid'],
    postedAt: '3 days ago',
    type: ['Full-time', 'Hybrid']
  },
  {
    id: '3',
    title: 'iOS Engineer',
    company: 'Apple',
    location: 'Cupertino, CA',
    salary: '$140K - $190K',
    description: 'Join the team building the next generation of iOS applications and features.',
    tags: ['Swift', 'iOS', 'Mobile'],
    postedAt: '1 week ago',
    type: ['Full-time', 'On-site']
  },
]

const filterSections = [
  {
    title: 'Experience Level',
    options: [
      { label: 'Entry Level', value: 'entry', count: 234 },
      { label: 'Mid Level', value: 'mid', count: 567 },
      { label: 'Senior Level', value: 'senior', count: 789 },
    ]
  },
  {
    title: 'Job Type',
    options: [
      { label: 'Full-time', value: 'full-time', count: 1234 },
      { label: 'Part-time', value: 'part-time', count: 567 },
      { label: 'Contract', value: 'contract', count: 345 },
    ]
  },
  {
    title: 'Location Type',
    options: [
      { label: 'Remote', value: 'remote', count: 789 },
      { label: 'On-site', value: 'on-site', count: 456 },
      { label: 'Hybrid', value: 'hybrid', count: 234 },
    ]
  },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setSelectedFilters(filters)
    // 这里可以添加实际的筛选逻辑
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        {/* 搜索区域 */}
        <div className="bg-indigo-600 py-8">
          <div className="container-custom">
            <div className="bg-white rounded-lg p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-4">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Job title, skills, or company"
                  className="w-full px-4 py-2 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center px-4 md:border-l border-t md:border-t-0">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="City or remote"
                  className="w-full px-4 py-2 outline-none"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
              <button className="btn-primary rounded-lg px-8">
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 筛选侧边栏 */}
            <div className="md:w-64 flex-shrink-0">
              <FilterSidebar 
                sections={filterSections}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* 职位列表 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  2,345 Software Engineer jobs in San Francisco
                </h1>
                <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm">
                  <option value="relevant">Most Relevant</option>
                  <option value="recent">Most Recent</option>
                  <option value="salary-high">Highest Salary</option>
                  <option value="salary-low">Lowest Salary</option>
                </select>
              </div>

              <div className="space-y-4">
                {mockJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>

              {/* 分页 */}
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:border-indigo-600 hover:text-indigo-600">
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg ${
                        page === 1
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-500 hover:text-indigo-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:border-indigo-600 hover:text-indigo-600">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
