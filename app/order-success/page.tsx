'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Loader2, Package, MapPin, Truck, Printer, ArrowRight } from 'lucide-react'
import type { OrderDetails, TrackingInfo } from '@/types/order'
import { printLabel } from '@/utils/print-label'

const OrderSuccessContent = () => {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const detailsParam = searchParams.get('details')
    if (detailsParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(detailsParam))
        setOrderDetails(decoded)
        fetchTrackingInfo(decoded.trackingNumber)
      } catch (error) {
        console.error('Error parsing order details:', error)
      }
    }
  }, [searchParams])

  const fetchTrackingInfo = async (trackingNumber: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/tracking/${trackingNumber}`)
      if (!response.ok) throw new Error('Failed to fetch tracking info')
      const data = await response.json()
      setTrackingInfo(data)
    } catch (error) {
      console.error('Error fetching tracking info:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!orderDetails) {
    return (
      <div className="flex items-center justify-center py-12">
        <p>Order details not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-xl mb-2">Thank you for your purchase.</p>
        <p className="text-lg text-muted-foreground">
          Order ID: <span className="font-mono">{orderDetails.orderId}</span>
        </p>
      </div>

      {/* Order Summary Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {orderDetails.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${orderDetails.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${orderDetails.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${(orderDetails.total + orderDetails.shippingCost).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Details Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Delivery Address</h3>
              <div className="space-y-1 text-muted-foreground">
                <p>{orderDetails.customerDetails.name}</p>
                <p>{orderDetails.customerDetails.address.street}</p>
                {orderDetails.customerDetails.address.apartment && (
                  <p>{orderDetails.customerDetails.address.apartment}</p>
                )}
                <p>
                  {orderDetails.customerDetails.address.city}, {orderDetails.customerDetails.address.state} {orderDetails.customerDetails.address.zipCode}
                </p>
                <p>{orderDetails.customerDetails.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Order Information</h3>
              <div className="space-y-1 text-muted-foreground">
                <p>Order Date: {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
                <p>Payment Method: {orderDetails.paymentMethod}</p>
                <p>Tracking Number: {orderDetails.trackingNumber}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tracking Information Card */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tracking Information</h2>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : trackingInfo ? (
            <div className="space-y-4">
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
            </div>
          ) : (
            <div className="text-center py-8">
              <Truck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p>Tracking information will be available soon</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* <div className="flex justify-center gap-4 mt-8">
        <Button
          onClick={() => printLabel(orderDetails)}
          variant="outline"
          className="flex gap-2"
        >
          <Printer className="w-4 h-4" />
          Print Shipping Label
        </Button>
        <Link href={`/track-order?tracking=${orderDetails.trackingNumber}`}>
          <Button variant="outline" className="flex gap-2">
            Track Order
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/">
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Continue Shopping
          </Button>
        </Link>
      </div> */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
  <Button
    onClick={() => printLabel(orderDetails)}
    variant="outline"
    className="flex gap-2 items-center justify-center md:w-auto w-full"
  >
    <Printer className="w-4 h-4" />
    Print Shipping Label
  </Button>
  <Link href={`/track-order?tracking=${orderDetails.trackingNumber}`}>
    <Button
      variant="outline"
      className="flex gap-2 items-center justify-center md:w-auto w-full"
    >
      Track Order
      <ArrowRight className="w-4 h-4" />
    </Button>
  </Link>
  <Link href="/">
    <Button className="bg-red-500 hover:bg-red-600 text-white md:w-auto w-full">
      Continue Shopping
    </Button>
  </Link>
</div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <div className="container min-h-screen mx-auto">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </div>
  )
}




// old code
// 'use client'

// import { useState, useEffect } from 'react'
// import { useSearchParams } from 'next/navigation'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Button } from "../../components/ui/button"
// import { Card, CardContent } from "../../components/ui/card"
// import Navbar from '../../components/navbar'
// import { Footer } from '../../components/footer'
// import { Loader2, Package, MapPin, Truck, Printer } from 'lucide-react'
// import type { OrderDetails, TrackingInfo } from '../../types/order'
// import { printLabel } from '../../utils/print-label'

// export default function OrderSuccessPage() {
//   const searchParams = useSearchParams()
//   const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
//   const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const detailsParam = searchParams.get('details')
//     if (detailsParam) {
//       try {
//         const decoded = JSON.parse(decodeURIComponent(detailsParam))
//         setOrderDetails(decoded)
//         fetchTrackingInfo(decoded.trackingNumber)
//       } catch (error) {
//         console.error('Error parsing order details:', error)
//       }
//     }
//   }, [searchParams])

//   const fetchTrackingInfo = async (trackingNumber: string) => {
//     try {
//       setLoading(true)
//       const response = await fetch(`/api/tracking/${trackingNumber}`)
//       if (!response.ok) throw new Error('Failed to fetch tracking info')
//       const data = await response.json()
//       setTrackingInfo(data)
//     } catch (error) {
//       console.error('Error fetching tracking info:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!orderDetails) {
//     return (
//       <div className="container min-h-screen mx-auto">
//         <Navbar />
//         <div className="flex items-center justify-center py-12">
//           <p>Order details not found</p>
//         </div>
//         <Footer />
//       </div>
//     )
//   }

//   return (
//     <div className="container min-h-screen mx-auto">
//       <Navbar />
//       <div className="max-w-4xl mx-auto py-12 px-4">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
//           <p className="text-xl mb-2">Thank you for your purchase.</p>
//           <p className="text-lg text-muted-foreground">
//             Order ID: <span className="font-mono">{orderDetails.orderId}</span>
//           </p>
//         </div>

//         {/* Order Summary Card */}
//         <Card className="mb-8">
//           <CardContent className="p-6">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <div className="space-y-4">
//               {orderDetails.items.map((item) => (
//                 <div key={item.id} className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <Image
//                       src={item.image}
//                       alt={item.name}
//                       width={60}
//                       height={60}
//                       className="rounded-lg"
//                     />
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       <p className="text-sm text-muted-foreground">
//                         Quantity: {item.quantity}
//                       </p>
//                     </div>
//                   </div>
//                   <span>${(item.price * item.quantity).toFixed(2)}</span>
//                 </div>
//               ))}
              
//               <div className="border-t pt-4 mt-4">
//                 <div className="flex justify-between mb-2">
//                   <span>Subtotal</span>
//                   <span>${orderDetails.total.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Shipping</span>
//                   <span>${orderDetails.shippingCost.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-semibold text-lg">
//                   <span>Total</span>
//                   <span>${(orderDetails.total + orderDetails.shippingCost).toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Shipping Details Card */}
//         <Card className="mb-8">
//           <CardContent className="p-6">
//             <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="font-medium mb-2">Delivery Address</h3>
//                 <div className="space-y-1 text-muted-foreground">
//                   <p>{orderDetails.customerDetails.name}</p>
//                   <p>{orderDetails.customerDetails.address.street}</p>
//                   {orderDetails.customerDetails.address.apartment && (
//                     <p>{orderDetails.customerDetails.address.apartment}</p>
//                   )}
//                   <p>
//                     {orderDetails.customerDetails.address.city}, {orderDetails.customerDetails.address.state} {orderDetails.customerDetails.address.zipCode}
//                   </p>
//                   <p>{orderDetails.customerDetails.phone}</p>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-medium mb-2">Order Information</h3>
//                 <div className="space-y-1 text-muted-foreground">
//                   <p>Order Date: {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
//                   <p>Payment Method: {orderDetails.paymentMethod}</p>
//                   <p>Tracking Number: {orderDetails.trackingNumber}</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Tracking Information Card */}
//         <Card>
//           <CardContent className="p-6">
//             <h2 className="text-xl font-semibold mb-4">Tracking Information</h2>
//             {loading ? (
//               <div className="flex items-center justify-center py-8">
//                 <Loader2 className="h-8 w-8 animate-spin" />
//               </div>
//             ) : trackingInfo ? (
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2 text-green-600">
//                   <Package className="h-5 w-5" />
//                   <span className="font-medium">{trackingInfo.status}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MapPin className="h-5 w-5" />
//                   <span>{trackingInfo.location}</span>
//                 </div>
//                 <p className="text-muted-foreground">{trackingInfo.description}</p>
//                 <p className="text-sm text-muted-foreground">
//                   Last updated: {new Date(trackingInfo.timestamp).toLocaleString()}
//                 </p>
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <Truck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
//                 <p>Tracking information will be available soon</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <div className="flex justify-center gap-4 mt-8">
//           <Button
//             onClick={() => printLabel(orderDetails)}
//             variant="outline"
//             className="flex gap-2"
//           >
//             <Printer className="w-4 h-4" />
//             Print Shipping Label
//           </Button>
//           <Link href="/">
//             <Button className="bg-red-500 hover:bg-red-600 text-white">
//               Continue Shopping
//             </Button>
//           </Link>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }



