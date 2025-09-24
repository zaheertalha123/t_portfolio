"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  personalInfo: {
    name: string;
    title: string;
  };
  orderedNavItems: Array<{
    label: string;
    href: string;
  }>;
  activeSection: string;
  scrollToSection: (href: string) => void;
}

export function MobileHeader({
  personalInfo,
  orderedNavItems,
  activeSection,
  scrollToSection,
}: MobileHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile header content */}
      <div className="flex items-center justify-between md:hidden">
        <Link href="/" className="flex items-center group">
          <div className="text-cyan-400/80 font-bold text-xl relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
            {personalInfo.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </div>
          <span className="text-zinc-200 text-sm ml-2 hidden sm:inline-block transition-all duration-300 group-hover:text-zinc-100">
            / {personalInfo.title}
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          className="text-zinc-200 [&_svg]:!size-6"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300",
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile dropdown panel */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden absolute left-4 right-4 z-50 mt-2 rounded-xl border border-zinc-800/50",
          "bg-zinc-900/95 overflow-hidden",
          "transition-[opacity,transform,max-height] duration-300",
          mobileMenuOpen
            ? "opacity-100 max-h-[80vh]"
            : "pointer-events-none opacity-0 max-h-0"
        )}
      >
        <nav className="flex flex-col py-2">
          {orderedNavItems.map((item) => {
            const isActive = item.href.startsWith("#")
              ? activeSection === item.href.substring(1)
              : false;

            return (
              <Link
                key={`mobile-${item.label}`}
                href={item.href}
                className={cn(
                  "px-4 py-3 text-sm transition-colors",
                  isActive
                    ? "text-white bg-cyan-500/10"
                    : "text-zinc-200 hover:text-white hover:bg-zinc-800/60"
                )}
                onClick={(e) => {
                  const href = item.href;
                  const isHash = href.startsWith("#");
                  const isHome =
                    href === "/" &&
                    typeof window !== "undefined" &&
                    window.location.pathname === "/";
                  if (isHash || isHome) {
                    e.preventDefault();
                    scrollToSection(href);
                  }
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
