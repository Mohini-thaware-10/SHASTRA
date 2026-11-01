"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/common/brand-mark";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { accountNavigation, primaryNavigation } from "@/config/navigation";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(14);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;

    const focusTimer = window.setTimeout(() => {
      const firstLink = panelRef.current?.querySelector<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      firstLink?.focus();
    }, 80);

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  };

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) return;

    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-500",
        scrolled || menuOpen
          ? "border-b border-line/80 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container
        size="wide"
        className="flex h-[var(--header-height)] items-center justify-between gap-4"
      >
        <Link
          href="/#top"
          aria-label="SHATRA home"
          className="rounded-xl transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-strong"
        >
          <BrandMark />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative rounded-full px-3.5 py-2 text-[0.8125rem] font-semibold text-ink-soft transition-colors hover:text-ink xl:px-4"
            >
              {item.label}
              <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-violet to-gold transition-transform duration-300 group-hover:scale-x-100 xl:inset-x-4" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={accountNavigation.signIn.href}
            className="rounded-full px-4 py-2 text-[0.8125rem] font-semibold text-ink-soft transition-colors hover:bg-ink/[0.045] hover:text-ink"
          >
            {accountNavigation.signIn.label}
          </Link>
          <Button
            href={accountNavigation.getStarted.href}
            size="sm"
            icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />}
          >
            {accountNavigation.getStarted.label}
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white/70 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-white lg:hidden"
        >
          {menuOpen ? (
            <X className="h-5 w-5" strokeWidth={1.8} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.8} />
          )}
        </button>
      </Container>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-violet via-sky to-gold"
        style={{ scaleX: progress }}
      />

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 top-[var(--header-height)] z-40 cursor-default bg-plum-deep/15 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
            />

            <motion.div
              id="mobile-navigation"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              onKeyDown={trapFocus}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-b border-line bg-background/97 px-5 pb-7 pt-3 shadow-[0_32px_80px_-40px_rgba(30,24,58,0.4)] backdrop-blur-2xl sm:px-8 lg:hidden"
            >
              <nav aria-label="Mobile primary navigation" className="flex flex-col">
                {primaryNavigation.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex min-h-14 items-center justify-between border-b border-line/80 py-3.5 text-[1.05rem] font-semibold text-ink transition-colors hover:text-violet-strong"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-[0.65rem] tracking-[0.18em] text-ink-muted/60">
                        0{index + 1}
                      </span>
                      {item.label}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-strong"
                      strokeWidth={1.8}
                    />
                  </Link>
                ))}
              </nav>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  href={accountNavigation.signIn.href}
                  variant="secondary"
                  size="md"
                  fullWidth
                >
                  {accountNavigation.signIn.label}
                </Button>
                <Button
                  href={accountNavigation.getStarted.href}
                  size="md"
                  fullWidth
                  icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
                >
                  {accountNavigation.getStarted.label}
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-2.5 rounded-2xl border border-line bg-white/55 p-3.5">
                <BrandMark showWordmark={false} size="sm" />
                <p className="text-xs leading-5 text-ink-muted">
                  A personalised learning universe for Class 1–12.
                </p>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
