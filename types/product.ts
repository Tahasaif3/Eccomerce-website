export interface Product {
    _id: string
    name: string
    slug: string
    price: number
    image: string
    rating: number
    reviews: number
    isNew?: boolean
    colors?: string[]
  }
  
  export interface ProductDetails extends Product {
    description: string
    sizes?: string[]
    images?: any[]
    relatedProducts?: Product[]
  }
  
  