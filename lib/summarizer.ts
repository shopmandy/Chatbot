/* GPT summarization */
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_TRENDS_API_KEY,
})

export async function summarizeTopics(
  cleanedTitles: string[],
): Promise<string[]> {
  const prompt = `
    You are generating trending DIY chatbot topics.
    Given these Reddit titles: "${cleanedTitles.join(', ')}"
    Summarize 4 short, approachable DIY topics people might want to ask about.
    Only output the topics as a list.
    Do not include quotation marks around the topics or questions. 
      `

  if (cleanedTitles.length == 0) {
    return []
  }
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  const rawOutput = completion.choices[0].message.content || ''
  return rawOutput
    .split('\n')
    .map((item: string) => item.replace(/^[\d.-\s]+/, '').trim())
    .filter(Boolean)
}
