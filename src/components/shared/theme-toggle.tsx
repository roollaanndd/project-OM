"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useAppStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useAppStore();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border border-pink-200 bg-white/70 text-pink-700 transition-colors hover:bg-pink-50 dark:border-pink-800 dark:bg-pink-950/50 dark:text-pink-300 dark:hover:bg-pink-900/50",
        className,
      )}
      aria-label={theme === "light" ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </motion.div>
    </button>
  );
}
