'use client'

import { useAuth } from '../../../context/authContext'
import Navbar from '../../../components/navbar'
import { Footer } from '../../../components/footer'
import { Button } from "../../../components/ui/button"
import Link from 'next/link'

export default function OrdersPage() {
  const { user, logout } = useAuth()

  // Type assertion to ensure TypeScript knows that 'user' will have 'orders' property
  const orders = (user as { orders?: { id: string, date: string, status: string, items: { id: string, name: string, quantity: number, price: number }[], total: number }[] })?.orders ?? []

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
          <span className="text-primary">My Orders</span>
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
            <Button variant="ghost" className="w-full justify-start bg-red-50">
              My Orders
            </Button>
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
            <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p>{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <p className="font-medium">Total</p>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No orders found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
