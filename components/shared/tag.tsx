import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 bg-zinc-800 text-xs rounded-xl border border-zinc-700">
      {children}
    </span>
  );
}
