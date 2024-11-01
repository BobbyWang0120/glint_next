/**
 * Glint首页组件
 * 展示平台的主要价值主张和简单介绍
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
      {/* 主要内容区域 */}
      <main className="text-center px-4">
        {/* 标题区域 */}
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          Glint
        </h1>
        
        {/* 副标题/简介 */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          用AI重新定义招聘体验
        </p>
        
        {/* 价值主张 */}
        <p className="mt-4 text-gray-500">
          让找工作的人和招人的公司，互相更懂对方
        </p>
      </main>
    </div>
  );
}
