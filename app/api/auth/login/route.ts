import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // TODO: Replace with your actual authentication logic
    // This is a mock implementation. In a real app, you'd verify the credentials against a database
    const user = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID
      name: email.split('@')[0], // Use the part before @ as the name
      email: email
    }

    // Set the user information in a cookie
    cookies().set('user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    return NextResponse.json({
      user: user,
      message: 'Login successful'
    })
  } catch (error) {
    return NextResponse.json(
      { message: 'Login failed' },
      { status: 401 }
    )
  }
}

