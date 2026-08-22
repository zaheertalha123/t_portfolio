"use client";

import type { ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { useAnimation } from "@/contexts/animation-context";

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
}

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  className,
  threshold = 0.1,
  rootMargin = "-50px",
  id,
  forceAnimate = false,
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  const { settings } = useAnimation();
  const shouldAnimate = settings.enabled || forceAnimate;

  const actualDelay = (delay * settings.delay) / 100;

  const getTransformValue = (baseValue: number) => {
    return baseValue * settings.intensity;
  };

  const getAnimationStyles = () => {
    if (!shouldAnimate) {
      return {};
    }

    return {
      transitionDuration: `${settings.duration}ms`,
      transitionTimingFunction: settings.easing,
      transitionDelay: actualDelay ? `${actualDelay}ms` : undefined,
      transitionProperty: "opacity, transform, filter",
      transform: !isIntersecting
        ? getTransformStyle()
        : "translate3d(0, 0, 0) scale(1)",
      opacity: isIntersecting ? 1 : 0,
      filter: isIntersecting ? "blur(0)" : "blur(3px)",
    };
  };

  const getTransformStyle = () => {
    if (!isIntersecting) {
      switch (animation) {
        case "fade-up":
          return `translate3d(0, ${getTransformValue(10)}px, 0)`;
        case "fade-in":
          return "translate3d(0, 0, 0)";
        case "slide-left":
          return `translate3d(-${getTransformValue(10)}px, 0, 0)`;
        case "slide-right":
          return `translate3d(${getTransformValue(10)}px, 0, 0)`;
        case "zoom-in":
          return `translate3d(0, 0, 0) scale(${1 - getTransformValue(0.05)})`;
        case "bounce":
          return `translate3d(0, -${getTransformValue(4)}px, 0)`;
        default:
          return "translate3d(0, 0, 0)";
      }
    }
    return "translate3d(0, 0, 0) scale(1)";
  };

  return (
    <section
      ref={ref as any}
      className={cn("motion-reveal", className)}
      style={getAnimationStyles()}
      id={id}
    >
      {children}
    </section>
  );
}
