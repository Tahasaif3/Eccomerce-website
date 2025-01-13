import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import {Inter} from "next/font/google"
import { CartProvider } from '../context/cartContext'
import { AuthProvider } from '../context/authContext'
import { WishlistProvider } from '../context/wishlist-context'

import { ErrorBoundary } from '../components/error-boundary'
import { Toaster } from 'sonner'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight:["700"],
 });

 const inter = Inter({ 
  subsets: ['latin'],
  weight:["700"],
 })
 

export const metadata: Metadata = {
  title: 'Exclusive E-commerce Figma Assignment',
  description: 'Your one-stop shop for all things tech',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${inter.className} antialiased`}
      >
        <ErrorBoundary>
        <AuthProvider>
        <CartProvider>
        <WishlistProvider>
        {children}
        <Toaster/>
        </WishlistProvider>
        </CartProvider>
        </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
