import React from 'react'
import Image from 'next/image'
import type { ProductGridProps } from '../../types'

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-pink-500"></div>
          <span className="text-gray-600">Finding matching products...</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg h-64 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🛍️</div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">
          Try generating a room transformation first!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">
          Recommended Products ({products.length})
        </h3>
        <span className="text-sm text-gray-500">
          AI-matched from your room transformation
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              <h4 className="font-medium text-gray-800 line-clamp-2 text-sm leading-tight">
                {product.title}
              </h4>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  {product.price}
                </span>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  View on Amazon
                </a>
              </div>

              {/* Features */}
              {product.features?.DisplayValues &&
                product.features.DisplayValues.length > 0 && (
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="font-medium">Features:</div>
                    <ul className="list-disc list-inside space-y-0.5">
                      {product.features.DisplayValues.slice(0, 3).map(
                        (feature, index) => (
                          <li key={index} className="line-clamp-1">
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
