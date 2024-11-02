/**
 * 企业资料API路由
 */
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    // 获取认证客户端
    const supabase = createRouteHandlerClient({ cookies })
    
    // 获取当前会话
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 解析请求数据
    const {
      name,
      website,
      industry,
      size,
      founded,
      phone,
      email,
      location,
      address,
      description,
      mission,
      culture,
      benefits,
      linkedin,
      twitter,
      licenseNumber
    } = await request.json()

    // 创建或更新企业资料
    const profile = await prisma.companyProfile.upsert({
      where: {
        userId: session.user.id
      },
      update: {
        name,
        website,
        industry,
        size,
        founded: founded ? parseInt(founded) : null,
        phone,
        email,
        location,
        address,
        description,
        mission,
        culture,
        benefits,
        linkedin,
        twitter,
        licenseNumber
      },
      create: {
        userId: session.user.id,
        name,
        website,
        industry,
        size,
        founded: founded ? parseInt(founded) : null,
        phone,
        email,
        location,
        address,
        description,
        mission,
        culture,
        benefits,
        linkedin,
        twitter,
        licenseNumber
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('保存企业资料失败:', error)
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    // 获取认证客户端
    const supabase = createRouteHandlerClient({ cookies })
    
    // 获取当前会话
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 获取企业资料
    const profile = await prisma.companyProfile.findUnique({
      where: {
        userId: session.user.id
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('获取企业资料失败:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}
