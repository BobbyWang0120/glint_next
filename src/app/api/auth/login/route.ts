/**
 * 用户登录API端点
 */
import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// JWT密钥，实际应用中应该从环境变量获取
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // 验证请求数据
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Please provide email and password'
      }, { status: 400 })
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // 用户不存在
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password'
      }, { status: 401 })
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password'
      }, { status: 401 })
    }

    // 生成JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' } // token有效期24小时
    )

    // 返回成功响应
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    })

  } catch (error) {
    console.error('登录失败:', error)
    return NextResponse.json({
      success: false,
      message: 'An error occurred during login'
    }, { status: 500 })
  }
}
