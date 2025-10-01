import React, { useCallback } from 'react'
import type { ImageUploaderProps } from '../../types'
import { UI_CONFIG, ERROR_MESSAGES } from '../../constants'

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  beforePreview,
  onImageChange,
  onPreviewChange,
  loading,
}) => {
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      // Validate file type
      const acceptedTypes = UI_CONFIG.ACCEPTED_IMAGE_TYPES as readonly string[]
      if (!acceptedTypes.includes(file.type)) {
        alert(ERROR_MESSAGES.INVALID_FILE_TYPE)
        return
      }

      // Validate file size
      if (file.size > UI_CONFIG.MAX_FILE_SIZE) {
        alert(ERROR_MESSAGES.FILE_TOO_LARGE)
        return
      }

      onImageChange(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = e => {
        const result = e.target?.result as string
        onPreviewChange(result)
      }
      reader.readAsDataURL(file)
    },
    [onImageChange, onPreviewChange]
  )

  return (
    <div className="relative">
      {/* File Input */}
      <input
        type="file"
        accept={UI_CONFIG.ACCEPTED_IMAGE_TYPES.join(',')}
        onChange={handleFileChange}
        disabled={loading}
        className="hidden"
        id="image-upload"
      />

      {/* Upload Button/Preview */}
      <label
        htmlFor="image-upload"
        className={`
          block w-full h-64 border-2 border-dashed rounded-lg cursor-pointer
          transition-all duration-200
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:border-pink-400'}
          ${beforePreview ? 'border-pink-400 bg-pink-50' : 'border-gray-300 bg-gray-50'}
        `}
      >
        {beforePreview ? (
          <div className="relative w-full h-full">
            <img
              src={beforePreview}
              alt="Room before transformation"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
              <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
                Click to change image
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg
              className="w-12 h-12 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-lg font-medium">Upload your room image</p>
            <p className="text-sm">PNG, JPG, or WebP up to 10MB</p>
          </div>
        )}
      </label>
    </div>
  )
}
