/**
 * 用户注册API端点
 */
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json()

    // 验证请求数据
    if (!email || !password || !role) {
      return NextResponse.json({
        success: false,
        message: '请提供所有必需的信息'
      }, { status: 400 })
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: '邮箱格式无效'
      }, { status: 400 })
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        message: '密码长度至少为6位'
      }, { status: 400 })
    }

    // 验证用户类型
    if (!['seeker', 'employer'].includes(role)) {
      return NextResponse.json({
        success: false,
        message: '无效的用户类型'
      }, { status: 400 })
    }

    // 检查邮箱是否已被注册
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: '该邮箱已被注册'
      }, { status: 400 })
    }

    // 创建新用户
    const newUser = await prisma.user.create({
      data: {
        email,
        password, // 注意：实际应用中应该对密码进行加密
        role
      }
    })

    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: '注册成功',
      data: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      }
    })

  } catch (error) {
    console.error('注册失败:', error)
    return NextResponse.json({
      success: false,
      message: '注册过程中发生错误'
    }, { status: 500 })
  }
}
