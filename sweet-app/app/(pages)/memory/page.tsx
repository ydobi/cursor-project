"use client"

import MemoryGame from '../../components/MemoryGame'
import NavBar from '../../components/NavBar'

export default function MemoryPage() {
  return (
    <div className="min-h-screen bg-pink-50 p-8 pb-24">
      <h1 className="text-3xl font-bold text-pink-600 text-center mb-8">记忆游戏</h1>
      <div className="max-w-md mx-auto">
        <MemoryGame />
      </div>
      <NavBar />
    </div>
  )
}
