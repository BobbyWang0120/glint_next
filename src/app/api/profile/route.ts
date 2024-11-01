/**
 * 个人信息API端点
 */
import { NextResponse } from 'next/server'
import { createProtectedHandler } from '../../../lib/auth'
import { prisma } from '../../../../lib/prisma'
import { uploadImage } from '../../../lib/cloudinary'

// 获取个人信息
export const GET = (request: Request) => createProtectedHandler(async (decoded, request) => {
  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: decoded.userId }
    })

    return NextResponse.json({
      success: true,
      data: profile || {}
    })
  } catch (error) {
    console.error('获取个人信息失败:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch profile'
    }, { status: 500 })
  }
}, request)

// 更新个人信息
export const POST = (request: Request) => createProtectedHandler(async (decoded, request) => {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const bio = formData.get('bio') as string
    const avatarFile = formData.get('avatar') as File | null

    let avatarUrl = null
    if (avatarFile) {
      // 将File对象转换为Buffer
      const buffer = Buffer.from(await avatarFile.arrayBuffer())
      
      // 上传到Cloudinary
      avatarUrl = await uploadImage(buffer)
    }

    // 使用upsert确保即使用户资料不存在也能创建
    const profile = await prisma.userProfile.upsert({
      where: { userId: decoded.userId },
      update: {
        name: name || null,
        phone: phone || null,
        bio: bio || null,
        ...(avatarUrl && { avatar: avatarUrl })
      },
      create: {
        userId: decoded.userId,
        name: name || null,
        phone: phone || null,
        bio: bio || null,
        avatar: avatarUrl
      }
    })

    return NextResponse.json({
      success: true,
      data: profile
    })
  } catch (error) {
    console.error('更新个人信息失败:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to update profile'
    }, { status: 500 })
  }
}, request)
