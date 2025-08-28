/**
 * Safe JSON parsing for API responses
 * Provides better error messages when API returns HTML instead of JSON
 */
export async function safeJsonParse(response: Response): Promise<any> {
  // Check if response is OK
  if (!response.ok) {
    const errorText = await response.text()
    console.error(
      `API HTTP error ${response.status}:`,
      errorText.substring(0, 500)
    )
    throw new Error(
      `API returned ${response.status}: ${errorText.substring(0, 200)}`
    )
  }

  // Check content type
  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    const responseText = await response.text()
    console.error('API returned non-JSON response:', {
      url: response.url,
      status: response.status,
      contentType,
      responsePreview: responseText.substring(0, 500),
    })

    // Check if it's an HTML error page
    if (responseText.includes('<!DOCTYPE') || responseText.includes('<html')) {
      throw new Error(
        `API returned HTML error page instead of JSON. This usually indicates a server error or routing issue. Check server logs for: ${response.url}`
      )
    }

    throw new Error(
      `API returned non-JSON response (${contentType}): ${responseText.substring(0, 200)}`
    )
  }

  try {
    return await response.json()
  } catch (error) {
    const responseText = await response.text()
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('JSON parsing failed:', {
      url: response.url,
      error: errorMessage,
      responsePreview: responseText.substring(0, 500),
    })
    throw new Error(`Failed to parse JSON response: ${errorMessage}`)
  }
}

/**
 * Fetch with better error handling
 */
export async function safeFetch(
  url: string,
  options?: RequestInit
): Promise<any> {
  try {
    const response = await fetch(url, options)
    return await safeJsonParse(response)
  } catch (error) {
    console.error(`API call failed for ${url}:`, error)
    throw error
  }
}
