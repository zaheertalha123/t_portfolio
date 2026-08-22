"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  interactive?: boolean;
  skill?: string;
}

export function askAboutSkill(skill: string) {
  window.dispatchEvent(
    new CustomEvent("portfolio:ask-skill", { detail: { skill } })
  );
}

export function Tag({ children, interactive = false, skill }: TagProps) {
  const [pressed, setPressed] = useState(false);
  const label = skill ?? (typeof children === "string" ? children : "");

  if (!interactive || !label) {
    return (
      <span className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 bg-zinc-800 text-xs rounded-xl border border-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-cyan-200">
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setPressed(true);
        askAboutSkill(label);
        window.setTimeout(() => setPressed(false), 700);
      }}
      className={cn(
        "inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 bg-zinc-800 text-xs rounded-xl border border-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/60 hover:text-cyan-200",
        pressed && "border-cyan-400 text-cyan-300 bg-cyan-500/10 scale-105"
      )}
    >
      {children}
    </button>
  );
}
