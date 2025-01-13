'use server'

import { OrderDetails } from '../../types/order'

export async function createShipment(formData: FormData): Promise<{
  success: boolean
  trackingNumber: string
  shippingCost: number
  orderDetails: OrderDetails
}> {
  try {
    // Generate a random tracking number for demonstration
    const trackingNumber = Math.random().toString(36).substring(2, 15)
    const shippingCost = 9.99
    const orderId = Math.random().toString(36).substring(2, 15)

    const orderDetails: OrderDetails = {
      orderId,
      trackingNumber,
      shippingCost,
      customerDetails: {
        name: formData.get('firstName') as string,
        email: formData.get('email') as string,
        phone: formData.get('phoneNumber') as string,
        address: {
          street: formData.get('streetAddress') as string,
          apartment: formData.get('apartment') as string,
          city: formData.get('townCity') as string,
          state: formData.get('state') as string,
          zipCode: formData.get('zipCode') as string,
        }
      },
      items: JSON.parse(formData.get('items') as string),
      total: parseFloat(formData.get('total') as string),
      paymentMethod: formData.get('paymentMethod') as string,
      orderDate: new Date().toISOString()
    }

    // Here you would typically save the order details to your database
    
    return {
      success: true,
      trackingNumber,
      shippingCost,
      orderDetails
    }
  } catch (error) {
    console.error('Shipment creation error:', error)
    throw new Error('Failed to create shipment')
  }
}

