"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const pane = document.getElementById("right-pane");
      const usePane = !!(pane && pane.scrollHeight > pane.clientHeight + 8);
      const scrollTop = usePane ? pane!.scrollTop : window.scrollY;
      const max = usePane
        ? pane!.scrollHeight - pane!.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, scrollTop / max) : 0);
    };

    const pane = document.getElementById("right-pane");
    pane?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      pane?.removeEventListener("scroll", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
