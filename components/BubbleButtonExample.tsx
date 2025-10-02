import React from 'react'
import { BubbleButton } from './BubbleButton'
import { BubbleButtonTailwind } from './BubbleButtonTailwind'

export function BubbleButtonExample() {
  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Bubble Button Component Examples
        </h1>
        
        <div className="space-y-6">
          {/* CSS Module Version */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">CSS Module Version</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <BubbleButton onClick={() => alert('CSS Module button clicked!')}>
                DESIGN MY ROOM
              </BubbleButton>
              
              <BubbleButton 
                type="submit" 
                onClick={() => alert('Submit clicked!')}
                aria-label="Submit form"
              >
                SUBMIT
              </BubbleButton>
              
              <BubbleButton 
                disabled 
                aria-label="Disabled button"
              >
                DISABLED
              </BubbleButton>
            </div>
          </div>
          
          {/* Tailwind Version */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Tailwind Version</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <BubbleButtonTailwind onClick={() => alert('Tailwind button clicked!')}>
                DESIGN MY ROOM
              </BubbleButtonTailwind>
              
              <BubbleButtonTailwind 
                type="submit" 
                onClick={() => alert('Submit clicked!')}
                aria-label="Submit form"
              >
                SUBMIT
              </BubbleButtonTailwind>
              
              <BubbleButtonTailwind 
                disabled 
                aria-label="Disabled button"
              >
                DISABLED
              </BubbleButtonTailwind>
            </div>
          </div>
          
          {/* Usage Instructions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage Instructions</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p><strong>CSS Module:</strong> Import and use <code className="bg-gray-100 px-2 py-1 rounded">BubbleButton</code></p>
              <p><strong>Tailwind:</strong> Import and use <code className="bg-gray-100 px-2 py-1 rounded">BubbleButtonTailwind</code></p>
              <p><strong>Props:</strong> children, onClick, type, disabled, className, aria-label</p>
              <p><strong>Accessibility:</strong> Full keyboard navigation, focus rings, ARIA support</p>
              <p><strong>Responsive:</strong> 64px desktop, 56px mobile, auto-scaling text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
