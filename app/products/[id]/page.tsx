'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Label } from "../../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../..//components/ui/select"
import { Loader2, Star, StarHalf, Heart, Share2, ShoppingCart } from 'lucide-react'
import { useToast } from "../../../hooks/use-toast"
import Navbar from "../../../components/navbar"
import { Footer } from "../../../components/footer"
import { useCart } from '../../../context/cartContext'
import { useWishlist } from '../../../context/wishlist-context'

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  colors?: string[]
  sizes?: string[]
  rating: number
  reviews: number
  weight?: number
}

export default function ProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState('1')
  const { toast } = useToast()
  
  const { addToCart } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const isWishlisted = product ? isInWishlist(product.id) : false

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (!id) {
          throw new Error('Product ID is required')
        }

        const response = await fetch(`/api/products/${id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`)
        }

        const data = await response.json()
        
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid product data received')
        }

        setProduct(data)
        if (data.colors?.length > 0) setSelectedColor(data.colors[0])
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0])
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return

    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight || 0, 
      color: selectedColor,
      size: selectedSize,
// @ts-expect-error: Suppressing error because we are manually adding the 'quantity' field back after using Omit
quantity: parseInt(quantity, 10)
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const toggleWishlist = () => {
    if (!product) return

    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const handleRetry = () => {
    setError(null)
    setLoading(true)
    router.refresh()
  }

  const renderRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-5 h-5 fill-primary text-primary" />)
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-5 h-5 fill-primary text-primary" />)
    }

    return stars
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-muted-foreground">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md">
              {error || 'Product not found'}
            </div>
            <Button onClick={handleRetry}>
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderRatingStars(product.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviews} reviews
                </span>
              </div>
              <p className="text-3xl font-bold mb-4">
                ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
              </p>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-4">
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <Label>Color</Label>
                  <RadioGroup
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                    className="flex flex-wrap gap-2"
                  >
                    {product.colors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <RadioGroupItem value={color} id={`color-${color}`} />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <Label>Size</Label>
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className="flex flex-wrap gap-2"
                  >
                    {product.sizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <RadioGroupItem value={size} id={`size-${size}`} />
                        <Label htmlFor={`size-${size}`}>{size}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              <div className="space-y-2">
                <Label>Quantity</Label>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Qty" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button> */}
                <Button 
  className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-6" 
  size="lg"
  onClick={handleAddToCart}
>
  <ShoppingCart className="w-4 h-4 mr-2" />
  <span className="hidden sm:inline">Add to Cart</span>
  <span className="sm:hidden">Add to Cart</span>
</Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleWishlist}
                >
                  <Heart
                    className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-primary' : ''}`}
                  />
                  {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Loader2, Star, StarHalf, Heart, Share2, ShoppingCart } from 'lucide-react'
// import { useToast } from "@/hooks/use-toast"
// import Navbar from "@/components/navbar"
// import { Footer } from "@/components/footer"
// import { useCart } from '@/context/cartContext'
// import { useWishlist } from '@/context/wishlist-context'
// import { urlForImage } from '@/lib/sanity'

// interface Product {
//   _id: string
//   name: string
//   description: string
//   price: number
//   category: string
//   image: any
//   colors?: string[]
//   sizes?: string[]
//   rating: number
//   reviews: number
//   weight?: number
// }

// interface ProductPageProps {
//   product: Product
// }

// export default function ProductPage({ product }: ProductPageProps) {
//   const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '')
//   const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '')
//   const [quantity, setQuantity] = useState('1')
//   const { toast } = useToast()
  
//   const { addToCart } = useCart()
//   const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
//   const isWishlisted = isInWishlist(product._id)

//   const handleAddToCart = () => {
//     addToCart({
//       id: product._id,
//       name: product.name,
//       price: product.price,
//       image: urlForImage(product.image).url(),
//       weight: product.weight || 0, 
//       color: selectedColor,
//       size: selectedSize,
//       quantity: parseInt(quantity, 10)
//     })

//     toast({
//       title: "Added to Cart",
//       description: `${product.name} has been added to your cart.`,
//     })
//   }

//   const toggleWishlist = () => {
//     if (isWishlisted) {
//       removeFromWishlist(product._id)
//       toast({
//         title: "Removed from Wishlist",
//         description: `${product.name} has been removed from your wishlist.`,
//       })
//     } else {
//       addToWishlist({
//         id: product._id,
//         name: product.name,
//         price: product.price,
//         image: urlForImage(product.image).url(),
//       })
//       toast({
//         title: "Added to Wishlist",
//         description: `${product.name} has been added to your wishlist.`,
//       })
//     }
//   }

//   const renderRatingStars = (rating: number) => {
//     const stars = []
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 >= 0.5

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={`star-${i}`} className="w-5 h-5 fill-primary text-primary" />)
//     }
//     if (hasHalfStar) {
//       stars.push(<StarHalf key="half-star" className="w-5 h-5 fill-primary text-primary" />)
//     }

