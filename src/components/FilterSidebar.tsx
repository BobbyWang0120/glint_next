/**
 * 职位筛选侧边栏组件
 */
'use client'

import { useState } from 'react'

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  sections: FilterSection[];
  onFilterChange: (filters: Record<string, string[]>) => void;
}

export default function FilterSidebar({ sections, onFilterChange }: FilterSidebarProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleCheckboxChange = (sectionTitle: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const sectionFilters = prev[sectionTitle] || [];
      const newSectionFilters = checked
        ? [...sectionFilters, value]
        : sectionFilters.filter(v => v !== value);

      const newFilters = {
        ...prev,
        [sectionTitle]: newSectionFilters
      };

      // 如果某个section的所有过滤器都被移除，则删除该section
      if (newSectionFilters.length === 0) {
        delete newFilters[sectionTitle];
      }

      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-lg border border-gray-200 p-6">
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="border-b border-gray-200 pb-6 last:border-0">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.options.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selectedFilters[section.title]?.includes(option.value) || false}
                    onChange={(e) => handleCheckboxChange(section.title, option.value, e.target.checked)}
                  />
                  <span className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </span>
                  <span className="ml-auto text-xs text-gray-400">
                    ({option.count})
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 已选择的过滤器 */}
      {Object.keys(selectedFilters).length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">
              Selected Filters
            </h3>
            <button
              onClick={() => {
                setSelectedFilters({});
                onFilterChange({});
              }}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([section, values]) =>
              values.map((value) => (
                <span
                  key={`${section}-${value}`}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-indigo-100 text-indigo-800"
                >
                  {value}
                  <button
                    onClick={() => handleCheckboxChange(section, value, false)}
                    className="ml-1 hover:text-indigo-900"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
