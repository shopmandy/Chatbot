import { useState, useCallback, useRef } from 'react'
import {
  API_ENDPOINTS,
  IMAGE_CONFIG,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  REPLICATE_CONFIG,
} from '../constants'
import type { UseRoomGenerationReturn } from '../types'

export const useRoomGeneration = (): UseRoomGenerationReturn => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0])
  const [messageOpacity, setMessageOpacity] = useState(1)

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const startLoadingAnimation = useCallback(() => {
    setProgress(0)
    setLoadingMessage(LOADING_MESSAGES[0])
    setMessageOpacity(1)

    // Progress animation
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev
        return prev + Math.random() * 2
      })
    }, 200)

    // Message cycling
    let messageIndex = 0
    messageIntervalRef.current = setInterval(() => {
      setMessageOpacity(0)
      setTimeout(() => {
        messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length
        setLoadingMessage(LOADING_MESSAGES[messageIndex])
        setMessageOpacity(1)
      }, 150)
    }, 3000)
  }, [])

  const stopLoadingAnimation = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    if (messageIntervalRef.current) {
      clearInterval(messageIntervalRef.current)
      messageIntervalRef.current = null
    }
    setProgress(100)
  }, [])

  const uploadImageToImgBB = async (image: File): Promise<string> => {
    const formData = new FormData()
    formData.append('image', image)

    const uploadRes = await fetch(
      `${IMAGE_CONFIG.IMGBB_UPLOAD_URL}?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const uploadJson = await uploadRes.json()
    if (!uploadJson.success || !uploadJson.data?.url) {
      throw new Error(ERROR_MESSAGES.IMAGE_UPLOAD_FAILED)
    }

    return uploadJson.data.display_url || uploadJson.data.url
  }

  const generateRoomTransformation = async (
    imageUrl: string,
    prompt: string
  ): Promise<string> => {
    const response = await fetch(API_ENDPOINTS.ROOM_MAKEOVER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl, prompt }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (data.error) {
      throw new Error(data.error)
    }

    if (!data.outputUrl) {
      throw new Error('No output URL received from the API')
    }

    return data.outputUrl
  }

  const generateRoom = useCallback(
    async (image: File, vision: string, roomType: string): Promise<string> => {
      if (!image || !vision) {
        throw new Error(ERROR_MESSAGES.IMAGE_REQUIRED)
      }

      setLoading(true)
      startLoadingAnimation()

      try {
        // Upload image
        const imageUrl = await uploadImageToImgBB(image)

        // Create enhanced prompt
        const enhancedPrompt =
          roomType && roomType !== ''
            ? `Transform this ${roomType.toLowerCase()} with ${vision}`
            : vision

        // Generate room transformation
        const outputUrl = await generateRoomTransformation(
          imageUrl,
          enhancedPrompt
        )

        stopLoadingAnimation()
        setLoading(false)

        return outputUrl
      } catch (error) {
        stopLoadingAnimation()
        setLoading(false)
        throw error instanceof Error
          ? error
          : new Error(ERROR_MESSAGES.ROOM_GENERATION_FAILED)
      }
    },
    [startLoadingAnimation, stopLoadingAnimation]
  )

  return {
    loading,
    progress,
    loadingMessage,
    messageOpacity,
    generateRoom,
  }
}
