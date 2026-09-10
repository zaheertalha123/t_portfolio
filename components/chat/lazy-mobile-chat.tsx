"use client";

import dynamic from "next/dynamic";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const MobileChatModal = dynamic(
  () =>
    import("@/components/chat/mobile-chat-modal").then(
      (mod) => mod.MobileChatModal
    ),
  { ssr: false }
);

type LazyMobileChatProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LazyMobileChat({ open, onOpenChange }: LazyMobileChatProps) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="left-0 top-0 translate-x-0 translate-y-0 h-[100dvh] w-full max-w-full overflow-hidden p-0 border-0 bg-black gap-0 rounded-none lg:hidden [&>button]:hidden">
        <MobileChatModal onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
