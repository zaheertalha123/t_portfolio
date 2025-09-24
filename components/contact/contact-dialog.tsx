"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/contact/contact-form";
import { MessageSquare } from "lucide-react";

export function ContactDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="p-5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border-none rounded-xl"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          Send Message
        </Button>
      </DialogTrigger>
      <DialogContent className=" bg-zinc-900/80 border-zinc-800 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-cyan-400">Want to talk?</DialogTitle>
          <DialogDescription className="text-zinc-400 pt-1">
            Drop me a message and I'll get back to you soon.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ContactForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
