'use client'

import { useAuth } from '../../../context/authContext'
import Navbar from '../../..//components/navbar'
import { Footer } from '../../..//components/footer'
import { Button } from "../../../components/ui/button"
import Link from 'next/link'

export default function CancellationsPage() {
  const { user, logout } = useAuth()

  const cancellations = (user as { cancellations?: { id: string, orderId: string, date: string, reason: string }[] })?.cancellations ?? []

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/account" className="hover:text-primary">My Account</Link>
          <span>/</span>
          <span className="text-primary">My Cancellations</span>
        </nav>

        <div className="grid md:grid-cols-[250px,1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <h2 className="font-semibold mb-4">Manage My Account</h2>
            <Link href="/account">
              <Button variant="ghost" className="w-full justify-start">
                My Profile
              </Button>
            </Link>
            <Link href="/account/orders">
              <Button variant="ghost" className="w-full justify-start">
                My Orders
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start bg-red-50">
              My Cancellations
            </Button>
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
            <h1 className="text-2xl font-semibold mb-6">My Cancellations</h1>

            {/* Cancellations list */}
            <div className="space-y-4">
              {cancellations.length > 0 ? (
                cancellations.map((cancellation) => (
                  <div key={cancellation.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold">Order #{cancellation.orderId}</h3>
                    <p className="text-sm text-muted-foreground">Cancelled on: {new Date(cancellation.date).toLocaleDateString()}</p>
                    <p className="mt-2">{cancellation.reason}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">You have no cancellations.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
