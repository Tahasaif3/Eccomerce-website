'use client'

import { useCart } from '../../context/cartContext'
import { Button } from "../../components/ui/button"
import Link from 'next/link'
import { Input } from "../../components/ui/input"
import Navbar from '../../components/navbar'
import { Footer } from '../../components/footer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function CartPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const proceedToCheckout = () => {
    if (state.items.length > 0) {
      router.push('/checkout')
    }
  }

  return (
    <div className="container min-h-screen mx-auto">
      <Navbar />
      <div className="px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        
        {state.items.length === 0 ? (
          <div className="text-center py-8">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b py-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-lg font-bold">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-20 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-4">
                <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/Checkout">
                <Button
                  className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white"
                  onClick={proceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

