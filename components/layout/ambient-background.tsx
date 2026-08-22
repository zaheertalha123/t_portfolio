"use client";

import { useEffect, useRef } from "react";

export function AmbientBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      const element = backgroundRef.current;
      if (!element) return;
      element.style.setProperty("--pointer-x", `${x}px`);
      element.style.setProperty("--pointer-y", `${y}px`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      ref={backgroundRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="ambient-orb ambient-orb-one"><div /></div>
      <div className="ambient-orb ambient-orb-two"><div /></div>
      <div className="ambient-orb ambient-orb-three"><div /></div>
    </div>
  );
}
