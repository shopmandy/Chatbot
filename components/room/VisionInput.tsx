import React from 'react'
import type { VisionInputProps } from '../../types'

export const VisionInput: React.FC<VisionInputProps> = ({
  vision,
  onVisionChange,
  onGenerate,
  loading,
  visionFocus,
  onVisionFocus,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loading && vision.trim()) {
      onGenerate()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={vision}
          onChange={e => onVisionChange(e.target.value)}
          onFocus={() => onVisionFocus(true)}
          onBlur={() => onVisionFocus(false)}
          disabled={loading}
          placeholder="Describe your dream room transformation..."
          className={`
            w-full p-4 border-2 rounded-lg resize-none transition-all duration-200
            ${visionFocus ? 'border-pink-400 ring-2 ring-pink-100' : 'border-gray-300'}
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100
          `}
          rows={4}
        />

        {/* Character count */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {vision.length}/500
        </div>
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={loading || !vision.trim()}
        className={`
          w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200
          ${
            loading || !vision.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
          }
        `}
      >
        {loading ? 'Generating...' : 'Transform My Room ✨'}
      </button>
    </form>
  )
}
