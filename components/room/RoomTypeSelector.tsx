import React from 'react'
import type { RoomTypeSelector as RoomTypeSelectorProps } from '../../types'
import { ROOM_TYPES } from '../../constants'

export const RoomTypeSelector: React.FC<RoomTypeSelectorProps> = ({
  roomType,
  customRoomType,
  showCustomInput,
  onRoomTypeChange,
  onCustomRoomTypeChange,
  onShowCustomInputChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Room Type</h3>

      {/* Room Type Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ROOM_TYPES.map(type => (
          <button
            key={type}
            onClick={() => {
              onRoomTypeChange(type)
              onShowCustomInputChange(false)
            }}
            className={`
              py-3 px-4 rounded-lg border-2 transition-all duration-200 text-sm font-medium
              ${
                roomType === type && !showCustomInput
                  ? 'border-pink-400 bg-pink-50 text-pink-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300 hover:bg-pink-25'
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Custom Room Type */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => {
            onShowCustomInputChange(true)
            onRoomTypeChange('')
          }}
          className={`
            py-3 px-4 rounded-lg border-2 transition-all duration-200 text-sm font-medium text-left
            ${
              showCustomInput
                ? 'border-pink-400 bg-pink-50 text-pink-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
            }
          `}
        >
          Custom Room Type
        </button>

        {showCustomInput && (
          <input
            type="text"
            value={customRoomType}
            onChange={e => onCustomRoomTypeChange(e.target.value)}
            placeholder="Enter custom room type..."
            className="py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
          />
        )}
      </div>
    </div>
  )
}
