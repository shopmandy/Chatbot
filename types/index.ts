// Core Types
export interface PriceRange {
  min: number
  max: number
}

export interface RoomAnalysis {
  searchTerms: string[]
  beforeImageUrl: string
  afterImageUrl: string
  roomType: string
}

// Amazon Product Types
export interface AmazonProduct {
  id: string
  title: string
  price: string
  image: string
  url: string
  features: {
    DisplayValues: string[]
    Label: string
    Locale: string
  }
}

export interface AmazonSearchResult {
  Items: AmazonProduct[]
  TotalResultCount: number
}

// Gallery Types
export interface GalleryItem {
  before: string
  after: string
  label: string
  roomType: string
}

// API Request/Response Types
export interface AmazonSearchRequest {
  prompt: string
  roomType?: string
  priceRange?: PriceRange
  beforeImageUrl?: string
  afterImageUrl?: string
  searchTerms?: string[]
}

export interface AmazonSearchResponse {
  success: boolean
  products: AmazonProduct[]
  error?: string
}

export interface RoomAnalysisRequest {
  beforeImageUrl: string
  afterImageUrl: string
  roomType?: string
}

export interface RoomAnalysisResponse {
  success: boolean
  searchTerms?: string[]
  error?: string
}

export interface RoomMakeoverRequest {
  imageUrl: string
  prompt: string
}

export interface RoomMakeoverResponse {
  outputUrl?: string
  error?: string
}

// Component Props Types
export interface ImageUploaderProps {
  image: File | null
  beforePreview: string | null
  onImageChange: (file: File | null) => void
  onPreviewChange: (preview: string | null) => void
  loading: boolean
}

export interface VisionInputProps {
  vision: string
  onVisionChange: (vision: string) => void
  onGenerate: () => void
  loading: boolean
  visionFocus: boolean
  onVisionFocus: (focus: boolean) => void
}

export interface RoomTypeSelector {
  roomType: string
  customRoomType: string
  showCustomInput: boolean
  onRoomTypeChange: (type: string) => void
  onCustomRoomTypeChange: (type: string) => void
  onShowCustomInputChange: (show: boolean) => void
}

export interface ProductGridProps {
  products: AmazonProduct[]
  loading: boolean
}

export interface GalleryProps {
  gallery: GalleryItem[]
  showAllGallery: boolean
  onShowAllGalleryChange: (show: boolean) => void
  onImageEnlarge: (item: { src: string; alt: string }) => void
}

// Hook Return Types
export interface UseRoomGenerationReturn {
  loading: boolean
  progress: number
  loadingMessage: string
  messageOpacity: number
  generateRoom: (
    image: File,
    prompt: string,
    roomType: string
  ) => Promise<string>
}

export interface UseProductSearchReturn {
  products: AmazonProduct[]
  currentAnalysis: RoomAnalysis | null
  searchProducts: (analysis?: RoomAnalysis) => Promise<void>
  searchWithAnalysis: (
    beforeImageUrl: string,
    afterImageUrl: string,
    roomType: string,
    vision: string
  ) => Promise<void>
  loading: boolean
}

export interface UseMobileDetectionReturn {
  isMobile: boolean
}

// Constants Types
export type SearchCategory = 'All' | 'HomeAndKitchen'
export type RoomTypeOption =
  | 'Living Room'
  | 'Bedroom'
  | 'Kitchen'
  | 'Bathroom'
  | 'Office'
  | 'Dorm'
  | 'Other'

// Error Types
export interface ApiError extends Error {
  status?: number
  code?: string
}
