import React from 'react'

interface LoadingStateProps {
  progress: number
  message: string
  messageOpacity: number
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  progress,
  message,
  messageOpacity,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center space-y-6">
        {/* Loading Animation */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-pink-200"></div>
            <div
              className="absolute inset-0 rounded-full border-4 border-pink-500 border-t-transparent animate-spin"
              style={{ animationDuration: '1s' }}
            ></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-500">
            {Math.round(progress)}% complete
          </div>
        </div>

        {/* Loading Message */}
        <div
          className="text-lg font-medium text-gray-800 transition-opacity duration-300"
          style={{ opacity: messageOpacity }}
        >
          {message}
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1s',
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
