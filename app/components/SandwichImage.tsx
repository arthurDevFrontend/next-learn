import Image from 'next/image'
import { Image as ImageImage} from '../context/user/user.interfaces'
import { useEffect } from 'react'

export default function SandwichImage(images: any) {
  const img = images.images;

  return (
    <div className="relative w-20 h-32">
     {img.map((src, index) => (
        <div
          key={index}
          className="absolute w-full h-full transition-all duration-300 ease-in-out hover:translate-y-[-10px]"
          style={{
            top: `${index * 10}px`,
            left: `${index * 10}px`,
            zIndex: images.length - index,
          }}
        >
          <Image
            src={src.image}
            alt={`Stack image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
      ))}
    </div>
  )
}

