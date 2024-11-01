/**
 * 认证相关工具函数
 */
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// JWT token验证中间件
export async function verifyToken(token: string) {
  try {
    // 验证token
    const decoded = jwt.verify(token, JWT_SECRET)
    return {
      success: true,
      data: decoded
    }
  } catch (error) {
    return {
      success: false,
      error: 'Invalid token'
    }
  }
}

// 从请求头中提取token
export function extractToken(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.split(' ')[1]
}

// 创建受保护的API响应处理器
export async function createProtectedHandler(
  handler: (decoded: any, request: Request) => Promise<NextResponse>,
  request: Request
) {
  const token = extractToken(request)
  
  if (!token) {
    return NextResponse.json({
      success: false,
      message: 'No token provided'
    }, { status: 401 })
  }

  const verifyResult = await verifyToken(token)
  if (!verifyResult.success) {
    return NextResponse.json({
      success: false,
      message: 'Invalid token'
    }, { status: 401 })
  }

  return handler(verifyResult.data, request)
}

// 用户角色类型
export type UserRole = 'seeker' | 'employer'

// 验证用户角色
export function verifyRole(
  decoded: any,
  allowedRoles: UserRole[]
): boolean {
  return decoded && decoded.role && allowedRoles.includes(decoded.role)
}
