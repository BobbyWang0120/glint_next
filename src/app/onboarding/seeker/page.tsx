/**
 * 求职者资料完善页面
 */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfileFormLayout from '@/components/ProfileFormLayout'
import { useAuth } from '@/contexts/AuthContext'

interface SeekerFormData {
  firstName: string
  lastName: string
  phone: string
  location: string
  title: string
  yearsExperience: string
  skills: string[]
  bio: string
  jobTypes: string[]
  industries: string[]
  salary: string
}

const jobTypeOptions = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Remote'
]

const industryOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Media',
  'Others'
]

export default function SeekerOnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<SeekerFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    title: '',
    yearsExperience: '',
    skills: [],
    bio: '',
    jobTypes: [],
    industries: [],
    salary: ''
  })

  // 如果用户未登录，重定向到登录页面
  if (!user) {
    router.push('/login')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 验证必填字段
      if (!formData.firstName || !formData.lastName) {
        throw new Error('Please enter your name')
      }

      // 验证技能
      if (formData.skills.length === 0) {
        throw new Error('Please add at least one skill')
      }

      // 验证工作类型
      if (formData.jobTypes.length === 0) {
        throw new Error('Please select at least one job type')
      }

      // 验证行业
      if (formData.industries.length === 0) {
        throw new Error('Please select at least one industry')
      }

      // TODO: 调用API保存数据
      const response = await fetch('/api/profile/seeker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ...formData,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      // 保存成功，跳转到个人主页
      router.push('/profile')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean)
    setFormData(prev => ({ ...prev, skills }))
  }

  const toggleJobType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type]
    }))
  }

  const toggleIndustry = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }))
  }

  return (
    <ProfileFormLayout
      title="Complete Your Profile"
      subtitle="Help us match you with the best opportunities"
    >
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* 基本信息 */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>

        {/* 专业信息 */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Professional Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. Senior Software Engineer"
            />
          </div>

          <div>
            <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <input
              type="number"
              id="yearsExperience"
              value={formData.yearsExperience}
              onChange={e => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
              max="50"
            />
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills *
            </label>
            <input
              type="text"
              id="skills"
              value={formData.skills.join(', ')}
              onChange={handleSkillsChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. JavaScript, React, Node.js"
            />
            <p className="mt-1 text-sm text-gray-500">
              Separate skills with commas
            </p>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Professional Summary
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Tell us about your professional background and what you're looking for"
            />
          </div>
        </div>

        {/* 求职意向 */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-xl font-semibold text-gray-900">Job Preferences</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Types *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {jobTypeOptions.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleJobType(type)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    formData.jobTypes.includes(type)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Industries *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {industryOptions.map(industry => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => toggleIndustry(industry)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    formData.industries.includes(industry)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Expected Annual Salary
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="salary"
                value={formData.salary}
                onChange={e => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                className="block w-full pl-7 pr-12 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="0"
                min="0"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">USD</span>
              </div>
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </div>
            ) : (
              'Save Profile'
            )}
          </button>
        </div>
      </form>
    </ProfileFormLayout>
  )
}
