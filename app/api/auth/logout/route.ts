import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Clear the session cookie
    cookies().delete('user')
    
    return NextResponse.json({
      message: 'Logged out successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Logout failed' },
      { status: 500 }
    )
  }
}

