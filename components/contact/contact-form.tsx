"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon, Loader2 } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        if (onSuccess) {
          setTimeout(() => onSuccess(), 2000);
        }
      } else {
        const errorData = await response.json();
        console.error("Error sending message:", errorData.error);
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 mb-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
          <SendIcon className="w-5 h-5 text-white" />
        </div>
        <h4 className="text-base font-medium mb-2">Message Sent!</h4>
        <p className="text-xs text-center text-zinc-400 mb-3">
          Thanks for reaching out. I'll get back to you as soon as possible.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400 text-sm">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    className="bg-zinc-800/50 border-zinc-700 h-9"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-400 text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-zinc-800/50 border-zinc-700 focus:border-cyan-500 h-9"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-sm">Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="What is this regarding?"
                  className="bg-zinc-800/50 border-zinc-700 focus:border-cyan-500 h-9"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-400 text-sm">Message</FormLabel>
              <FormControl>
                <TextareaAutosize
                  placeholder="Your message"
                  className="flex w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-400 focus:border-cyan-500 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  minRows={3}
                  maxRows={8}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border-none rounded-xl hover:from-cyan-600/20 hover:to-blue-600/20 p-6"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
