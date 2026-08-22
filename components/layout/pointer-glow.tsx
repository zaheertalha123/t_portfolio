"use client";

import { useEffect, useRef } from "react";

export function PointerGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const element = glowRef.current;
      if (!element) return;
      element.style.setProperty("--glow-x", `${e.clientX}px`);
      element.style.setProperty("--glow-y", `${e.clientY}px`);
      element.dataset.visible = "true";
    };
    const onLeave = () => {
      if (glowRef.current) glowRef.current.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={glowRef}
      data-visible="false"
      className="pointer-glow pointer-events-none fixed inset-0 z-[5] hidden md:block"
    />
  );
}
