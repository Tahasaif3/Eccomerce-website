import { NextResponse } from 'next/server'

async function fetchProducts() {
  const response = await fetch('https://678024ce0476123f76a9be30.mockapi.io/products')
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export async function GET() {
  try {
    const products = await fetchProducts()
    return NextResponse.json(
      { products },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const response = await fetch('https://678024ce0476123f76a9be30.mockapi.io/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error('Failed to create product')
    }
    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updateData } = body
    const response = await fetch(`https://678024ce0476123f76a9be30.mockapi.io/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    })
    if (!response.ok) {
      throw new Error('Failed to update product')
    }
    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    const response = await fetch(`https://678024ce0476123f76a9be30.mockapi.io/products/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete product')
    }
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  )
}

// my c0de
// import { NextResponse } from 'next/server'
// import { client } from '@/lib/sanity'

// export const products = [
//   {
//     id: 1,
//     name: "iPhone 13 Pro",
//     description: "Apple's latest flagship smartphone with advanced camera system",
//     price: 999.99,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Graphite", "Gold", "Silver", "Sierra Blue"],
//     sizes: ["128GB", "256GB", "512GB", "1TB"],
//     rating: 4.8,
//     reviews: 1234
//   },
//   {
//     id: 2,
//     name: "MacBook Air M1",
//     description: "Thin and light laptop with Apple's powerful M1 chip",
//     price: 999.00,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Space Gray", "Silver", "Gold"],
//     sizes: ["256GB", "512GB", "1TB"],
//     rating: 4.9,
//     reviews: 2156
//   },
//   {
//     id: 3,
//     name: "Sony WH-1000XM4",
//     description: "Wireless noise-cancelling headphones with exceptional sound quality",
//     price: 349.99,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "Silver", "Blue"],
//     sizes: ["One Size"],
//     rating: 4.7,
//     reviews: 1876
//   },
//   {
//     id: 4,
//     name: "Nike Air Max 270",
//     description: "Comfortable and stylish sneakers for everyday wear",
//     price: 150.00,
//     category: "Fashion",
//     image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "White", "Red", "Blue"],
//     sizes: ["7", "8", "9", "10", "11", "12"],
//     rating: 4.5,
//     reviews: 2341
//   },
//   {
//     id: 5,
//     name: "Kindle Paperwhite",
//     description: "E-reader with adjustable warm light and waterproof design",
//     price: 139.99,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1592496001020-d31bd830651f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "Twilight Blue"],
//     sizes: ["8GB", "32GB"],
//     rating: 4.6,
//     reviews: 1543
//   },
//   {
//     id: 6,
//     name: "Instant Pot Duo",
//     description: "7-in-1 electric pressure cooker for quick and easy meals",
//     price: 89.99,
//     category: "Home & Kitchen",
//     image: "/prod1.jpeg",
//     colors: ["Stainless Steel"],
//     sizes: ["3 Quart", "6 Quart", "8 Quart"],
//     rating: 4.7,
//     reviews: 3210
//   },
//   {
//     id: 7,
//     name: "Fitbit Versa 3",
//     description: "Advanced fitness smartwatch with built-in GPS",
//     price: 229.95,
//     category: "Electronics",
//     image: "/prod2.jpeg",
//     colors: ["Black", "Pink Clay", "Midnight"],
//     sizes: ["One Size"],
//     rating: 4.5,
//     reviews: 1876
//   },
//   {
//     id: 8,
//     name: "Levi's 501 Original Fit Jeans",
//     description: "Classic straight leg jeans with button fly",
//     price: 69.50,
//     category: "Fashion",
//     image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Dark Stonewash", "Black", "Medium Stonewash"],
//     sizes: ["28x30", "30x30", "32x30", "34x30", "36x30"],
//     rating: 4.4,
//     reviews: 2987
//   },
//   {
//     id: 9,
//     name: "Bose QuietComfort Earbuds",
//     description: "True wireless earbuds with world-class noise cancellation",
//     price: 279.00,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Triple Black", "Soapstone"],
//     sizes: ["One Size"],
//     rating: 4.6,
//     reviews: 1432
//   },
//   {
//     id: 10,
//     name: "Yeti Rambler 20 oz Tumbler",
//     description: "Stainless steel tumbler that keeps drinks hot or cold for hours",
//     price: 29.99,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1619120238346-978e07731e77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Stainless Steel", "Black", "Navy", "Seafoam"],
//     sizes: ["20 oz"],
//     rating: 4.8,
//     reviews: 4321
//   },
//   {
//     id: 11,
//     name: "Canon EOS R6",
//     description: "Full-frame mirrorless camera for professional photography",
//     price: 2499.00,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black"],
//     sizes: ["Body Only", "24-105mm Kit"],
//     rating: 4.8,
//     reviews: 876
//   },
//   {
//     id: 12,
//     name: "Patagonia Better Sweater",
//     description: "Warm and comfortable fleece jacket for outdoor activities",
//     price: 139.00,
//     category: "Fashion",
//     image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "Navy", "Gray"],
//     sizes: ["XS", "S", "M", "L", "XL"],
//     rating: 4.7,
//     reviews: 2134
//   },
//   {
//     id: 13,
//     name: "DJI Mavic Air 2",
//     description: "Compact drone with 4K camera and intelligent shooting modes",
//     price: 799.00,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Gray"],
//     sizes: ["Standard", "Fly More Combo"],
//     rating: 4.8,
//     reviews: 1543
//   },
//   {
//     id: 14,
//     name: "Le Creuset Dutch Oven",
//     description: "Enameled cast iron pot for perfect braising and roasting",
//     price: 369.95,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Flame", "Cerise", "Marseille", "Oyster"],
//     sizes: ["4.5 Qt", "5.5 Qt", "7.25 Qt"],
//     rating: 4.9,
//     reviews: 3210
//   },
//   {
//     id: 15,
//     name: "Adidas Ultraboost 21",
//     description: "High-performance running shoes with responsive cushioning",
//     price: 180.00,
//     category: "Fashion",
//     image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Core Black", "Cloud White", "Solar Yellow"],
//     sizes: ["7", "8", "9", "10", "11", "12"],
//     rating: 4.7,
//     reviews: 2876
//   },
//   {
//     id: 16,
//     name: "Nintendo Switch",
//     description: "Versatile gaming console for home and on-the-go play",
//     price: 299.99,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Neon Red/Blue", "Gray"],
//     sizes: ["32GB"],
//     rating: 4.8,
//     reviews: 5432
//   },
//   {
//     id: 17,
//     name: "Philips Hue Starter Kit",
//     description: "Smart lighting system for customizable home ambiance",
//     price: 199.99,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["White and Color Ambiance"],
//     sizes: ["3 Bulbs + Bridge"],
//     rating: 4.6,
//     reviews: 1987
//   },
//   {
//     id: 18,
//     name: "Fjallraven Kanken Backpack",
//     description: "Durable and stylish backpack for everyday use",
//     price: 79.95,
//     category: "Fashion",
//     image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Navy", "Black", "Warm Yellow", "Forest Green"],
//     sizes: ["16L", "20L"],
//     rating: 4.7,
//     reviews: 3210
//   },
//   {
//     id: 19,
//     name: "Vitamix 5200 Blender",
//     description: "Professional-grade blender for smooth smoothies and soups",
//     price: 449.95,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1570275239925-4af0aa93a0dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "White", "Red"],
//     sizes: ["64 oz"],
//     rating: 4.8,
//     reviews: 2765
//   },
//   {
//     id: 20,
//     name: "Apple Watch Series 6",
//     description: "Advanced smartwatch with health and fitness tracking",
//     price: 399.00,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Space Gray", "Silver", "Gold", "Blue", "Red"],
//     sizes: ["40mm", "44mm"],
//     rating: 4.8,
//     reviews: 4321
//   },
//   {
//     id: 21,
//     name: "Roomba i7+",
//     description: "Self-emptying robot vacuum for effortless cleaning",
//     price: 799.99,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black"],
//     sizes: ["One Size"],
//     rating: 4.6,
//     reviews: 1876
//   },
//   {
//     id: 22,
//     name: "Ray-Ban Aviator Sunglasses",
//     description: "Classic aviator sunglasses with UV protection",
//     price: 154.00,
//     category: "Fashion",
//     image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Gold", "Silver", "Black"],
//     sizes: ["58mm", "62mm"],
//     rating: 4.7,
//     reviews: 3210
//   },
//   {
//     id: 23,
//     name: "Bose SoundLink Revolve+",
//     description: "Portable 360-degree Bluetooth speaker with rich, immersive sound",
//     price: 299.00,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Triple Black", "Lux Gray"],
//     sizes: ["One Size"],
//     rating: 4.7,
//     reviews: 2134
//   },
//   {
//     id: 24,
//     name: "Nespresso Vertuo Coffee Maker",
//     description: "Versatile coffee machine for espresso and coffee drinks",
//     price: 199.95,
//     category: "Home & Kitchen",
//     image: "/prod3.webp",
//     colors: ["Black", "Silver"],
//     sizes: ["One Size"],
//     rating: 4.6,
//     reviews: 1987
//   },
//   {
//     id: 25,
//     name: "Theragun Elite",
//     description: "Professional-grade percussive therapy device for muscle recovery",
//     price: 399.00,
//     category: "Health & Fitness",
//     image: "/prod6.jpeg",
//     colors: ["Black", "White"],
//     sizes: ["One Size"],
//     rating: 4.8,
//     reviews: 1543
//   },
//   {
//     id: 26,
//     name: "Dyson V11 Absolute",
//     description: "Powerful cordless vacuum cleaner with intelligent suction",
//     price: 599.99,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Blue", "Gold"],
//     sizes: ["One Size"],
//     rating: 4.7,
//     reviews: 2876
//   },
//   {
//     id: 27,
//     name: "GoPro HERO9 Black",
//     description: "Waterproof action camera with 5K video and 20MP photos",
//     price: 399.99,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black"],
//     sizes: ["One Size"],
//     rating: 4.7,
//     reviews: 1876
//   },
//   {
//     id: 28,
//     name: "Allbirds Wool Runners",
//     description: "Comfortable and sustainable wool sneakers",
//     price: 95.00,
//     category: "Fashion",
//     image: "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Natural Gray", "Natural Black", "Natural White"],
//     sizes: ["7", "8", "9", "10", "11", "12"],
//     rating: 4.8,
//     reviews: 3210
//   },
//   {
//     id: 29,
//     name: "Breville Barista Express",
//     description: "Semi-automatic espresso machine for cafe-quality coffee at home",
//     price: 699.95,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1612887726773-e64e20cf08fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Stainless Steel"],
//     sizes: ["One Size"],
//     rating: 4.7,
//     reviews: 2134
//   },
//   {
//     id: 30,
//     name: "Sonos One (Gen 2)",
//     description: "Smart speaker with rich sound and voice control",
//     price: 199.00,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "White"],
//     sizes: ["One Size"],
//     rating: 4.8,
//     reviews: 1987
//   },
//   {
//     id: 31,
//     name: "Hydro Flask Water Bottle",
//     description: "Insulated stainless steel water bottle that keeps drinks cold for hours",
//     price: 39.95,
//     category: "Sports & Outdoors",
//     image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "White", "Cobalt", "Pacific"],
//     sizes: ["18 oz", "32 oz", "40 oz"],
//     rating: 4.8,
//     reviews: 4321
//   },
//   {
//     id: 32,
//     name: "Oculus Quest 2",
//     description: "All-in-one virtual reality headset for immersive gaming and experiences",
//     price: 299.00,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["White"],
//     sizes: ["64GB", "256GB"],
//     rating: 4.8,
//     reviews: 2765
//   },
//   {
//     id: 33,
//     name: "Patagonia Black Hole Duffel",
//     description: "Durable and water-resistant duffel bag for travel and outdoor adventures",
//     price: 139.00,
//     category: "Sports & Outdoors",
//     image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "Blue", "Red"],
//     sizes: ["40L", "55L", "70L"],
//     rating: 4.9,
//     reviews: 1876
//   },
//   {
//     id: 34,
//     name: "Ember Temperature Control Smart Mug",
//     description: "Ceramic mug that keeps your beverage at the perfect temperature",
//     price: 99.95,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "White"],
//     sizes: ["10 oz", "14 oz"],
//     rating: 4.6,
//     reviews: 1543
//   },
//   {
//     id: 35,
//     name: "Lululemon Align Leggings",
//     description: "Soft and comfortable high-rise leggings for yoga and everyday wear",
//     price: 98.00,
//     category: "Fashion",
//     image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "Navy", "Gray", "Pink"],
//     sizes: ["0", "2", "4", "6", "8", "10", "12"],
//     rating: 4.8,
//     reviews: 5432
//   },
//   {
//     id: 36,
//     name: "Bose QuietComfort 35 II",
//     description: "Wireless noise-cancelling headphones with exceptional sound quality",
//     price: 299.00,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "Silver"],
//     sizes: ["One Size"],
//     rating: 4.7,
//     reviews: 3210
//   },
//   {
//     id: 37,
//     name: "Weber Original Kettle Premium Charcoal Grill",
//     description: "Classic charcoal grill for authentic barbecue flavor",
//     price: 175.00,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black"],
//     sizes: ["22-inch"],
//     rating: 4.8,
//     reviews: 2876
//   },
//   {
//     id: 38,
//     name: "Osprey Farpoint 40 Travel Backpack",
//     description: "Versatile carry-on backpack for travel and outdoor adventures",
//     price: 160.00,
//     category: "Sports & Outdoors",
//     image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "Green", "Blue"],
//     sizes: ["S/M", "M/L"],
//     rating: 4.7,
//     reviews: 1987
//   },
//   {
//     id: 39,
//     name: "Philips Sonicare DiamondClean Smart 9500",
//     description: "Advanced electric toothbrush with multiple brushing modes",
//     price: 269.99,
//     category: "Health & Beauty",
//     image: "/prod4.jpg",
//     colors: ["White", "Black"],
//     sizes: ["One Size"],
//     rating: 4.7,
//     reviews: 1543
//   },
//   {
//     id: 40,
//     name: "Instant Pot Duo Evo Plus",
//     description: "10-in-1 electric pressure cooker with advanced features",
//     price: 119.99,
//     category: "Home & Kitchen",
//     image: "/prod5.jpeg",
//     colors: ["Stainless Steel"],
//     sizes: ["6 Quart", "8 Quart"],
//     rating: 4.7,
//     reviews: 3210
//   },
//   {
//     id: 41,
//     name: "Fitbit Charge 4",
//     description: "Advanced fitness tracker with built-in GPS and heart rate monitor",
//     price: 149.95,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "Rosewood", "Storm Blue"],
//     sizes: ["One Size"],
//     rating: 4.5,
//     reviews: 2134
//   },
//   {
//     id: 42,
//     name: "Vitamix 5200 Blender",
//     description: "Professional-grade blender for smoothies, soups, and more",
//     price: 449.95,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1570275239925-4af0aa93a0dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "White", "Red"],
//     sizes: ["64 oz"],
//     rating: 4.8,
//     reviews: 4321
//   },
//   {
//     id: 43,
//     name: "Bose Frames Tenor",
//     description: "Audio sunglasses with premium sound and style",
//     price: 249.00,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black"],
//     sizes: ["One Size"],
//     rating: 4.4,
//     reviews: 876
//   },
//   {
//     id: 44,
//     name: "Theragun Mini",
//     description: "Compact percussive therapy device for on-the-go muscle treatment",
//     price: 199.00,
//     category: "Health & Fitness",
//     image: "/prod7.jpeg",
//     colors: ["Black", "White", "Red"],
//     sizes: ["One Size"],
//     rating: 4.6,
//     reviews: 1432
//   },
//   {
//     id: 45,
//     name: "Kindle Oasis",
//     description: "Premium e-reader with adjustable warm light and waterproof design",
//     price: 249.99,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1592496001020-d31bd830651f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Graphite", "Champagne Gold"],
//     sizes: ["8GB", "32GB"],
//     rating: 4.6,
//     reviews: 2987
//   },
//   {
//     id: 46,
//     name: "Dyson Airwrap Styler",
//     description: "Versatile hair styling tool for multiple hair types and styles",
//     price: 549.99,
//     category: "Beauty",
//     image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Nickel/Fuchsia"],
//     sizes: ["One Size"],
//     rating: 4.5,
//     reviews: 1876
//   },
//   {
//     id: 47,
//     name: "Garmin Fenix 6 Pro",
//     description: "Advanced multisport GPS watch with maps, music, and more",
//     price: 649.99,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black", "Silver"],
//     sizes: ["42mm", "47mm", "51mm"],
//     rating: 4.7,
//     reviews: 2134
//   },
//   {
//     id: 48,
//     name: "Yeti Tundra 45 Cooler",
//     description: "Durable, high-performance cooler for outdoor adventures",
//     price: 299.99,
//     category: "Sports & Outdoors",
//     image: "https://images.unsplash.com/photo-1628689469838-524a4a973b8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["White", "Tan", "Blue"],
//     sizes: ["45 Quart"],
//     rating: 4.8,
//     reviews: 3210
//   },
//   {
//     id: 49,
//     name: "Breville Bambino Plus Espresso Machine",
//     description: "Compact espresso machine with automatic milk texturing",
//     price: 499.95,
//     category: "Home & Kitchen",
//     image: "https://images.unsplash.com/photo-1612887726773-e64e20cf08fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Stainless Steel", "Black Truffle"],
//     sizes: ["One Size"],
//     rating: 4.6,
//     reviews: 1543
//   },
//   {
//     id: 50,
//     name: "Samsung Frame TV 55\"",
//     description: "4K QLED TV that doubles as a piece of art when not in use",
//     price: 1499.99,
//     category: "Electronics",
//     image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
//     colors: ["Black"],
//     sizes: ["55\"", "65\"", "75\""],
//     rating: 4.7,
//     reviews: 2876
//   },
//   {
//     id: 51,
//     name: "Breed Dry Dog Food",
//     description: "Premium dry food for dogs of all breeds.",
//     price: 100.00,
//     category: "Pet Supplies",
//     image: "/p1.png",
//     colors: ["Brown"],
//     sizes: ["Small", "Medium", "Large"],
//     rating: 5.0,
//     reviews: 35
//   },
//   {
//     id: 52,
//     name: "CANON EOS DSLR Camera",
//     description: "Professional-grade DSLR camera for stunning photography.",
//     price: 360.00,
//     category: "Electronics",
//     image: "/p2.png",
//     colors: ["Black", "Silver"],
//     sizes: ["Standard"],
//     rating: 4.0,
//     reviews: 95
//   },
//   {
//     id: 53,
//     name: "ASUS FHD Gaming Laptop",
//     description: "High-performance gaming laptop with FHD display.",
//     price: 700.00,
//     category: "Computers & Accessories",
//     image: "/p3.png",
//     colors: ["Black"],
//     sizes: ["15-inch", "17-inch"],
//     rating: 5.0,
//     reviews: 325
//   },
//   {
//     id: 54,
//     name: "Curology Product Set",
//     description: "Personalized skincare products for all skin types.",
//     price: 500.00,
//     category: "Beauty",
//     image: "/p4.png",
//     colors: ["White", "Blue"],
//     sizes: ["One Size"],
//     rating: 4.0,
//     reviews: 145
//   },
//   {
//     id: 55,
//     name: "Kids Electric Car",
//     description: "Ride-on electric car for kids with realistic features.",
//     price: 960.00,
//     category: "Toys & Games",
//     image: "/p5.png",
//     colors: ["Red", "Blue", "White"],
//     sizes: ["One Size"],
//     rating: 5.0,
//     reviews: 65
//   },
//   {
//     id: 56,
//     name: "Jr. Zoom Soccer Cleats",
//     description: "High-quality soccer cleats for juniors.",
//     price: 1160.00,
//     category: "Sports",
//     image: "/p6.png",
//     colors: ["Black", "Green"],
//     sizes: ["4", "5", "6", "7"],
//     rating: 5.0,
//     reviews: 35
//   },
//   {
//     id: 57,
//     name: "GP11 Shooter USB Gamepad",
//     description: "Ergonomic gamepad for an enhanced gaming experience.",
//     price: 660.00,
//     category: "Gaming Accessories",
//     image: "/p7.png",
//     colors: ["Black", "Blue"],
//     sizes: ["Standard"],
//     rating: 4.0,
//     reviews: 55
//   },
//   {
//     id: 58,
//     name: "Quilted Satin Jacket",
//     description: "Stylish quilted satin jacket for winter.",
//     price: 660.00,
//     category: "Fashion",
//     image: "/p8.png",
//     colors: ["Black", "Navy", "White"],
//     sizes: ["S", "M", "L", "XL"],
//     rating: 4.0,
//     reviews: 55
//   },
//   {
//     id: 59,
//     name: "Cooler Master CPU Cooler",
//     description: "Efficient and quiet CPU cooler for high-performance setups.",
//     price: 80.00,
//     originalPrice: 100.00,
//     category: "Computer Hardware",
//     image: "/flash9.webp",
//     colors: ["Black", "Silver"],
//     sizes: ["Standard"],
//     rating: 4.0,
//     reviews: 45
//   },
//   {
//     id: 60,
//     name: "SteelSeries QcK Gaming Mousepad",
//     description: "High-quality mousepad optimized for precision and speed.",
//     price: 20.00,
//     originalPrice: 25.00,
//     category: "Gaming Accessories",
//     image: "/flash10.jpeg",
//     colors: ["Black"],
//     sizes: ["Medium", "Large", "XL"],
//     rating: 5.0,
//     reviews: 300
//   }
// ]

// export async function GET() {
//   try {
//     return NextResponse.json(
//       { products },
//       {
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//           'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//         },
//       }
//     )
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 }
//     )
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const { name, description, price, category, image, colors, sizes, rating, reviews } = body

