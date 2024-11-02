/**
 * Glint首页
 * 展示主要功能和统计数据
 */
import MobileNav from '@/components/MobileNav'
import CompanyLogos from '@/components/CompanyLogos'
import CompanyIcon from '@/components/CompanyIcon'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const popularTags = ["Software Engineer", "Product Manager", "Data Scientist", "Remote Jobs"];
  
  const featuredJobs = [
    {
      title: "Senior Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      type: ["Full-time", "Remote"],
      salary: "$150K - $200K",
      description: "Join our team to build next-generation cloud infrastructure and help scale Google's most critical services."
    },
    {
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      type: ["Full-time", "Hybrid"],
      salary: "$130K - $180K",
      description: "Work on cutting-edge web applications and help shape the future of Microsoft's cloud services."
    },
    {
      title: "UI/UX Designer",
      company: "Apple",
      location: "Cupertino, CA",
      type: ["Full-time", "On-site"],
      salary: "$120K - $160K",
      description: "Create beautiful and intuitive user experiences for Apple products."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

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

      {/* Featured Jobs */}
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Featured Jobs</h2>
          <p className="text-gray-600 text-center mb-12">Handpicked opportunities from top companies</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div key={`${job.company}-${job.title}`} className="job-card group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <div className="flex-shrink-0 ml-4 transform group-hover:scale-110 transition-transform">
                    <CompanyIcon company={job.company} />
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {job.location}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.type.map((type) => (
                      <span key={type} className="job-tag">
                        {type}
                      </span>
                    ))}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">{job.salary}</span>
                  </div>
                </div>
                <button className="mt-6 w-full py-2.5 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Glint */}
      <div className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Why Choose Glint</h2>
          <p className="text-gray-600 text-center mb-12">Empowering careers, connecting talents</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="feature-icon">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Matching</h3>
              <p className="text-gray-600">Our advanced AI technology ensures perfect matches between talents and opportunities</p>
            </div>
            
            <div className="text-center p-6">
              <div className="feature-icon">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Recruitment Team</h3>
              <p className="text-gray-600">Dedicated recruitment specialists with deep industry knowledge</p>
            </div>
            
            <div className="text-center p-6">
              <div className="feature-icon">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast & Efficient</h3>
              <p className="text-gray-600">Streamlined process that saves time and resources for both parties</p>
            </div>
          </div>
        </div>
      </div>

      {/* 合作公司 */}
      <div className="bg-gray-50 py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-semibold text-center mb-12">Trusted by Leading Companies</h2>
          <CompanyLogos />
        </div>
      </div>

      {/* CTA区域 */}
      <div className="bg-indigo-600 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join Glint today and connect with opportunities that match your potential
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="cta-button bg-white text-indigo-600 hover:bg-gray-100">
              Get Started
            </a>
            <a href="/contact" className="cta-button border-2 border-white text-white hover:bg-indigo-700">
              Contact Sales
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
