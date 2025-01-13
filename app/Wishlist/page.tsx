'use client'

import { Button } from "../../components/ui/button"
import { ProductCard } from "../../components/wishlist-product-card"
import Navbar from "../../components/navbar"
import { Footer } from "../../components/footer"
import { ShoppingCart } from 'lucide-react'
import { useWishlist } from "../../context/wishlist-context"
import { useCart } from "../../context/cartContext"
import { useToast } from "../../hooks/use-toast"

export default function WishlistPage() {
  const { items: wishlistItems, removeItem } = useWishlist()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleMoveAllToBag = () => {
    wishlistItems.forEach(item => {
      addToCart({
// @ts-expect-error: Suppressing error because we are manually adding the 'quantity' field back after using Omit
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      })
      removeItem(item.id)
    })

    toast({
      title: "Items Moved to Cart",
      description: "All wishlist items have been moved to your cart.",
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">
            Wishlist ({wishlistItems.length})
          </h1>
          {wishlistItems.length > 0 && (
            <Button
              variant="outline"
              className="hover:bg-gray-100 text-black w-[223px] h-[56px]"
              onClick={handleMoveAllToBag}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Move All to Bag
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <ProductCard
              key={item.id}
              showRating={false}
              {...item}
              onRemove={() => removeItem(item.id)}
              onAddToCart={() => {
                addToCart({
// @ts-expect-error: Suppressing error because we are manually adding the 'quantity' field back after using Omit
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  quantity: 1
                })
                removeItem(item.id)
                toast({
                  title: "Added to Cart",
                  description: `${item.name} has been moved to your cart.`,
                })
              }}
            />
          ))}
        </div>

        {wishlistItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Your wishlist is empty</p>
          </div>
        )}

        {/* Just For You Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <span className="w-5 h-10 bg-[#E94E4E] rounded-sm" />
              Just For You
            </h2>
            <Button
              variant="outline"
              className="hover:bg-gray-100 text-black w-[223px] h-[56px]"
            >
              See All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              name="ASUS FHD Gaming Laptop"
              image="/f1.png?height=400&width=400"
              price={960}
              originalPrice={1160}
              rating={5}
              reviews={65}
            />
            <ProductCard
              name="IPS LCD Gaming Monitor"
              image="/f2.png?height=400&width=400"
              price={1160}
              rating={5}
              reviews={65}
            />
            <ProductCard
              name="HAVIT HV-G92 Gamepad"
              image="/fy3.png?height=400&width=400"
              price={560}
              rating={5}
              reviews={65}
            />
            <ProductCard
              name="AK-900 Wired Keyboard"
              image="/f4.png?height=400&width=400"
              price={200}
              rating={5}
              reviews={65}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// "use client"

// import { Button } from "@/components/ui/button"
// import { ProductCard } from "@/components/wishlist-product-card"
// import Navbar from "@/components/navbar"
// import { Footer } from "@/components/footer"
// import { ShoppingCart, } from 'lucide-react'

// const wishlistItems = [
//     {
//         id: "1",
//         name: "Gucci Duffle Bag",
//         image: "/w1.png?height=400&width=400",
//         price: 960,
//         originalPrice: 1160,
//     },
//     {
//         id: "2",
//         name: "RGB CPU Cooler",
//         image: "/w2.png?height=400&width=400",
//         price: 160,  
//     },
//     {
//         id: "3",
//         name: "GP11 Gaming Controller",
//         image: "/w3.png?height=400&width=400",
//         price: 550,
//     },
//     {
//         id: "4",
//         name: "Jacket Green",
//         image: "/w4.png?height=400&width=400",
//         price: 750,
//     }
// ]

// export default function WishlistPage() {
//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navbar />
//             <main className="flex-1 container mx-auto px-4 py-8">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-2xl font-semibold">
//                         Wishlist ({wishlistItems.length})
//                     </h1>
//                     <Button
//                         variant={"outline"}
//                         className="hover:bg-gray-100 text-black w-[223px] h-[56px]"
//                     >
//                         <ShoppingCart className="h-4 w-4 mr-2" />
//                         Move All to Bag
//                     </Button>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {wishlistItems.map((item) => (
//                         <ProductCard
//                             key={item.id}
//                             showRating={false}
//                             {...item}
//                         />
//                     ))}
//                 </div>

//                 {wishlistItems.length === 0 && (
//                     <div className="text-center py-12">
//                         <p className="text-gray-500">Your wishlist is empty</p>
//                     </div>
//                 )}

//                 {/* Just For You Section */}
//                 <div className="mt-16">
//                     <div className="flex justify-between items-center mb-8">
//                         <h2 className="text-2xl font-semibold flex items-center gap-2">
//                             <span className="w-5 h-10 bg-[#E94E4E] rounded-sm" />
//                             Just For You
//                         </h2>
//                         <Button
//                             variant={"outline"}
//                             className="hover:bg-gray-100 text-black w-[223px] h-[56px]"
//                         >
//                             See All
//                         </Button>          </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                         <ProductCard
//                             name="ASUS FHD Gaming Laptop"
//                             image="/f1.png?height=400&width=400"
//                             price={960}
//                             originalPrice={1160}
//                             rating={5}
//                             reviews={65}
//                         />
//                         <ProductCard
//                             name="IPS LCD Gaming Monitor"
//                             image="/f2.png?height=400&width=400"
//                             price={1160}
//                             rating={5}
//                             reviews={65}
//                         />
//                         <ProductCard
//                             name="HAVIT HV-G92 Gamepad"
//                             image="/fy3.png?height=400&width=400"
//                             price={560}
//                             rating={5}
//                             reviews={65}
//                         />
//                         <ProductCard
//                             name="AK-900 Wired Keyboard"
//                             image="/f4.png?height=400&width=400"
//                             price={200}
//                             rating={5}
//                             reviews={65}
//                         />
//                     </div>
//                 </div>


//             </main>
//             <Footer />
//         </div>
//     )
// }

