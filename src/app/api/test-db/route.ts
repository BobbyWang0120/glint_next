/**
 * 用户模型测试API
 * 基于时间戳创建交替角色（seeker/employer）的测试用户并返回所有用户列表
 */
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET() {
  try {
    const timestamp = Date.now()
    // 使用时间戳的奇偶性来决定角色
    const role = timestamp % 2 === 0 ? 'seeker' : 'employer'

    // 创建一个测试用户
    const newUser = await prisma.user.create({
      data: {
        email: `test${timestamp}@glint.ai`,
        password: 'hashed_password_123', // 实际应用中应该使用加密后的密码
        role: role,
      },
    })

    // 获取所有用户列表
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    // 统计不同角色的用户数量
    const seekerCount = users.filter(u => u.role === 'seeker').length
    const employerCount = users.filter(u => u.role === 'employer').length

    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '用户模型测试成功',
      data: {
        newUser,
        users,
        statistics: {
          totalUsers: users.length,
          seekers: seekerCount,
          employers: employerCount
        }
      }
    })
  } catch (error) {
    // 错误处理
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    console.error('用户模型测试失败:', errorMessage)
    
    // 返回错误响应
    return NextResponse.json({
      success: false,
      message: '用户模型测试失败',
      error: errorMessage
    }, { 
      status: 500 
    })
  }
}
