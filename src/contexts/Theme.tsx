"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
// css
import styles from "@/components/ThemeToggle/ThemeToggle.module.scss"
// components
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle"
import LocaleSwitcher from "@/section/dashboard/Header/LocaleSwitcher"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      setTheme(systemTheme)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme)
      document.documentElement.setAttribute("data-theme", theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  if (!mounted) {
    return null
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={styles.themeToggleContainer}>
        <ThemeToggle />
        <LocaleSwitcher />
      </div>
      {children}</ThemeContext.Provider>
}
