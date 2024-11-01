/**
 * 数据库连接测试API
 * 创建一个测试用户并返回所有用户列表
 */
import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

export async function GET() {
  try {
    // 创建一个测试用户
    const testUser = {
      email: `test${Date.now()}@glint.ai`,
      password: 'test123456', // 在实际应用中应该使用加密的密码
      role: 'seeker' // 测试用户默认为求职者
    }

    const newUser = await prisma.user.create({
      data: testUser
    })

    // 获取所有用户列表
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        // 出于安全考虑，不返回password字段
      }
    })

    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '数据库连接测试成功',
      data: {
        newUser: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt,
        },
        users
      }
    })
  } catch (error) {
    // 错误处理
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    console.error('数据库测试失败:', errorMessage)
    
    // 返回错误响应
    return NextResponse.json({
      success: false,
      message: '数据库连接测试失败',
      error: errorMessage
    }, { 
      status: 500 
    })
  }
}