//     return stars
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow container mx-auto py-8 px-4">
//         <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
//           <div className="space-y-4">
//             <Card>
//               <CardContent className="p-4">
//                 <div className="relative aspect-square w-full rounded-lg overflow-hidden">
//                   <Image
//                     src={urlForImage(product.image).url()}
//                     alt={product.name}
//                     fill
//                     className="object-cover"
//                     priority
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="flex items-center gap-1">
//                   {renderRatingStars(product.rating)}
//                 </div>
//                 <span className="text-sm text-muted-foreground">
//                   {product.reviews} reviews
//                 </span>
//               </div>
//               <p className="text-3xl font-bold mb-4">
//                 ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
//               </p>
//               <p className="text-gray-600">{product.description}</p>
//             </div>

//             <div className="space-y-4">
//               {product.colors && product.colors.length > 0 && (
//                 <div className="space-y-2">
//                   <Label>Color</Label>
//                   <RadioGroup
//                     value={selectedColor}
//                     onValueChange={setSelectedColor}
//                     className="flex flex-wrap gap-2"
//                   >
//                     {product.colors.map((color) => (
//                       <div key={color} className="flex items-center space-x-2">
//                         <RadioGroupItem value={color} id={`color-${color}`} />
//                         <Label htmlFor={`color-${color}`}>{color}</Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               )}

//               {product.sizes && product.sizes.length > 0 && (
//                 <div className="space-y-2">
//                   <Label>Size</Label>
//                   <RadioGroup
//                     value={selectedSize}
//                     onValueChange={setSelectedSize}
//                     className="flex flex-wrap gap-2"
//                   >
//                     {product.sizes.map((size) => (
//                       <div key={size} className="flex items-center space-x-2">
//                         <RadioGroupItem value={size} id={`size-${size}`} />
//                         <Label htmlFor={`size-${size}`}>{size}</Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label>Quantity</Label>
//                 <Select value={quantity} onValueChange={setQuantity}>
//                   <SelectTrigger className="w-24">
//                     <SelectValue placeholder="Qty" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[1, 2, 3, 4, 5].map((num) => (
//                       <SelectItem key={num} value={num.toString()}>
//                         {num}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Button 
//                   className="flex-1" 
//                   size="lg"
//                   onClick={handleAddToCart}
//                 >
//                   <ShoppingCart className="w-4 h-4 mr-2" />
//                   Add to Cart
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   onClick={toggleWishlist}
//                 >
//                   <Heart
//                     className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-primary' : ''}`}
//                   />
//                   {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
//                 </Button>
//                 <Button variant="outline" size="icon">
//                   <Share2 className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }


// 'use client'

// import { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { useParams } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Loader2, Star, StarHalf, Heart, Share2, ShoppingCart } from 'lucide-react'
// import { useToast } from "@/hooks/use-toast"
// import Navbar from "@/components/navbar"
// import { Footer } from "@/components/footer"
// import { useCart } from '@/context/cartContext'
// import { useWishlist } from '@/context/wishlist-context'

// interface Product {
//   id: number
//   name: string
//   description: string
//   price: number
//   category: string
//   image: string
//   colors?: string[]
//   sizes?: string[]
//   rating: number
//   reviews: number
//   weight?: number
// }

// export default function ProductPage() {
//   const { id } = useParams()
//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [selectedColor, setSelectedColor] = useState<string>('')
//   const [selectedSize, setSelectedSize] = useState<string>('')
//   const [quantity, setQuantity] = useState('1')
//   const { toast } = useToast()
  
