import Image from "next/image";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
}

export function ProductCard({
  name,
  image,
  price,
  originalPrice,
  rating,
  reviews,
}: ProductCardProps) {
  
  return (
    <div className="group relative border rounded-lg overflow-hidden">
    <div className="relative aspect-square">
  <Image
    src={image}
    alt={name}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
  />
</div>


      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-medium text-lg">{name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-red-500 font-bold">${price.toFixed(2)}</span>
          <span className="text-gray-500 line-through text-sm">
            ${originalPrice.toFixed(2)}
          </span>
        </div>
        <div className="mt-1 flex items-center">
          {/* Star Ratings */}
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-sm text-gray-500 ml-2">({reviews})</span>
        </div>
      </div>
    </div>
  );
}
