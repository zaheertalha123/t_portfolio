"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LazyMobileChat } from "@/components/chat/lazy-mobile-chat";

export function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <div className="relative">
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-cyan-400/30" />
          <Button
            onClick={() => setIsOpen(true)}
            className="relative size-16 rounded-full bg-cyan-800 text-white font-bold text-lg animate-float-soft hover:bg-cyan-700"
          >
            AI
            <span className="sr-only">Open AI Chat</span>
          </Button>
        </div>
      </div>

      <LazyMobileChat open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
