import React, { useState } from 'react'
import styles from './PriceRangeSlider.module.css'

interface PriceRange {
  min: number
  max: number
}

interface PriceRangeSliderProps {
  value: PriceRange
  onChange: (value: PriceRange) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  value,
  onChange,
  min = 1,
  max = 1000,
  step = 10,
  disabled = false,
}) => {
  const [activeSlider, setActiveSlider] = useState<'min' | 'max' | null>(null)

  const handlePriceChange = (type: 'min' | 'max', newValue: number) => {
    let newRange = { ...value }

    if (type === 'min') {
      newRange.min = Math.min(newValue, value.max - step) // Ensure min is at least step less than max
      newRange.min = Math.max(newRange.min, min) // Ensure min is at least the minimum allowed
    } else {
      newRange.max = Math.max(newValue, value.min + step) // Ensure max is at least step more than min
      newRange.max = Math.min(newRange.max, max) // Ensure max doesn't exceed maximum allowed
    }

    onChange(newRange)
  }

  const handleInputChange = (type: 'min' | 'max', inputValue: string) => {
    const numValue = parseInt(inputValue) || (type === 'min' ? min : max)
    handlePriceChange(type, numValue)
  }

  return (
    <div className={styles.container}>
      {/* Price Input Fields */}
      <div className={styles.priceInputs}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Min Price</label>
          <input
            type="number"
            min={min}
            max={max - step}
            value={value.min}
            onChange={e => handleInputChange('min', e.target.value)}
            className={styles.priceInput}
            placeholder={`$${min}`}
            disabled={disabled}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Max Price</label>
          <input
            type="number"
            min={min + step}
            max={max}
            value={value.max}
            onChange={e => handleInputChange('max', e.target.value)}
            className={styles.priceInput}
            placeholder={`$${max}`}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Dual Range Slider */}
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack}></div>
        <div
          className={styles.sliderRange}
          style={{
            left: `${((value.min - min) / (max - min)) * 100}%`,
            width: `${((value.max - value.min) / (max - min)) * 100}%`,
          }}
        ></div>
        <div className={styles.sliderWrapper}>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value.min}
            onChange={e => handlePriceChange('min', parseInt(e.target.value))}
            onMouseDown={() => setActiveSlider('min')}
            onTouchStart={() => setActiveSlider('min')}
            className={`${styles.priceSlider} ${styles.minSlider}`}
            style={{ zIndex: activeSlider === 'min' ? 4 : 2 }}
            disabled={disabled}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value.max}
            onChange={e => handlePriceChange('max', parseInt(e.target.value))}
            onMouseDown={() => setActiveSlider('max')}
            onTouchStart={() => setActiveSlider('max')}
            className={`${styles.priceSlider} ${styles.maxSlider}`}
            style={{ zIndex: activeSlider === 'max' ? 4 : 3 }}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Price Display */}
      <div className={styles.priceDisplay}>
        ${value.min.toLocaleString()} - ${value.max.toLocaleString()}
      </div>
    </div>
  )
}

export default PriceRangeSlider
