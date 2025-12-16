'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, Info, Star, StarHalf } from 'lucide-react'

interface ProductCardProps {
  id?: string
  title: string
  subtitle?: string
  description: string
  imageUrl: string
  rating: number
  tag?: string
  link: string
  features?: string[]
  buttonText?: string
}

export function ProductCard({
  id,
  title,
  subtitle,
  description,
  imageUrl,
  rating,
  tag,
  link,
  features = [],
  buttonText = 'Detaylar',
}: ProductCardProps) {
  // Generate an array of 5 stars
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) {
      return <Star key={i} size={16} className="fill-primary text-primary" />
    } else if (i === Math.floor(rating) && rating % 1 !== 0) {
      return <StarHalf key={i} size={16} className="fill-primary text-primary" />
    } else {
      return <Star key={i} size={16} className="text-gray-200" />
    }
  })

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-card border border-gray-100 bg-background p-5 shadow-card transition-all duration-default hover:shadow-card-hover">
      {tag && (
        <div className="absolute left-0 top-4 z-10 bg-primary px-3 py-1 text-xs font-medium text-white">
          {tag}
        </div>
      )}
      
      <div className="relative mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-button">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-slow group-hover:scale-105"
        />
      </div>
      
      <div className="mb-2 flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-2 text-sm text-secondary-medium">{rating.toFixed(1)}</span>
      </div>
      
      <h3 className="mb-1 font-heading text-xl font-subheading text-secondary">{title}</h3>
      {subtitle && <p className="mb-2 text-sm font-medium text-secondary-medium">{subtitle}</p>}
      
      <p className="mb-4 text-sm text-secondary-light">{description}</p>
      
      {features.length > 0 && (
        <ul className="mb-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={16} className="mr-2 mt-0.5 shrink-0 text-primary" />
              <span className="text-sm text-secondary-light">{feature}</span>
            </li>
          ))}
        </ul>
      )}
      
      <div className="mt-auto">
        <Link
          href={link}
          className="mt-2 inline-flex items-center justify-center rounded-button bg-primary px-6 py-3 text-sm font-medium text-white transition-colors duration-default hover:bg-primary-dark"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  )
} 