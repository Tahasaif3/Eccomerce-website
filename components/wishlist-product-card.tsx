import { Star, ShoppingCart, X } from 'lucide-react';
import Image from "next/image";
import { Button } from "../components/ui/button";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
  showRating?: boolean;
  onRemove?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard({
  name,
  image,
  price,
  originalPrice,
  rating = 0,
  reviews,
  badge,
  showRating = true,
  onRemove,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md p-4">
      {badge && (
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${
            badge === "NEW" ? "bg-green-500 text-white" : "bg-[#E94E4E] text-white"
          }`}
        >
          {badge}
        </span>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <div className="relative aspect-square mb-3">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-sm truncate">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-[#E94E4E] font-semibold">${price}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm">${originalPrice}</span>
          )}
        </div>
        {showRating && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-200 fill-gray-200"
                }`}
              />
            ))}
            {reviews !== undefined && (
              <span className="text-gray-500 text-sm">({reviews})</span>
            )}
          </div>
        )}
        {onAddToCart && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={onAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Move to Cart
          </Button>
        )}
      </div>
    </div>
  );
}

// import { Star } from "lucide-react";
// import Image from "next/image";

// interface ProductCardProps {
//     name: string;
//     image: string;
//     price: number;
//     originalPrice?: number;
//     rating?: number;
//     reviews?: number;
//     badge?: string;
//     showRating?: boolean;
//   }
  
//   export function ProductCard({
//     name,
//     image,
//     price,
//     originalPrice,
//     rating = 0,
//     reviews,
//     badge,
//     showRating = true,
//   }: ProductCardProps) {
//     return (
//       <div className="group relative bg-white rounded-lg shadow-md p-4">
//         {badge && (
//           <span
//             className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${
//               badge === "NEW" ? "bg-green-500 text-white" : "bg-[#E94E4E] text-white"
//             }`}
//           >
//             {badge}
//           </span>
//         )}
//         <div className="relative aspect-square mb-3">
//           <Image
//             src={image}
//             alt={name}
//             fill
//             className="object-cover rounded-lg"
//           />
//         </div>
//         <div className="space-y-2">
//           <h3 className="font-medium text-sm truncate">{name}</h3>
//           <div className="flex items-center gap-2">
//             <span className="text-[#E94E4E] font-semibold">${price}</span>
//             {originalPrice && (
//               <span className="text-gray-500 line-through text-sm">${originalPrice}</span>
//             )}
//           </div>
//           {showRating && ( // Conditionally render the ratings section
//             <div className="flex items-center gap-1">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`h-4 w-4 ${
//                     i < rating
//                       ? "text-yellow-400 fill-yellow-400"
//                       : "text-gray-200 fill-gray-200"
//                   }`}
//                 />
//               ))}
//               {reviews !== undefined && (
//                 <span className="text-gray-500 text-sm">({reviews})</span>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }