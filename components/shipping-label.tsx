import { forwardRef } from 'react'
import { Barcode } from 'lucide-react'
import type { OrderDetails } from '../types/order'

interface ShippingLabelProps {
  orderDetails: OrderDetails
}

export const ShippingLabel = forwardRef<HTMLDivElement, ShippingLabelProps>(
  ({ orderDetails }, ref) => {
    return (
      <div 
        ref={ref} 
        className="w-[4in] h-[6in] p-4 border border-black m-4 hidden print:block print:m-0"
      >
        {/* Sender Information */}
        <div className="text-xs mb-4">
          <p className="font-bold">From:</p>
          <p>Shimpnet Store</p>
          <p>123 Commerce Street</p>
          <p>Warehouse District</p>
          <p>New York, NY 10001</p>
        </div>

        {/* Recipient Information */}
        <div className="text-sm mb-4">
          <p className="font-bold">Ship To:</p>
          <p className="font-bold">{orderDetails.customerDetails.name}</p>
          <p>{orderDetails.customerDetails.address.street}</p>
          {orderDetails.customerDetails.address.apartment && (
            <p>{orderDetails.customerDetails.address.apartment}</p>
          )}
          <p>
            {orderDetails.customerDetails.address.city}, {orderDetails.customerDetails.address.state} {orderDetails.customerDetails.address.zipCode}
          </p>
          <p>Phone: {orderDetails.customerDetails.phone}</p>
        </div>

        {/* Tracking Number Barcode */}
        <div className="flex flex-col items-center justify-center mb-4">
          <Barcode className="w-48 h-24" />
          <p className="font-mono text-sm">{orderDetails.trackingNumber}</p>
        </div>

        {/* Order Information */}
        <div className="text-xs">
          <p>Order ID: {orderDetails.orderId}</p>
          <p>Order Date: {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
          <p>Shipping Method: Standard Shipping</p>
        </div>
      </div>
    )
  }
)

ShippingLabel.displayName = 'ShippingLabel'

