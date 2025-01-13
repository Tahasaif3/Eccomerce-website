import { NextResponse } from 'next/server'
import { signupSchema } from '@/lib/validations/auth'
import { hash } from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = signupSchema.parse(body)

    // Here you would typically:
    // 1. Check if user exists
    // 2. Hash password
    // 3. Create user in database
    // For demo, we'll simulate a successful response
    
    const hashedPassword = await hash(password, 12)
    
    // Simulate user creation response
    return NextResponse.json({
      user: {
        id: '1',
        name,
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      token: 'demo-token'
    }, { status: 201 })
    
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Invalid request' },
      { status: 400 }
    )
  }
}

