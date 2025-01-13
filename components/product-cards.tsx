"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Eye } from 'lucide-react'
import { Rating } from "../components/ui/rating"
import { ColorPicker } from "../components/ui/color-picker"
import { useState } from "react"
import { Badge } from "../components/ui/badge"
import { Card, CardContent, CardFooter } from "../components/ui/card"
import { Product } from "../types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0])
  
  const price = typeof product.price === 'number' ? product.price : 0

  return (
    <Card className="group relative">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            <button className="rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110">
              <Heart className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110">
              <Eye className="h-5 w-5" />
            </button>
          </div>
          {product.isNew && (
            <Badge className="absolute left-2 top-2" variant="secondary">
              NEW
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <Link href={`/products/${product.slug}`} className="hover:underline">
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <Rating rating={product.rating || 0} reviews={product.reviews || 0} />
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          {product.colors && product.colors.length > 0 && (
            <ColorPicker
              colors={product.colors}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

