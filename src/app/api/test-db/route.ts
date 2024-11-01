/**
 * 数据库连接测试API
 * 创建一个测试用户并返回所有用户列表
 */
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET() {
  try {
    // 创建一个测试用户
    const newUser = await prisma.user.create({
      data: {
        email: `test${Date.now()}@glint.ai`,
        name: '测试用户',
      },
    })

    // 获取所有用户列表
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '数据库连接测试成功',
      data: {
        newUser,
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
