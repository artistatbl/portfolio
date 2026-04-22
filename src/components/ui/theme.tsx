"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";
type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => {
    finished: Promise<void>;
  };
};

const storageKey = "portfolio-theme";

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey);
    const nextTheme: ThemeMode =
      savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";

    setTheme(nextTheme);
    applyTheme(nextTheme);
    setMounted(true);
  }, []);

  function updateTheme(nextTheme: ThemeMode) {
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
  }

  function toggleTheme() {
    if (transitioning) {
      return;
    }

    const nextTheme = theme === "dark" ? "light" : "dark";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      updateTheme(nextTheme);
      return;
    }

    const transitionDocument = document as ViewTransitionDocument;

    if (!transitionDocument.startViewTransition) {
      updateTheme(nextTheme);
      return;
    }

    setTransitioning(true);
    document.documentElement.dataset.themeTransition = nextTheme;

    const viewTransition = transitionDocument.startViewTransition(() => {
      updateTheme(nextTheme);
    });

    viewTransition.finished.finally(() => {
      delete document.documentElement.dataset.themeTransition;
      setTransitioning(false);
    });
  }

  const button = (
    <button
      type="button"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="flex h-9 w-9 cursor-pointer items-center justify-center text-[var(--intro)] transition-colors hover:text-[var(--intro)]"
    >
      <span
        className={`transition-transform duration-300 ${
          mounted ? "rotate-0" : ""
        } ${theme === "dark" ? "rotate-180" : "rotate-0"}`}
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  );

  return (
    <>
      <div
        className="fixed right-0 top-0 z-[100] sm:hidden"
        style={{
          right: "max(1rem, env(safe-area-inset-right))",
          top: "max(1rem, env(safe-area-inset-top))",
        }}
      >
        {button}
      </div>
      <div
        className="fixed bottom-0 left-0 z-[100] hidden sm:block"
        style={{
          left: "max(1rem, env(safe-area-inset-left))",
          bottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        {button}
      </div>
    </>
  );
}

export function ThemeScript() {
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('${storageKey}');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
