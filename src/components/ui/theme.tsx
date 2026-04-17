"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

const storageKey = "portfolio-theme";

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

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
    updateTheme(theme === "dark" ? "light" : "dark");
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
