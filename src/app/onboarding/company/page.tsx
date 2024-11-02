/**
 * 企业资料完善页面
 */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProfileFormLayout from '@/components/ProfileFormLayout'
import { useAuth } from '@/contexts/AuthContext'

interface CompanyFormData {
  name: string
  website: string
  industry: string
  size: string
  founded: string
  phone: string
  email: string
  location: string
  address: string
  description: string
  mission: string
  culture: string
  benefits: string[]
  linkedin: string
  twitter: string
  licenseNumber: string
}

const companySizeOptions = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
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

export default function CompanyOnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    website: '',
    industry: '',
    size: '',
    founded: '',
    phone: '',
    email: '',
    location: '',
    address: '',
    description: '',
    mission: '',
    culture: '',
    benefits: [],
    linkedin: '',
    twitter: '',
    licenseNumber: ''
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
      if (!formData.name || !formData.industry || !formData.size || !formData.location) {
        throw new Error('Please fill in all required fields')
      }

      // 验证网站URL格式
      if (formData.website && !formData.website.match(/^https?:\/\/.+/)) {
        throw new Error('Please enter a valid website URL')
      }

      // 验证邮箱格式
      if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error('Please enter a valid email address')
      }

      // TODO: 调用API保存数据
      const response = await fetch('/api/profile/company', {
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

      // 保存成功，跳转到企业主页
      router.push('/company/profile')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleBenefitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const benefits = e.target.value.split(',').map(benefit => benefit.trim()).filter(Boolean)
    setFormData(prev => ({ ...prev, benefits }))
  }

  return (
    <ProfileFormLayout
      title="Complete Company Profile"
      subtitle="Help us showcase your company to potential candidates"
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
            <div className="col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Company Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="url"
                id="website"
                value={formData.website}
                onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://"
              />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Industry *
              </label>
              <select
                id="industry"
                value={formData.industry}
                onChange={e => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select industry</option>
                {industryOptions.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                Company Size *
              </label>
              <select
                id="size"
                value={formData.size}
                onChange={e => setFormData(prev => ({ ...prev, size: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select size</option>
                {companySizeOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="founded" className="block text-sm font-medium text-gray-700">
                Founded Year
              </label>
              <input
                type="number"
                id="founded"
                value={formData.founded}
                onChange={e => setFormData(prev => ({ ...prev, founded: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        </div>

        {/* 联系信息 */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location *
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="City, Country"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Full Address
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* 公司介绍 */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-xl font-semibold text-gray-900">Company Profile</h2>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Company Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Tell us about your company"
              required
            />
          </div>

          <div>
            <label htmlFor="mission" className="block text-sm font-medium text-gray-700">
              Company Mission
            </label>
            <textarea
              id="mission"
              value={formData.mission}
              onChange={e => setFormData(prev => ({ ...prev, mission: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="What is your company's mission?"
            />
          </div>

          <div>
            <label htmlFor="culture" className="block text-sm font-medium text-gray-700">
              Company Culture
            </label>
            <textarea
              id="culture"
              value={formData.culture}
              onChange={e => setFormData(prev => ({ ...prev, culture: e.target.value }))}
              rows={3}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe your company culture"
            />
          </div>

          <div>
            <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
              Employee Benefits
            </label>
            <input
              type="text"
              id="benefits"
              value={formData.benefits.join(', ')}
              onChange={handleBenefitsChange}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. Health Insurance, 401k, Remote Work"
            />
            <p className="mt-1 text-sm text-gray-500">
              Separate benefits with commas
            </p>
          </div>
        </div>

        {/* 社交媒体 */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-xl font-semibold text-gray-900">Social Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                value={formData.linkedin}
                onChange={e => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://linkedin.com/company/..."
              />
            </div>

            <div>
              <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                Twitter
              </label>
              <input
                type="url"
                id="twitter"
                value={formData.twitter}
                onChange={e => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </div>

        {/* 认证信息 */}
        <div className="space-y-6 pt-6 border-t">
          <h2 className="text-xl font-semibold text-gray-900">Verification</h2>
          
          <div>
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
              Business License Number
            </label>
            <input
              type="text"
              id="licenseNumber"
              value={formData.licenseNumber}
              onChange={e => setFormData(prev => ({ ...prev, licenseNumber: e.target.value }))}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
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
