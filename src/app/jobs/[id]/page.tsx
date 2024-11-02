/**
 * 职位详情页面
 */
'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Badge from '@/components/Badge'
import CompanyIcon from '@/components/CompanyIcon'

// 模拟数据
const jobDetail = {
  id: '1',
  title: 'Senior Software Engineer',
  company: {
    name: 'Google',
    description: 'Google\'s mission is to organize the world\'s information and make it universally accessible and useful.',
    industry: 'Technology',
    size: '100,000+ employees',
    headquarters: 'Mountain View, CA',
    locations: 'Worldwide'
  },
  location: 'San Francisco, CA',
  salary: '$150,000 - $200,000',
  employeeCount: '1,000+ employees',
  postedAt: '2 days ago',
  applicants: 234,
  type: ['Full-time', 'Remote', 'Senior Level'],
  description: `We are looking for a Senior Software Engineer to join our team and help build next-generation cloud infrastructure. You will be working on critical services that power Google's most important products.`,
  responsibilities: [
    'Design and implement scalable backend services',
    'Collaborate with cross-functional teams to define and implement new features',
    'Write clean, maintainable, and efficient code',
    'Participate in code reviews and provide constructive feedback',
    'Mentor junior engineers and help them grow',
    'Contribute to technical architecture decisions'
  ],
  requirements: [
    '8+ years of software development experience',
    'Strong experience with distributed systems and cloud computing',
    'Expertise in one or more programming languages (e.g., Java, Go, Python)',
    'Experience with microservices architecture',
    'Strong problem-solving and analytical skills',
    'Excellent communication and collaboration abilities'
  ],
  benefits: [
    'Competitive salary and equity package',
    'Comprehensive health, dental, and vision insurance',
    'Flexible work arrangements',
    'Generous paid time off',
    'Professional development opportunities',
    'Company-wide events and team building'
  ]
}

export default function JobDetailPage() {
  const [isSaved, setIsSaved] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 主要内容 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {jobDetail.title}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <span className="font-medium">{jobDetail.company.name}</span>
                      <span className="mx-2">•</span>
                      <span>{jobDetail.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {jobDetail.type.map((type) => (
                        <Badge key={type} text={type} variant="info" />
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <CompanyIcon company={jobDetail.company.name} />
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-6">
                    {jobDetail.description}
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                    Responsibilities
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {jobDetail.responsibilities.map((item, index) => (
                      <li key={index} className="text-gray-600">{item}</li>
                    ))}
                  </ul>

                  <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                    Requirements
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {jobDetail.requirements.map((item, index) => (
                      <li key={index} className="text-gray-600">{item}</li>
                    ))}
                  </ul>

                  <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                    Benefits
                  </h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {jobDetail.benefits.map((item, index) => (
                      <li key={index} className="text-gray-600">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 侧边栏 */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* 申请卡片 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Salary Range
                    </h3>
                    <p className="text-2xl font-bold text-indigo-600">
                      {jobDetail.salary}
                    </p>
                    <p className="text-gray-500 text-sm">per year</p>
                  </div>

                  <button className="w-full btn-primary mb-3">
                    Apply Now
                  </button>
                  <button 
                    className="w-full btn-outline flex items-center justify-center"
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <svg 
                      className={`w-5 h-5 mr-2 ${isSaved ? 'fill-current' : 'stroke-current'}`}
                      viewBox="0 0 24 24"
                      fill={isSaved ? 'currentColor' : 'none'}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    {isSaved ? 'Saved' : 'Save Job'}
                  </button>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Posted {jobDetail.postedAt}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {jobDetail.applicants} applicants
                    </div>
                  </div>
                </div>

                {/* 公司信息 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    About {jobDetail.company.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {jobDetail.company.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {jobDetail.company.industry}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {jobDetail.company.size}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {jobDetail.company.locations}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
