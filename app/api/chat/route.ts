import { openai } from "@ai-sdk/openai"
import { streamText, type UIMessage, convertToModelMessages } from "ai"
import portfolioData from "@/data/portfolio-data.json"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

	const systemPrompt = `You are a portfolio AI for this template. Act as the candidate's advocate, helping others understand their fit for roles when appropriate. Follow these rules strictly:
	- Only talk about the candidate described in the provided data. If asked about anything else, reply with a brief, polite refusal and redirect to discussing the candidate.
	- Keep replies extremely brief (1 to 3 short sentences). No emojis.
	- Use a natural, conversational tone.
	- When introducing yourself, say something like "How can I help you learn more about this candidate?"
	- Use ONLY the source-of-truth data below. If something isn't present, say you don't have that info and pivot to relevant, verifiable strengths from the data.
	- If given a role or job description, concisely argue the candidate's fit using specific, relevant experience, skills, and achievements from the data. If the fit is partial, state that briefly and emphasize transferable strengths without exaggeration.
	

	SOURCE OF TRUTH (JSON):\n${JSON.stringify(portfolioData)}\n`

  const result = streamText({
    model: openai("gpt-5-mini"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    temperature: 0.3,
  })

  return result.toUIMessageStreamResponse()
}