//   const { addToCart } = useCart();
//   const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
//   const isWishlisted = product ? isInWishlist(product.id) : false

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         if (!id) {
//           throw new Error('Product ID is required')
//         }
//         const response = await fetch(`https://678024ce0476123f76a9be30.mockapi.io/products/${id}`)
//         if (!response.ok) {
//           throw new Error('Failed to fetch product')
//         }
//         const data = await response.json()
//         setProduct(data)
//         if (data.colors?.length > 0) setSelectedColor(data.colors[0])
//         if (data.sizes?.length > 0) setSelectedSize(data.sizes[0])
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//   }, [id])

//   const handleAddToCart = () => {
//     if (!product) return

//     addToCart({
//       id: product.id.toString(),
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       weight: product.weight || 0, 
//       color: selectedColor,
//       size: selectedSize,
//     })

//     toast({
//       title: "Added to Cart",
//       description: `${product.name} has been added to your cart.`,
//     })
//   }

//   const toggleWishlist = () => {
//     if (!product) return

//     if (isWishlisted) {
//       removeFromWishlist(product.id)
//       toast({
//         title: "Removed from Wishlist",
//         description: `${product.name} has been removed from your wishlist.`,
//       })
//     } else {
//       addToWishlist({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//       })
//       toast({
//         title: "Added to Wishlist",
//         description: `${product.name} has been added to your wishlist.`,
//       })
//     }
//   }

//   const renderRatingStars = (rating: number) => {
//     const stars = []
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 >= 0.5

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={`star-${i}`} className="w-5 h-5 fill-primary text-primary" />)
//     }
//     if (hasHalfStar) {
//       stars.push(<StarHalf key="half-star" className="w-5 h-5 fill-primary text-primary" />)
//     }

//     return stars
//   }

//   if (loading) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="flex flex-col items-center gap-2">
//             <Loader2 className="h-8 w-8 animate-spin" />
//             <p className="text-muted-foreground">Loading product details...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     )
//   }

//   if (error || !product) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md">
//             {error || 'Product not found'}
//           </div>
//         </div>
//         <Footer />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow container mx-auto py-8 px-4">
//         <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
//           <div className="space-y-4">
//             <Card>
//               <CardContent className="p-4">
//                 <div className="relative aspect-square w-full rounded-lg overflow-hidden">
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     fill
//                     className="object-cover"
//                     priority
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="flex items-center gap-1">
//                   {renderRatingStars(product.rating)}
//                 </div>
//                 <span className="text-sm text-muted-foreground">
//                   {product.reviews} reviews
//                 </span>
//               </div>
//               <p className="text-3xl font-bold mb-4">${product.price.toFixed(2)}</p>
//               <p className="text-gray-600">{product.description}</p>
//             </div>

//             <div className="space-y-4">
//               {product.colors && (
//                 <div className="space-y-2">
//                   <Label>Color</Label>
//                   <RadioGroup
//                     value={selectedColor}
//                     onValueChange={setSelectedColor}
//                     className="flex flex-wrap gap-2"
//                   >
//                     {product.colors.map((color) => (
//                       <div key={color} className="flex items-center space-x-2">
//                         <RadioGroupItem value={color} id={`color-${color}`} />
//                         <Label htmlFor={`color-${color}`}>{color}</Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               )}

//               {product.sizes && (
//                 <div className="space-y-2">
//                   <Label>Size</Label>
//                   <RadioGroup
//                     value={selectedSize}
//                     onValueChange={setSelectedSize}
//                     className="flex flex-wrap gap-2"
//                   >
//                     {product.sizes.map((size) => (
//                       <div key={size} className="flex items-center space-x-2">
//                         <RadioGroupItem value={size} id={`size-${size}`} />
//                         <Label htmlFor={`size-${size}`}>{size}</Label>
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label>Quantity</Label>
//                 <Select value={quantity} onValueChange={setQuantity}>
//                   <SelectTrigger className="w-24">
//                     <SelectValue placeholder="Qty" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[1, 2, 3, 4, 5].map((num) => (
//                       <SelectItem key={num} value={num.toString()}>
//                         {num}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Button 
//                   className="flex-1" 
//                   size="lg"
//                   onClick={handleAddToCart}
//                 >
//                   <ShoppingCart className="w-4 h-4 mr-2" />
//                   Add to Cart
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   onClick={toggleWishlist}
//                 >
//                   <Heart
//                     className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-primary' : ''}`}
//                   />
//                   {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
//                 </Button>
//                 <Button variant="outline" size="icon">
//                   <Share2 className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }

