'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Star, Loader2 } from 'lucide-react'
import Navbar from "../../components/navbar"
import { Footer } from "../../components/footer"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  colors: string[]
  sizes: string[]
  rating: number
  reviews: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data.products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const renderRatingStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 px-4">
      <div className="flex justify-center items-center">
      <h1 className="text-4xl md:text-6xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-fadeIn text-center">
        Our Products
      </h1>
    </div>       
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardContent className="p-4">
                <div className="relative aspect-square mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">{renderRatingStars(product.rating)}</div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                <p className="text-lg font-bold mb-2">${product.price.toFixed(2)}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.colors.map((color) => (
                    <Badge key={color} variant="secondary">
                      {color}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Badge key={size} variant="outline">
                      {size}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 mt-auto">
                <Link href={`/products/${product.id.toString()}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

