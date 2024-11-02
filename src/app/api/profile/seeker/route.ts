/**
 * 求职者资料API路由
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
      firstName,
      lastName,
      phone,
      location,
      title,
      yearsExperience,
      skills,
      bio,
      jobTypes,
      industries,
      salary
    } = await request.json()

    // 创建或更新求职者资料
    const profile = await prisma.seekerProfile.upsert({
      where: {
        userId: session.user.id
      },
      update: {
        firstName,
        lastName,
        phone,
        location,
        title,
        yearsExperience: yearsExperience ? parseInt(yearsExperience) : null,
        skills,
        bio,
        jobTypes,
        industries,
        salary: salary ? parseInt(salary) : null
      },
      create: {
        userId: session.user.id,
        firstName,
        lastName,
        phone,
        location,
        title,
        yearsExperience: yearsExperience ? parseInt(yearsExperience) : null,
        skills,
        bio,
        jobTypes,
        industries,
        salary: salary ? parseInt(salary) : null
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('保存求职者资料失败:', error)
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

    // 获取求职者资料
    const profile = await prisma.seekerProfile.findUnique({
      where: {
        userId: session.user.id
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('获取求职者资料失败:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}
