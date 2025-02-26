import Image from 'next/image'
import StarRating from './StarRating'
import { Button } from '@/app/components/ui/button'

interface ReviewCardProps {
  id: string;
  name: string;
  profession: string;
  rating: number;
  image: string;
}

export default function ReviewCard({ name, profession, rating, image }: ReviewCardProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden m-2">
      <Image src={image} alt={name} width={400} height={200} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 mt-1">{profession}</p>
        <div className="mt-2 flex items-center">
          <StarRating rating={rating} />
          <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
        </div>
        <Button className="w-full mt-4" variant="outline">
          Make a Review
        </Button>
      </div>
    </div>
  )
}

