import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    // Get the user information from the cookie
    const userCookie = cookies().get('user')
    
    if (!userCookie) {
      throw new Error('No user found')
    }

    const user = JSON.parse(userCookie.value)

    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 }
    )
  }
}

