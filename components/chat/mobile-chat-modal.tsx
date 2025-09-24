"use client";

import type React from "react";
import { useCallback, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, MessageCircleDashed, ArrowLeft } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";

const getMessageText = (message: UIMessage): string => {
  try {
    const parts = (message as any).parts as Array<{
      type: string;
      text?: string;
    }>;
    return (
      parts
        ?.filter((p) => p && p.type === "text" && typeof p.text === "string")
        .map((p) => p.text as string)
        .join("") ?? ""
    );
  } catch {
    return "";
  }
};

interface MobileChatModalProps {
  onClose: () => void;
}

export function MobileChatModal({ onClose }: MobileChatModalProps) {
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat({
    messages: [],
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const submitMessage = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    void sendMessage({ text: trimmed });
    setInput("");
  }, [input, isLoading, sendMessage]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submitMessage();
      }
    },
    [submitMessage]
  );

  const quickQuestions = [
    "Is he a good fit for a Next.js role?",
    "Tell me about his AI integration experience",
  ];

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Mobile Modal Header */}
      <div className="flex items-center p-4 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-2 hover:bg-zinc-800"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 mr-2 text-cyan-400" />
          <h3 className="text-lg font-medium">Portfolio AI</h3>
        </div>
        <div className="w-9"></div> {/* Spacer to balance the back button */}
      </div>

      {/* Modal Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {messages.length === 0 && !isLoading ? (
          <div className="flex-1 relative px-4 flex items-center justify-center">
            <div className="absolute top-0 h-full w-full bg-cyan-700/10 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center text-center space-y-4 px-6">
              <div className="p-4 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 shadow-lg shadow-cyan-500/10">
                <MessageCircle className="w-6 h-6 text-cyan-400 animate-bounce" />
              </div>
              <h4 className="text-lg font-medium text-zinc-100">
                Is this candidate a good fit?
              </h4>
              <p className="max-w-md text-zinc-400 text-sm">
                Ask about specific skills or paste job description.
              </p>
            </div>
          </div>
        ) : (
          <ScrollArea ref={scrollAreaRef} className="flex-1">
            <div className="space-y-4 px-4 py-4">
              {messages.map((message: UIMessage) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 overflow-clip max-w-[85%] ${
                      message.role === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl ${
                        message.role === "user"
                          ? "bg-cyan-900/60 text-zinc-200"
                          : "bg-zinc-800 text-zinc-200"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {getMessageText(message)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="p-2 rounded-full bg-zinc-700">
                      <MessageCircleDashed className="w-4 h-4 text-zinc-300" />
                    </div>
                    <div className="bg-zinc-800 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Modal Input Area */}
      <div className="bg-zinc-900/90 backdrop-blur-sm border-t border-zinc-800 p-4 pb-8 flex-shrink-0">
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="text-sm bg-zinc-800/50 hover:text-cyan-400 text-cyan-400 border border-zinc-700/50 rounded-xl px-3 py-2"
                onClick={() => setInput(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitMessage();
          }}
          className="flex space-x-2 rounded-xl"
        >
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about the candidate..."
            className="flex-1 bg-zinc-800/50 border border-zinc-700 placeholder-zinc-500 rounded-xl text-zinc-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors text-base"
            minRows={2}
            maxRows={4}
          />
        </form>
      </div>
    </div>
  );
}
