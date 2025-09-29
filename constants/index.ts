import { RoomTypeOption } from '../types'

// Room Types
export const ROOM_TYPES: RoomTypeOption[] = [
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Bathroom',
  'Office',
  'Dorm',
  'Other',
]

// API Endpoints
export const API_ENDPOINTS = {
  ROOM_MAKEOVER: '/api/room-makeover',
  AMAZON_PRODUCTS: '/api/amazon-products',
  ANALYZE_ROOM_CHANGES: '/api/analyze-room-changes',
  CHAT: '/api/chat',
} as const

// Amazon API Configuration
export const AMAZON_CONFIG = {
  DEFAULT_CATEGORY: 'All' as const,
  MAX_SEARCH_TERMS: 6,
  MAX_PRODUCTS_PER_TERM: 4,
  MAX_TOTAL_PRODUCTS: 12,
  SEARCH_TIMEOUT: 30000, // 30 seconds
} as const

// OpenAI Configuration
export const OPENAI_CONFIG = {
  MODEL: 'gpt-4o' as const,
  MAX_TOKENS: 500,
  TEMPERATURE: 0.3,
  IMAGE_DETAIL: 'high' as const,
} as const

// UI Configuration
export const UI_CONFIG = {
  MOBILE_BREAKPOINT: 768,
  PROGRESS_UPDATE_INTERVAL: 100,
  MESSAGE_FADE_DURATION: 300,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const

// Loading Messages
export const LOADING_MESSAGES = [
  'Mandy is thinking',
  'Analyzing your space',
  'Creating magic',
  'Almost there',
] as const

// Error Messages
export const ERROR_MESSAGES = {
  IMAGE_REQUIRED: 'Please upload an image and enter a prompt',
  IMAGE_UPLOAD_FAILED:
    'Image upload failed. Please check your API key and try again.',
  ROOM_GENERATION_FAILED: 'Room generation failed. Please try again.',
  PRODUCT_SEARCH_FAILED: 'Product search failed. Check console for details.',
  NO_PRODUCTS_FOUND: 'No products found. Check console for details.',
  INVALID_FILE_TYPE: 'Please select a valid image file (JPEG, PNG, or WebP)',
  FILE_TOO_LARGE: 'File size must be less than 10MB',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
} as const

// Price Range Validation
export const PRICE_VALIDATION = {
  MIN_PRICE: 1,
  MAX_PRICE: 10000,
  DEFAULT_MIN: 50,
  DEFAULT_MAX: 1000,
} as const

// Image Configuration
export const IMAGE_CONFIG = {
  IMGBB_UPLOAD_URL: 'https://api.imgbb.com/1/upload',
  PLACEHOLDER_IMAGE: '/placeholder-image.jpg',
  DEFAULT_GALLERY_ITEMS: [
    {
      before: '/before-room-3.png',
      after: '/after-room-3.png',
      label: 'My Glow Up!',
      roomType: 'Dorm',
    },
  ],
} as const

// Replicate Configuration
export const REPLICATE_CONFIG = {
  MODEL_VERSION:
    '4836eb257a4fb8b87bac9eacbef9292ee8e1a497398ab96207067403a4be2daf',
  NEGATIVE_PROMPT: 'lowres, watermark, blurry, distorted furniture',
  NUM_INFERENCE_STEPS: 50,
  GUIDANCE_SCALE: 15,
  STRENGTH: 0.8,
  POLL_INTERVAL: 2000, // 2 seconds
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  ONBOARDING_NAME: 'onboarding_name',
  ONBOARDING_AGE: 'onboarding_age',
  ONBOARDING_CITY: 'onboarding_city',
  ONBOARDING_HOME_TYPE: 'onboarding_homeType',
  ONBOARDING_SPENDING: 'onboarding_spending',
  ONBOARDING_STYLES: 'onboarding_styles',
  ONBOARDING_BRANDS: 'onboarding_brands',
  ONBOARDING_COMPLETED: 'onboarding_completed',
} as const
