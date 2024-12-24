"use client"

import { createContext, useContext, useState, useEffect } from 'react'

type Theme = {
  primary: string
  secondary: string
  background: string
  text: string
}

const themes = {
  pink: {
    primary: 'pink',
    secondary: 'pink',
    background: 'pink-50',
    text: 'pink-600'
  },
  purple: {
    primary: 'purple',
    secondary: 'purple',
    background: 'purple-50',
    text: 'purple-600'
  },
  blue: {
    primary: 'blue',
    secondary: 'blue',
    background: 'blue-50',
    text: 'blue-600'
  },
  green: {
    primary: 'green',
    secondary: 'green',
    background: 'green-50',
    text: 'green-600'
  }
}

type ThemeContextType = {
  currentTheme: string
  theme: Theme
  setTheme: (themeName: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('pink')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && themes[savedTheme as keyof typeof themes]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const setTheme = (themeName: string) => {
    if (themes[themeName as keyof typeof themes]) {
      setCurrentTheme(themeName)
      localStorage.setItem('theme', themeName)
    }
  }

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      theme: themes[currentTheme as keyof typeof themes],
      setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
