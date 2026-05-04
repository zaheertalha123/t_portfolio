"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AlertTriangle } from "lucide-react";

const CHAT_API = "/api/chat";
const RATE_LIMIT_WINDOW_MS = 300_000;

export function usePortfolioAiChat() {
  const [rateLimited, setRateLimited] = useState(false);
  const unblockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (unblockTimerRef.current) {
        clearTimeout(unblockTimerRef.current);
      }
    };
  }, []);

  const chatFetch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const res = await fetch(input, init);
      if (res.status === 429) {
        setRateLimited(true);
        if (unblockTimerRef.current) {
          clearTimeout(unblockTimerRef.current);
        }
        unblockTimerRef.current = setTimeout(() => {
          setRateLimited(false);
          unblockTimerRef.current = null;
        }, RATE_LIMIT_WINDOW_MS);
      }
      return res;
    },
    []
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: CHAT_API,
        fetch: chatFetch,
      }),
    [chatFetch]
  );

  const chat = useChat({
    messages: [],
    transport,
  });

  return { ...chat, rateLimited };
}

type RateLimitChatBannerProps = {
  className?: string;
};

export function RateLimitChatBanner({ className }: RateLimitChatBannerProps) {
  return (
    <div
      role="alert"
      className={`rounded-xl border border-amber-500/35 bg-amber-950/50 px-3 py-2.5 text-amber-50 flex gap-2.5 items-start ${className ?? ""}`}
    >
      <AlertTriangle
        className="w-4 h-4 shrink-0 mt-0.5 text-amber-400"
        aria-hidden
      />
      <div className="min-w-0 space-y-0.5">
        <p className="text-sm font-medium text-amber-100">Too many requests</p>
        <p className="text-xs text-amber-200/90 leading-snug">
          Please try again later.
        </p>
      </div>
    </div>
  );
}