//     const result = await client.create({
//       _type: 'product',
//       name,
//       slug: {
//         _type: 'slug',
//         current: name.toLowerCase().replace(/ /g, '-'),
//       },
//       description,
//       price,
//       category,
//       image: {
//         _type: 'image',
//         asset: {
//           _type: 'reference',
//           _ref: image,
//         },
//       },
//       colors,
//       sizes,
//       rating,
//       reviews,
//     })

//     return NextResponse.json(result)
//   } catch (error) {
//     console.error('Error creating product:', error)
//     return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
//   }
// }

// export async function PUT(req: Request) {
//   try {
//     const body = await req.json()
//     const { id, name, description, price, category, image, colors, sizes, rating, reviews } = body

//     const result = await client
//       .patch(id)
//       .set({
//         name,
//         description,
//         price,
//         category,
//         image: {
//           _type: 'image',
//           asset: {
//             _type: 'reference',
//             _ref: image,
//           },
//         },
//         colors,
//         sizes,
//         rating,
//         reviews,
//       })
//       .commit()

//     return NextResponse.json(result)
//   } catch (error) {
//     console.error('Error updating product:', error)
//     return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
//   }
// }

// export async function OPTIONS() {
//   return NextResponse.json(
//     {},
//     {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       },
//     }
//   )
// }

