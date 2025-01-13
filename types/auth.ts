export interface User {
    id: string
    name: string
    email: string
    address?: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Order {
    id: string
    userId: string
    status: OrderStatus
    items: OrderItem[]
    total: number
    shippingAddress: Address
    createdAt: string
    updatedAt: string
  }
  
  export interface OrderItem {
    id: string
    productId: string
    name: string
    price: number
    quantity: number
    image: string
  }
  
  export interface Address {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
  export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  
  export interface AuthResponse {
    user: User
    token: string
  }
  
  export interface ApiError {
    message: string
    errors?: Record<string, string[]>
  }
  
  