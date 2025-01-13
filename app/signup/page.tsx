'use client'

import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Navbar from "../../components/navbar"
import { Footer } from "../../components/footer"
import Image from "next/image"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { useAuth } from '../../context/authContext'
import { Spinner } from '../../components/ui/spinner'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signup(name, email, password)
    } catch (error) {
      console.error('Signup error:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Image */}
        <div className="relative flex-1">
          <div className="flex h-full items-center justify-center p-6">
            <Image
              src="/signup.png"
              alt="Shopping cart with phone and shopping bags"
              width={600}
              height={600}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right side Sign up form */}
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className="text-center text-3xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Enter your details below
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[400px]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-lg border-0 bg-background"
                required
              />
              <Input
                type="email"
                placeholder="Email or Phone Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border-0 bg-background"
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border-0 bg-background"
                required
              />
              <Button 
                type="submit"
                className="w-full bg-[#E94E4E] hover:bg-[#D43E3E] text-white rounded-lg py-6"
                disabled={loading}
              >
                {loading ? <Spinner className="mr-2" /> : null}
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-lg py-6 flex items-center gap-2"
              >
                <FcGoogle className="w-5 h-5" />
                Sign up with Google
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-[#E94E4E] hover:text-[#D43E3E] font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

