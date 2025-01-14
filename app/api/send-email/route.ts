import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  interface OrderItem {
    id: string;
    name: string;
    price: number;
    image: string;
    weight: number;
    color: string;
    size: string;
    quantity: number;
  }
  
  interface OrderDetails {
    orderId: string;
    trackingNumber: string;
    customerDetails: {
      name: string;
      email: string;
      phone: string;
      address: {
        street: string;
        apartment: string;
        city: string;
        state: string;
        zipCode: string;
      };
    };
    items: OrderItem[];
    total: number;
    paymentMethod: string;
    orderDate: string;
  }
  
  try {
    const body = await req.json();
    const { orderDetails, userEmail } = body;

    if (!orderDetails || !userEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing order details or user email' },
        { status: 400 }
      );
    }

    const { SMTP_HOST, SMTP_PORT, EMAIL_USER, EMAIL_PASS, SHOP_OWNER_EMAIL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !EMAIL_USER || !EMAIL_PASS || !SHOP_OWNER_EMAIL) {
      return NextResponse.json(
        { success: false, error: 'Email configuration is missing on the server' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: parseInt(SMTP_PORT, 10) === 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const items: OrderItem[] = orderDetails.items;  // Ensure TypeScript understands the items are of type OrderItem[]

    const emailStyle = `
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          background-color: #f4f4f4;
          padding: 20px;
        }
        h1 {
          font-size: 24px;
          color: #222;
        }
        p {
          margin: 0.5em 0;
        }
        .order-details {
          margin: 20px 0;
          padding: 15px;
          background-color: #fff;
          border: 1px solid #ddd;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #aaa;
          margin-top: 20px;
        }
      </style>
    `;

    // const userEmailContent = {
    //   from: `"Exclusive Shop" <${EMAIL_USER}>`,
    //   to: userEmail,
    //   subject: 'Thank you for your order!',
    //   html: `
    //     ${emailStyle}
    //     <body>
    //       <h1>Thank you for your order!</h1>
    //       <p>Hi,</p>
    //       <p>We’ve received your order and will start processing it soon.</p>
    //       <div class="order-details">
    //         <strong>Order Details:</strong>
    //         <pre>${JSON.stringify(orderDetails, null, 2)}</pre>
    //       </div>
    //       <p>Thank you for choosing us!</p>
    //       <div class="footer">© 2025 Your Shop. All rights reserved.</div>
    //     </body>
    //   `,
    // };
    // Email to the user
const userEmailContent = {
  from: `"Your Shop" <${EMAIL_USER}>`,
  to: userEmail,
  subject: 'Thank you for your order!',
  html: `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
      <h1 style="color: #333; text-align: center;">Thank you for your order, Mujeeb!</h1>
      
      <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <p style="color: #555; font-size: 16px;">Hi Mujeeb,</p>
        <p style="color: #555; font-size: 16px;">We’ve received your order and will start processing it soon.</p>
        
        <h2 style="color: #333;">Order Details:</h2>
        
        <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #eee;">Order ID:</th>
            <td style="padding: 8px; background-color: #fff;">${orderDetails.orderId}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #eee;">Tracking Number:</th>
            <td style="padding: 8px; background-color: #fff;">${orderDetails.trackingNumber}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #eee;">Shipping Cost:</th>
            <td style="padding: 8px; background-color: #fff;">$${orderDetails.shippingCost.toFixed(2)}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #eee;">Total:</th>
            <td style="padding: 8px; background-color: #fff;">$${orderDetails.total.toFixed(2)}</td>
          </tr>
        </table>
        
        <h2 style="color: #333;">Billing Address:</h2>
        <p style="color: #555; font-size: 16px;">
          ${orderDetails.customerDetails.name}<br />
          ${orderDetails.customerDetails.phone}<br />
          ${orderDetails.customerDetails.address.street}, ${orderDetails.customerDetails.address.apartment},<br />
          ${orderDetails.customerDetails.address.city}, ${orderDetails.customerDetails.address.state}, ${orderDetails.customerDetails.address.zipCode}
        </p>

        <h2 style="color: #333;">Items Ordered:</h2>
        ${orderDetails.items.map((item: OrderItem) => `
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
            <div style="flex-grow: 1; padding: 8px; background-color: #fff; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 4px;">
              <span style="font-size: 16px; font-weight: bold; color: #333;">${item.name}</span><br />
              <span style="font-size: 14px; color: #777;">Quantity: ${item.quantity}</span><br />
              <span style="font-size: 14px; color: #777;">Size: ${item.size}</span>
            </div>
            <div style="padding: 8px; background-color: #fff; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <span style="font-size: 16px; font-weight: bold; color: #333;">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        `).join('')}
        
        <p style="color: #555; font-size: 16px; font-weight: bold; text-align: center;">
          Thank you for choosing us! If you have any questions, feel free to contact us.
        </p>
      </div>
    </div>
  `
};
console.log(emailStyle)


    // const shopOwnerEmailContent = {
    //   from: `"Exclusive Shop" <${EMAIL_USER}>`,
    //   to: SHOP_OWNER_EMAIL,
    //   subject: 'New Order Received',
    //   html: `
    //     ${emailStyle}
    //     <body>
    //       <h1>New Order Received</h1>
    //       <p>Hi Shop Owner,</p>
    //       <div class="order-details">
    //         <strong>Order Details:</strong>
    //         <pre>${JSON.stringify(orderDetails, null, 2)}</pre>
    //       </div>
    //       <p>Please prepare the order for shipment.</p>
    //       <div class="footer">© 2025 Your Shop. All rights reserved.</div>
    //     </body>
    //   `,
    // };

    // Email to shop owner
const shopOwnerEmailContent = {
  from: `"Your Shop" <${EMAIL_USER}>`,
  to: SHOP_OWNER_EMAIL,
  subject: 'New Order Received',
  html: `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
      <h1 style="color: #333; text-align: center;">New Order Received</h1>
      
      <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">Order ID: ${orderDetails.orderId}</h2>
        
        <h2 style="color: #333;">Order Details:</h2>
        
        <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #eee;">Tracking Number:</th>
            <td style="padding: 8px; background-color: #fff;">${orderDetails.trackingNumber}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #eee;">Shipping Cost:</th>
            <td style="padding: 8px; background-color: #fff;">$${orderDetails.shippingCost.toFixed(2)}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 8px; background-color: #eee;">Total:</th>
            <td style="padding: 8px; background-color: #fff;">$${orderDetails.total.toFixed(2)}</td>
          </tr>
        </table>
        
        <h2 style="color: #333;">Billing Address:</h2>
        <p style="color: #555; font-size: 16px;">
          ${orderDetails.customerDetails.name}<br />
          ${orderDetails.customerDetails.phone}<br />
          ${orderDetails.customerDetails.address.street}, ${orderDetails.customerDetails.address.apartment},<br />
          ${orderDetails.customerDetails.address.city}, ${orderDetails.customerDetails.address.state}, ${orderDetails.customerDetails.address.zipCode}
        </p>

        <h2 style="color: #333;">Items Ordered:</h2>
        ${orderDetails.items.map((item: OrderItem) => `
          <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
            <div style="flex-grow: 1; padding: 8px; background-color: #fff; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 4px;">
              <span style="font-size: 16px; font-weight: bold; color: #333;">${item.name}</span><br />
              <span style="font-size: 14px; color: #777;">Quantity: ${item.quantity}</span><br />
              <span style="font-size: 14px; color: #777;">Size: ${item.size}</span>
              <span style="font-size: 14px; color: #777;">Color: ${item.color}</span>
            </div>
            <div style="padding: 8px; background-color: #fff; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <span style="font-size: 16px; font-weight: bold; color: #333;">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
};
    // Send both emails sequentially for better error handling
    await transporter.sendMail(userEmailContent);
    await transporter.sendMail(shopOwnerEmailContent);

    return NextResponse.json({ success: true, message: 'Emails sent successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending emails:', error.message);
    return NextResponse.json(
      { success: false, error: 'Failed to send emails', details: error.message },
      { status: 500 }
    );
  }
}
