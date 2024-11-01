/**
 * 用户注册API端点
 */
import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json()

    // 验证请求数据
    if (!email || !password || !role) {
      return NextResponse.json({
        success: false,
        message: 'Please provide all required information'
      }, { status: 400 })
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email format'
      }, { status: 400 })
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        message: 'Password must be at least 6 characters long'
      }, { status: 400 })
    }

    // 验证用户类型
    if (!['seeker', 'employer'].includes(role)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid user type'
      }, { status: 400 })
    }

    // 检查邮箱是否已被注册
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'This email is already registered'
      }, { status: 400 })
    }

    // 对密码进行加密
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // 创建新用户
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // 存储加密后的密码
        role
      }
    })

    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: 'Registration successful',
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
      message: 'An error occurred during registration'
    }, { status: 500 })
  }
}
