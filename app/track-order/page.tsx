'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Navbar from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Loader2, Package, MapPin, AlertTriangle } from 'lucide-react'
import type { TrackingInfo } from '@/types/order'

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleTrackOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/tracking/${trackingNumber}`)
      if (!response.ok) {
        throw new Error('Failed to fetch tracking info')
      }
      const data = await response.json()
      setTrackingInfo(data)
    } catch (error) {
      console.error('Error fetching tracking info:', error)
      setError('Unable to fetch tracking information. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container min-h-screen mx-auto flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Track Your Order</CardTitle>
            <CardDescription>Enter your order ID or tracking number to get the latest updates on your shipment.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackOrder} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Order ID or Tracking Number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Track Order'}
              </Button>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {trackingInfo && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Tracking Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <Package className="h-5 w-5" />
                    <span className="font-medium">{trackingInfo.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{trackingInfo.location}</span>
                  </div>
                  <p className="text-muted-foreground">{trackingInfo.description}</p>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {new Date(trackingInfo.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

