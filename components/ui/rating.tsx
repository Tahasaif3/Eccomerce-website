import { Star, StarHalf } from 'lucide-react'

interface RatingProps {
  rating: number
  reviews?: number
  showCount?: boolean
}

export function Rating({ rating, reviews, showCount = true }: RatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-gray-200" />
        ))}
      </div>
      {showCount && reviews && (
        <span className="text-sm text-gray-500">({reviews})</span>
      )}
    </div>
  )
}
