"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getNavItems, getPersonalInfo } from "@/lib/data";
import { MobileHeader } from "@/components/header/mobile-header";

export function PortfolioHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = getNavItems();
  const personalInfo = getPersonalInfo();

  const orderedNavItems = useMemo(() => {
    const mapped = navItems.map((item) =>
      item.href === "/" ? { ...item, label: "AI Chat", href: "#ai-chat" } : item
    );

    let result = [...mapped];
    const skillsIdx = result.findIndex((i) => i.href === "#skills");
    const expIdx = result.findIndex((i) => i.href === "#experience");
    if (skillsIdx !== -1 && expIdx !== -1 && skillsIdx > expIdx) {
      const [skillsItem] = result.splice(skillsIdx, 1);
      result.splice(expIdx, 0, skillsItem);
    }

    const aiIdx = result.findIndex((i) => i.href === "#ai-chat");
    if (aiIdx > 0) {
      const [aiItem] = result.splice(aiIdx, 1);
      result = [aiItem, ...result];
    }

    return result;
  }, [navItems]);

  const scrollToSection = useCallback(
    (href: string, opts?: { smooth?: boolean }) => {
      const smooth = opts?.smooth !== false;
      const scrollContainer = document.getElementById("right-pane");
      const canUseContainer = !!(
        scrollContainer &&
        scrollContainer.scrollHeight > scrollContainer.clientHeight
      );

      // Home
      if (href === "/") {
        if (!canUseContainer) {
          window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        } else {
          scrollContainer!.scrollTo({
            top: 0,
            behavior: smooth ? "smooth" : "auto",
          });
        }
        setActiveSection("");
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.hash = "";
          window.history.replaceState(null, "", url.toString());
        }
        return;
      }

      if (!href.startsWith("#")) return;

      const id = href.substring(1);
      const target = document.getElementById(id);
      if (!target) return;

      const containerTop = canUseContainer
        ? scrollContainer!.getBoundingClientRect().top
        : 0;
      const targetTopInViewport = target.getBoundingClientRect().top;
      const headerEl = document.querySelector("header");
      const headerHeight = headerEl
        ? (headerEl as HTMLElement).getBoundingClientRect().height
        : 80;

      const currentScrollTop = canUseContainer
        ? scrollContainer!.scrollTop
        : window.scrollY;
      const targetTopInContainer =
        targetTopInViewport -
        containerTop +
        currentScrollTop -
        headerHeight -
        8;

      if (canUseContainer) {
        scrollContainer!.scrollTo({
          top: Math.max(0, targetTopInContainer),
          behavior: smooth ? "smooth" : "auto",
        });
      } else {
        const targetTopInWindow =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          8;
        window.scrollTo({
          top: Math.max(0, targetTopInWindow),
          behavior: smooth ? "smooth" : "auto",
        });
      }

      setActiveSection(id);

      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.replaceState(null, "", url.toString());
      }
    },
    []
  );

  useEffect(() => {
    let containerEl: HTMLElement | null = null;

    const handleScroll = () => {
      const el =
        containerEl ||
        (document.getElementById("right-pane") as HTMLElement | null);
      const canUseContainer = !!(el && el.scrollHeight > el.clientHeight);
      const scrollTop = canUseContainer ? el!.scrollTop : window.scrollY;
      setScrolled(scrollTop > 20);

      const ids = orderedNavItems
        .filter((item) => item.href.startsWith("#"))
        .map((item) => item.href.substring(1));

      const headerEl = document.querySelector("header");
      const headerHeight = headerEl
        ? (headerEl as HTMLElement).getBoundingClientRect().height
        : 80;
      const containerTop = canUseContainer
        ? el!.getBoundingClientRect().top
        : 0;
      const viewportHeight = canUseContainer
        ? el!.clientHeight
        : window.innerHeight;
      const activationY = headerHeight + viewportHeight * 0.55;

      let currentActiveId = ids[0] || "";
      for (const id of ids) {
        const sectionEl = document.getElementById(id);
        if (!sectionEl) continue;
        const rect = sectionEl.getBoundingClientRect();
        const topInContainer = rect.top - containerTop;
        if (topInContainer <= activationY) {
          currentActiveId = id;
        } else {
          break;
        }
      }

      const nearBottom = canUseContainer
        ? scrollTop + viewportHeight >= el!.scrollHeight - 2
        : scrollTop + viewportHeight >=
          (document.scrollingElement || document.documentElement).scrollHeight -
            2;
      if (nearBottom && ids.length > 0) {
        currentActiveId = ids[ids.length - 1];
      }

      setActiveSection(currentActiveId);

      if (scrollTop < 100) {
        const firstSectionId = ids[0] || "";
        setActiveSection(firstSectionId);
      }
    };

    const bindContainer = () => {
      const el = document.getElementById("right-pane") as HTMLElement | null;
      if (el && el !== containerEl) {
        if (containerEl)
          containerEl.removeEventListener("scroll", handleScroll);
        containerEl = el;
        containerEl.addEventListener("scroll", handleScroll);
        handleScroll();
      }
    };

    window.addEventListener("scroll", handleScroll);
    bindContainer();

    const observer = new MutationObserver(() => bindContainer());
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", bindContainer);

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", bindContainer);
      observer.disconnect();
      if (containerEl) containerEl.removeEventListener("scroll", handleScroll);
    };
  }, [orderedNavItems]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) {
      requestAnimationFrame(() => {
        scrollToSection(window.location.hash, { smooth: false });
      });
    }
  }, [scrollToSection]);

  return (
    <header
      className={"fixed top-0 md:top-4 left-0 right-0 z-50 container px-4"}
    >
      <div
        className={cn(
          "w-full py-2 px-4 md:px-6 rounded-xl",
          scrolled
            ? "bg-zinc-900/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="text-cyan-400/80 font-bold text-xl relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
              {personalInfo.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </div>
            <span className="text-zinc-200 text-sm ml-2 hidden sm:inline-block transition-all duration-300 group-hover:text-zinc-100">
              / {personalInfo.title}
            </span>
          </Link>

          <nav className="flex items-center space-x-1">
            {orderedNavItems.map((item) => {
              const isActive = item.href.startsWith("#")
                ? activeSection === item.href.substring(1)
                : false;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm relative group transition-all duration-300",
                    isActive
                      ? "text-white font-medium"
                      : "text-white hover:text-cyan-200"
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
                  }}
                >
                  <span className="relative z-10">{item.label}</span>

                  <span className="absolute inset-0 rounded-t-xl group-hover:bg-cyan-500/10 transition-all duration-300"></span>

                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full",
                      isActive && "w-4/5"
                    )}
                  ></span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile header */}
        <MobileHeader
          personalInfo={personalInfo}
          orderedNavItems={orderedNavItems}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />
      </div>
    </header>
  );
}
