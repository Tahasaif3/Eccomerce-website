import type { OrderDetails } from '@/types/order'

export const printLabel = (orderDetails: OrderDetails) => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  // Write the HTML content
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Shipping Label - ${orderDetails.orderId}</title>
        <style>
          @page {
            size: 4in 6in;
            margin: 0;
          }
          body {
            margin: 0;
            font-family: system-ui, -apple-system, sans-serif;
          }
          .label {
            width: 4in;
            height: 6in;
            padding: 0.25in;
            box-sizing: border-box;
          }
          .from, .to, .barcode, .info {
            margin-bottom: 0.25in;
          }
          .barcode {
            text-align: center;
          }
          p {
            margin: 0.1in 0;
          }
        </style>
      </head>
      <body>
        <div class="label">
          <div class="from">
            <p><strong>From:</strong></p>
            <p>Shimpnet Store</p>
            <p>123 Commerce Street</p>
            <p>Warehouse District</p>
            <p>New York, NY 10001</p>
          </div>
          <div class="to">
            <p><strong>Ship To:</strong></p>
            <p><strong>${orderDetails.customerDetails.name}</strong></p>
            <p>${orderDetails.customerDetails.address.street}</p>
            ${orderDetails.customerDetails.address.apartment ? 
              `<p>${orderDetails.customerDetails.address.apartment}</p>` : ''}
            <p>${orderDetails.customerDetails.address.city}, ${orderDetails.customerDetails.address.state} ${orderDetails.customerDetails.address.zipCode}</p>
            <p>Phone: ${orderDetails.customerDetails.phone}</p>
          </div>
          <div class="barcode">
            <svg width="200" height="100">
              <!-- Simple barcode representation -->
              <rect x="10" y="10" width="180" height="80" fill="none" stroke="black" />
              <text x="100" y="70" text-anchor="middle" font-family="monospace">
                ${orderDetails.trackingNumber}
              </text>
            </svg>
          </div>
          <div class="info">
            <p>Order ID: ${orderDetails.orderId}</p>
            <p>Order Date: ${new Date(orderDetails.orderDate).toLocaleDateString()}</p>
            <p>Shipping Method: Standard Shipping</p>
          </div>
        </div>
      </body>
    </html>
  `)

  // Print and close the window
  printWindow.document.close()
  printWindow.print()
  printWindow.close()
}

