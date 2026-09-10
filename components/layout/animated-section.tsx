"use client";

import type { ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "zoom-in"
  | "bounce";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  id?: string;
  forceAnimate?: boolean;
  eager?: boolean;
}

const SETTINGS = {
  duration: 500,
  delay: 80,
  easing: "ease-out",
  intensity: 0.4,
  enabled: true,
} as const;

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  className,
  threshold = 0.1,
  rootMargin = "-50px",
  id,
  forceAnimate = false,
  eager = false,
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
    defaultIntersecting: eager,
  });

  const shouldAnimate = (SETTINGS.enabled || forceAnimate) && !eager;
  const actualDelay = (delay * SETTINGS.delay) / 100;

  const getTransformStyle = () => {
    switch (animation) {
      case "fade-up":
        return `translate3d(0, ${10 * SETTINGS.intensity}px, 0)`;
      case "fade-in":
        return "translate3d(0, 0, 0)";
      case "slide-left":
        return `translate3d(-${10 * SETTINGS.intensity}px, 0, 0)`;
      case "slide-right":
        return `translate3d(${10 * SETTINGS.intensity}px, 0, 0)`;
      case "zoom-in":
        return `translate3d(0, 0, 0) scale(${1 - 0.05 * SETTINGS.intensity})`;
      case "bounce":
        return `translate3d(0, -${4 * SETTINGS.intensity}px, 0)`;
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  const animationStyles = shouldAnimate
    ? {
        transitionDuration: `${SETTINGS.duration}ms`,
        transitionTimingFunction: SETTINGS.easing,
        transitionDelay: actualDelay ? `${actualDelay}ms` : undefined,
        transitionProperty: "opacity, transform",
        transform: isIntersecting
          ? "translate3d(0, 0, 0) scale(1)"
          : getTransformStyle(),
        opacity: isIntersecting ? 1 : 0,
      }
    : undefined;

  return (
    <section
      ref={ref as any}
      className={cn(shouldAnimate && "motion-reveal", className)}
      style={animationStyles}
      id={id}
    >
      {children}
    </section>
  );
}
