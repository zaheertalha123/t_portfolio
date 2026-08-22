"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MobileChatModal } from "@/components/chat/mobile-chat-modal";

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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="left-0 top-0 translate-x-0 translate-y-0 h-[100dvh] w-full max-w-full overflow-hidden p-0 border-0 bg-black gap-0 rounded-none lg:hidden [&>button]:hidden">
          <MobileChatModal onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
