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
        <Button
          onClick={() => setIsOpen(true)}
          className="size-16 rounded-full bg-cyan-800 text-white font-bold text-lg"
        >
          AI
          <span className="sr-only">Open AI Chat</span>
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="h-screen w-screen max-w-none p-0 border-0 bg-transparent lg:hidden [&>button]:hidden">
          <MobileChatModal onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
