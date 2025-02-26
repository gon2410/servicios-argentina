import StarRating from './StarRating'

interface ReviewCommentProps {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewComment({ author, rating, comment, date }: ReviewCommentProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4 m-2">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="font-semibold">{author}</h4>
          <StarRating rating={rating} />
        </div>
        <span className="text-gray-500 text-sm">{date}</span>
      </div>
      <p className="text-gray-700">{comment}</p>
    </div>
  )
}

