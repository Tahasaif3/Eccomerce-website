export interface OrderDetails {
  orderId: string
  trackingNumber: string
  shippingCost: number
  customerDetails: {
    name: string
    email: string
    phone: string
    address: {
      street: string
      apartment?: string
      city: string
      state: string
      zipCode: string
    }
  }
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
  total: number
  paymentMethod: string
  orderDate: string
}

export interface TrackingInfo {
  status: string
  location: string
  timestamp: string
  description: string
}


// export interface OrderDetails {
//     orderId: string
//     trackingNumber: string
//     shippingCost: number
//     customerDetails: {
//       name: string
//       email: string
//       phone: string
//       address: {
//         street: string
//         apartment?: string
//         city: string
//         state: string
//         zipCode: string
//       }
//     }
//     items: {
//       id: string
//       name: string
//       price: number
//       quantity: number
//       image: string
//     }[]
//     total: number
//     paymentMethod: string
//     orderDate: string
//   }
  
//   export interface TrackingInfo {
//     status: string
//     location: string
//     timestamp: string
//     description: string
//   }
  
  