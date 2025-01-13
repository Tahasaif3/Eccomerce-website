'use client'

import { useState } from 'react'
import { useAuth } from '../../context/authContext'
import Navbar from '../../components/navbar'
import { Footer } from '../../components/footer'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Link from 'next/link'
import { toast } from 'sonner'

export default function AccountPage() {
  const { user, updateProfile, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        address: formData.address
      })
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-primary">My Account</span>
        </nav>

        <div className="grid md:grid-cols-[250px,1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <h2 className="font-semibold mb-4">Manage My Account</h2>
            <Button
              variant="ghost"
              className="w-full justify-start bg-red-50"
              onClick={() => setIsEditing(false)}
            >
              My Profile
            </Button>
            <Link href="/account/orders">
              <Button variant="ghost" className="w-full justify-start">
                My Orders
              </Button>
            </Link>
            <Link href="/account/cancellations">
              <Button variant="ghost" className="w-full justify-start">
                My Cancellations
              </Button>
            </Link>
            <Link href="/account/reviews">
              <Button variant="ghost" className="w-full justify-start">
                My Reviews
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600"
              onClick={logout}
            >
              Logout
            </Button>
          </div>

          {/* Main Content */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">My Profile</h1>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                {isEditing ? 'Cancel' : 'Edit Your Profile'}
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <>
                  <h3 className="font-semibold mt-8 mb-4">Password Changes</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <Input
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <Input
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

