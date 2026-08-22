"use client";

import { cn } from "@/lib/utils";

export const CHAT_SUGGESTED_QUESTIONS = [
  "Is Talha a strong fit for an Agentic AI engineer role?",
  "Would he match a Voice AI / conversational agents position?",
  "Is he ready for an LLM apps role with tool calling and system prompts?",
  "Can he handle a Pipecat / real-time voice pipeline role?",
  "Is he a good fit for a Next.js + Vercel AI SDK product role?",
  "Would he succeed in a FastAPI / Python AI backend role?",
  "Is he suitable for an AI engineer role that needs RAG and agents?",
  "Does he fit a cybersecurity engineering or secure-by-design AI role?",
  "Is he a match for a web app security / vulnerability assessment role?",
  "Can he support a role blending AI products with cybersecurity?",
] as const;

type ChatQuestionSliderProps = {
  onQuestionSelect: (question: string) => void;
  disabled?: boolean;
  className?: string;
};

export function ChatQuestionSlider({
  onQuestionSelect,
  disabled = false,
  className,
}: ChatQuestionSliderProps) {
  const questions = [...CHAT_SUGGESTED_QUESTIONS, ...CHAT_SUGGESTED_QUESTIONS];

  const handleSelect = (question: string) => {
    if (disabled) return;
    onQuestionSelect(question);
  };

  return (
    <div
      className={cn(
        "chat-question-marquee relative overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "chat-question-marquee-track flex w-max items-center gap-2 py-2 pl-2",
          disabled && "is-paused"
        )}
      >
        {questions.map((question, index) => (
          <button
            key={`${question}-${index}`}
            type="button"
            disabled={disabled}
            onClick={() => handleSelect(question)}
            className="shrink-0 whitespace-nowrap rounded-lg border border-zinc-700/50 bg-zinc-900/60 px-3 py-1.5 text-xs sm:text-sm text-cyan-400 transition-colors hover:border-cyan-500/40 hover:bg-zinc-800 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
