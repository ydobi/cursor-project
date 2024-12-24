"use client"

import MemoryGame from '../../components/MemoryGame'
import NavBar from '../../components/NavBar'
import { useTheme } from '../../contexts/ThemeContext'

export default function MemoryPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen bg-${theme.background} p-8 pb-24`}>
      <h1 className={`text-3xl font-bold text-${theme.text} text-center mb-8`}>记忆游戏</h1>
      <div className="max-w-md mx-auto">
        <MemoryGame />
      </div>
      <NavBar />
    </div>
  )
}
