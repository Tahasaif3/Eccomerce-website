'use client'

import { useState } from 'react'
import { useCart } from '../../context/cartContext'
import Navbar from '../../components/navbar'
import { Footer } from '../../components/footer'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Checkbox } from "../../components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createShipment } from '../actions/create-shipment'

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('bank')
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      
      // Add cart items and total to form data
      formData.append('items', JSON.stringify(state.items))
      formData.append('total', state.total.toString())
      formData.append('paymentMethod', paymentMethod)

      const result = await createShipment(formData)
      
      if (result.success) {
        dispatch({ type: 'CLEAR_CART' })
        toast.success('Order placed successfully!', {
          description: `Tracking number: ${result.trackingNumber}`,
        })
        
        // Encode the order details for URL
        const orderDetailsParam = encodeURIComponent(JSON.stringify(result.orderDetails))
        router.push(`/order-success?details=${orderDetailsParam}`)
      }
    } catch (error) {
      console.error('Order placement error:', error)
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="container min-h-screen mx-auto">
        <Navbar />
        <div className="text-center py-8">
          <p>Your cart is empty</p>
          <Button
            className="mt-4"
            onClick={() => router.push('/')}
          >
            Continue Shopping
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="container min-h-screen mx-auto">
      <Navbar/>
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 ml-4 sm:ml-8 mt-4 sm:mt-8">
  <Link href="/account" className="hover:text-primary">Account</Link>
  <span>/</span>
  <Link href="/account" className="hover:text-primary">My Account</Link>
  <span>/</span>
  <Link href="/product" className="hover:text-primary">Product</Link>
  <span>/</span>
  <Link href="/cart" className="hover:text-primary">View Cart</Link>
  <span>/</span>
  <span className="text-primary">Checkout</span>
</nav>


      <div className="grid lg:grid-cols-2 gap-12">
        {/* Billing Details Form */}
        <div>
          <h1 className="text-2xl font-semibold mb-6 ml-6">Billing Details</h1>
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4 mb-8 ml-8">
            <div>
              <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name*</Label>
              <Input id="firstName" name="firstName" required className="bg-secondary/50" />
            </div>
            <div>
              <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</Label>
              <Input id="companyName" name="companyName" className="bg-secondary/50" />
            </div>
            <div>
              <Label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address*</Label>
              <Input id="streetAddress" name="streetAddress" required className="bg-secondary/50" />
            </div>
            <div>
              <Label htmlFor="apartment" className="block text-sm font-medium text-gray-700">Apartment, floor, etc. (optional)</Label>
              <Input id="apartment" name="apartment" className="bg-secondary/50" />
            </div>
            <div>
              <Label htmlFor="townCity" className="block text-sm font-medium text-gray-700">Town/City*</Label>
              <Input id="townCity" name="townCity" required className="bg-secondary/50" />
            </div>
            <div>
              <Label htmlFor="state" className="block text-sm font-medium text-gray-700">State*</Label>
              <Input id="state" name="state" required className="bg-secondary/50" />
            </div>
            <div>
              <Label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code*</Label>
              <Input id="zipCode" name="zipCode" required className="bg-secondary/50" />
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number*</Label>
              <Input id="phoneNumber" name="phoneNumber" required className="bg-secondary/50" />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address*</Label>
              <Input id="email" name="email" type="email" required className="bg-secondary/50" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="save-info" />
              <Label htmlFor="save-info" className="text-sm">
                Save this information for faster check-out next time
              </Label>
            </div>
          </form>
        </div>

        <div className="space-y-6 mt-12">
          {/* Products */}
          <div className="space-y-4">
            {state.items.map((item) => (
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
                    <span>{item.name}</span>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at next step</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
          </div>

          <RadioGroup defaultValue="bank" onValueChange={setPaymentMethod} className="space-y-3">
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank">Bank</Label>
              </div>
              <div className="flex gap-2">
                <Image src="/Bkash.png" alt="Bkash" width={40} height={24} />
                <Image src="/Visa.png" alt="Visa" width={40} height={24} />
                <Image src="/Mastercard.png" alt="Mastercard" width={40} height={24} />
                <Image src="/Nagad.png" alt="Nagad" width={40} height={24} />
              </div>
            </div>
            <div className="flex items-center border rounded-lg p-4">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="ml-2">Cash on delivery</Label>
            </div>
          </RadioGroup>

          <div className="flex gap-2">
            <Input placeholder="Coupon Code" className="bg-secondary/50" />
            <Button variant="secondary" className="whitespace-nowrap">
              Apply Coupon
            </Button>
          </div>

          <Button 
            type="submit"
            form="checkout-form"
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </Button>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

