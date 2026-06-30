import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { supabase, createAdminClient } from '@/lib/supabase'
import { DEFAULT_CONTENT } from '@/lib/content'
import type { SiteContent } from '@/types/content'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 1)
      .single()

    if (error || !data) return NextResponse.json(DEFAULT_CONTENT)
    return NextResponse.json(data.content)
  } catch {
    return NextResponse.json(DEFAULT_CONTENT)
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')
  const secret = process.env.ADMIN_SECRET

  if (!token || !secret || token.value !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: SiteContent
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { error } = await admin
    .from('site_content')
    .upsert({ id: 1, content: body, updated_at: new Date().toISOString() })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  revalidatePath('/')
  return NextResponse.json({ ok: true })
}
