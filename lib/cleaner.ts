/* Cleans and processes reddit titles */

//helper function to avoid special characters w/ regex meaning
export function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[]\]/g, '\$&')
}

const fillerWords = [
  'finally',
  'complete',
  'finished',
  'first time',
  '[help]',
  'any advice',
  '?',
  '!',
  '😍',
  'advice',
]

export function cleanTitle(title: string): string {
  let cleaned = title.toLowerCase().replace(/[^\w\s]/g, '')
  for (const word of fillerWords) {
    try {
      const escaped = escapeRegex(word)
      if (!escaped || escaped === '?') continue
      const regex = new RegExp(escaped, 'gi')
      cleaned = cleaned.replace(regex, '')
    } catch (err) {
      console.error(`Error compiling RegExp for word "${word}":`, err)
    }
  }
  return cleaned.trim()
}

export function deduplicateTitles(titles: string[]): string[] {
  const seen = new Set<string>()
  const results: string[] = []
  titles.forEach(title => {
    const key = title.split(' ').slice(0, 4).join(' ')
    if (!seen.has(key)) {
      seen.add(key)
      results.push(title)
    }
  })
  return results
}
