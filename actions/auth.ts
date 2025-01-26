'use server'

import { cookies } from 'next/headers'
import { mockUsers } from '@/lib/mock-data'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function loginAction(email: string, password: string) {
  const foundUser = mockUsers.find(u => u.email === email && u.password === password)
  
  if (!foundUser) {
    return { success: false, error: 'Invalid credentials' }
  }

  // Set HTTP-only cookie
  (await cookies()).set('user', JSON.stringify(foundUser), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  redirect('/dashboard')

  // return { success: true, user: foundUser }
}

export async function logoutAction() {
  const headersList = await headers()
  const locale = headersList.get('x-next-locale') || 'en'
  
  ;(await cookies()).delete('user')
  redirect(`/${locale}/login`)
}

export async function getCurrentUser() {
  const userCookie = (await cookies()).get('user')
  
  if (!userCookie) {
    return null
  }

  try {
    return JSON.parse(userCookie.value)
  } catch {
    return null
  }
} 