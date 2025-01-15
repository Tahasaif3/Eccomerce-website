# Exclusive E-Commerce Website

This is an exclusive e-commerce website built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Sanity.io**. The site is designed with modern functionalities like a shopping cart, checkout, shipment tracking, user authentication, product management, and order notification.

### Project Features:

1. **User Authentication and Account Management**:
   - Register, Login, and Logout functionality.
   - Manage user account details with a User Dashboard.
   - View Order History, Reviews, and Cancellations through an organized account management page.

2. **E-Commerce Functionality**:
   - **Add to Cart**: Users can add products to their cart with quantity updates.
   - **Product Display**: Attractive, responsive product cards display the product name, price, and image.
   - **Checkout**: Secure checkout process where users can complete their purchases.

3. **Shipping and Order Tracking**:
   - **Shipment Tracking**: Users can track the status of their orders using a unique tracking number.
   - **Shipping Labels**: Generate printable shipping labels directly from the website.

4. **Sanity CMS Integration**:
   - Headless content management with Sanity.io for easily managing products.
   - Automatically import product data into Sanity via the `importSanityData.mjs` script.
   - Use the Sanity client to fetch product data dynamically and display it on the website.

5. **Backend API Routes**:
   - **Authentication**: Handle login, signup, and user info retrieval.
   - **Product Management**: API routes for fetching, adding, and updating product data.
   - **Order Confirmation & Email Notification**: After a successful order, emails are automatically sent to the user and admin for notification purposes.

6. **UI and Reusable Components**:
   - Utilizes **Tailwind CSS** for a responsive and modern UI design.
   - Reusable components such as **navbar**, **footer**, **product cards**, **alerts**, and more.
   - Create custom and reusable input elements like buttons, forms, and toast notifications for a smooth UI.

7. **Type Safety with TypeScript**:
   - All components and hooks are written in **TypeScript** to ensure type safety and reduce runtime errors.
   - TypeScript types are defined for **orders**, **products**, and **authentication** to maintain consistency across the codebase.

8. **Error Boundaries**:
   - Application includes **Error Boundaries** that ensure the app does not crash unexpectedly and provides a graceful user experience in case of errors.

---

## Folder Structure

```
tahasaif3-eccomerce-website/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── Cart/
│   ├── Checkout/
│   ├── Contact/
│   ├── Wishlist/
│   ├── account/
│   ├── api/
│   ├── products/
│   ├── track-order/
├── components/
│   ├── Delivery.tsx
│   ├── categories.tsx
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── product-card.tsx
│   ├── shipping-label.tsx
│   ├── ui/
├── context/
│   ├── authContext.tsx
│   ├── cartContext.tsx
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── api-client.ts
│   ├── utils.ts
├── sanity/
│   ├── env.ts
│   ├── schemaTypes/
│   │   ├── product.ts
├── public/
│   ├── mockApi.json
├── types/
│   ├── order.ts
│   ├── product.ts
└── utils/
    └── print-label.ts
```

## Technologies Used:

- **Next.js** - React framework for building the app and server-side rendering.
- **TypeScript** - To provide type safety and reduce potential runtime errors.
- **Tailwind CSS** - For a modern, utility-first CSS framework.
- **Sanity.io** - A headless CMS for product content management.
- **JSON Server** - Mock API used to simulate product and order data.
- **Node.js & Express** (used implicitly in server-side Next.js functionalities).

## How to Run the Project:

1. **Install Dependencies**:

   Install the necessary dependencies by running the following command:

   ```bash
   npm install
   ```

2. **Set Up Environment Variables**:

   Create a `.env.local` file in the root of the project and add the required environment variables. You can also use `.env.example` as a reference.

3. **Start the Development Server**:

   To start the development server locally, run:

   ```bash
   npm run dev
   ```

   Navigate to `http://localhost:3000` to access the site.

## Sanity Integration:

1. Set up **Sanity Studio** for managing product data and content.

2. Run the Sanity CLI and use the `sanity.config.ts` file to initialize the Sanity project.

3. Data management and product updates will be automatically synced to your website, ensuring content management through the **Sanity Studio** interface.

## Testing and Linting:

1. **Linting**:
   We use ESLint for type checking and linting, and the configuration file `.eslintrc.json` is included to maintain code quality and style.

2. **Unit Testing**:
   - Consider adding unit tests to the app using **Jest** or **React Testing Library** for testing important functionalities like product fetching and user authentication.

3. **Prettier**:
   - Prettier is configured to format the codebase consistently.

---

## Additional Features Coming Soon:

- **Payment Integration**: Integrating a payment gateway like **Stripe** or **PayPal** for online payments.

---

## Contribution:

Feel free to fork and contribute to this project. If you would like to submit bug fixes or new features, please open an issue or pull request, and I will review it accordingly.

---

## License:

MIT License. See the LICENSE file for details.

---

### Acknowledgments:

- **Tailwind CSS** for building the responsive, utility-first design system.
- **Sanity.io** for providing a flexible and scalable headless CMS.
- **Next.js** for fast development and optimal user experience.
```
