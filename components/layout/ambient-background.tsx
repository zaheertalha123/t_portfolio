"use client";

import { useEffect, useState } from "react";

export function AmbientBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      setOffset({ x, y });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="animate-orb-drift absolute -top-24 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-3xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
      <div
        className="animate-orb-drift-slow absolute top-[30%] right-[-12%] h-[24rem] w-[24rem] rounded-full bg-blue-600/10 blur-3xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${-offset.x}px, ${offset.y * 0.6}px)` }}
      />
      <div
        className="animate-orb-drift absolute bottom-[-8%] left-[20%] h-[20rem] w-[20rem] rounded-full bg-cyan-400/8 blur-3xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${offset.x * 0.4}px, ${-offset.y}px)` }}
      />
    </div>
  );
}
