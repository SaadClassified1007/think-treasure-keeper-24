
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function truncateText(text: string, maxLength: number) {
  if (text?.length <= maxLength) return text
  return text?.slice(0, maxLength) + '...'
}

// Theme management
export type Theme = 'dark' | 'light'

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

export function initializeTheme() {
  // Check if theme is stored in localStorage
  const storedTheme = localStorage.getItem('theme') as Theme | null
  const theme = storedTheme || getSystemTheme()
  setTheme(theme)
}
