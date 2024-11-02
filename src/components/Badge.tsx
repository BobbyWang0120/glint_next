/**
 * 通用标签组件
 * 用于显示工作类型、技能等标签
 */
type BadgeProps = {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export default function Badge({ 
  text, 
  variant = 'default',
  size = 'md' 
}: BadgeProps) {
  const baseClasses = "inline-flex items-center font-medium rounded-full"
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm"
  }

  const variantClasses = {
    default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    error: "bg-red-100 text-red-800 hover:bg-red-200",
    info: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
  }

  return (
    <span className={`
      ${baseClasses}
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      transition-colors
    `}>
      {text}
    </span>
  )
}
