"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const pane = document.getElementById("right-pane");
      const usePane = !!(pane && pane.scrollHeight > pane.clientHeight + 8);
      const scrollTop = usePane ? pane!.scrollTop : window.scrollY;
      const max = usePane
        ? pane!.scrollHeight - pane!.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      const next = max > 0 ? Math.min(1, scrollTop / max) : 0;
      setProgress((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    const pane = document.getElementById("right-pane");
    pane?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      pane?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
