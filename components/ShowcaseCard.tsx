import Image from 'next/image'

interface ShowcaseCardProps {
  imageUrl: string;
  title: string;
}

export default function ShowcaseCard({ imageUrl, title }: ShowcaseCardProps) {
  return (
    <div className="group relative m-2">
      <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          className="object-cover w-full h-full group-hover:opacity-75 transition-opacity duration-300"
        />
      </div>
      <h3 className="mt-2 text-sm text-center text-gray-700">{title}</h3>
    </div>
  )
}

