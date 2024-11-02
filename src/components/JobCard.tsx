/**
 * 工作卡片组件
 * 用于在职位列表中展示单个职位信息
 */
import Link from 'next/link'
import Badge from './Badge'
import CompanyIcon from './CompanyIcon'

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  tags: string[];
  postedAt: string;
  type: string[];
}

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
  description,
  tags,
  postedAt,
  type
}: JobCardProps) {
  return (
    <Link 
      href={`/jobs/${id}`}
      className="block bg-white rounded-lg border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
              {title}
            </h3>
            <p className="text-gray-600">{company}</p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <CompanyIcon company={company} />
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="space-y-3">
          <div className="flex items-center text-gray-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {location}
          </div>

          <div className="flex flex-wrap gap-2">
            {type.map((t) => (
              <Badge key={t} text={t} variant="info" size="sm" />
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} text={tag} variant="default" size="sm" />
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-indigo-600 font-medium">
              {salary}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {postedAt}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
