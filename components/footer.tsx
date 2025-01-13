import Image from "next/image"
import Link from "next/link"
import { Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Input } from "../components/ui/input"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Exclusive Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Exclusive</h2>
            <p className="font-medium">Subscribe</p>
            <p className="text-sm">Get 10% off your first order</p>
            <div className="flex items-center border border-white/40 rounded-sm pr-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="border-0 bg-transparent text-white placeholder:text-white/60"
              />
              <Send className="h-4 w-4" />
            </div>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Support</h2>
            <div className="space-y-4 text-sm">
              <p>111 Bijoy sarani, Dhaka, <br/>
               DH 1515, Bangladesh.</p>
              <p>exclusive@gmail.com</p>         
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Account</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/account" className="hover:underline">My Account</Link></li>
              <li><Link href="/login" className="hover:underline">Login / Register</Link></li>
              <li><Link href="/cart" className="hover:underline">Cart</Link></li>
              <li><Link href="/wishlist" className="hover:underline">Wishlist</Link></li>
              <li><Link href="/shop" className="hover:underline">Shop</Link></li>
            </ul>
          </div>

          {/* Quick Link Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Quick Link</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms Of Use</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* Download App Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Download App</h2>
            <p className="text-xs text-neutral-400">Save $3 with App New User Only</p>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Image 
                  src="/qr.png" 
                  alt="QR Code"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Image 
                  src="/apple.png" 
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                  className="rounded-lg"
                />
                <Image 
                  src="/google.png" 
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="rounded-lg"
                />
              </div>
            </div>
             {/* Social Media Links */}
        <div className="flex items-center gap-6 mt-16">
          <Link href="#" className="hover:text-neutral-400">
            <Facebook className="h-6 w-6  space-y-5" />
          </Link>
          <Link href="#" className="hover:text-neutral-400">
            <Twitter className="h-6 w-6 space-y-5" />
          </Link>
          <Link href="#" className="hover:text-neutral-400">
            <Instagram className="h-6 w-6 space-y-5" />
          </Link>
          <Link href="#" className="hover:text-neutral-400">
            <Linkedin className="h-6 w-6 space-y-5" />
          </Link>
        </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <p className="text-center text-sm text-neutral-400">
            © Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

