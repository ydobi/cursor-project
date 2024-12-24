"use client"

import FoodSuggestion from '../../components/FoodSuggestion'
import NavBar from '../../components/NavBar'
import { useTheme } from '../../contexts/ThemeContext'

export default function FoodPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen bg-${theme.background} p-8 pb-24`}>
      <h1 className={`text-3xl font-bold text-${theme.text} text-center mb-8`}>今天吃什么</h1>
      <div className="max-w-md mx-auto">
        <FoodSuggestion />
      </div>
      <NavBar />
    </div>
  )
}
