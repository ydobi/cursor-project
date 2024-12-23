"use client"

import MessageGenerator from './components/MessageGenerator'
import VirtualHug from './components/VirtualHug'
import MemoryGame from './components/MemoryGame'
import DateCountdown from './components/DateCountdown'
import JokeGenerator from './components/JokeGenerator'
import NavBar from './components/NavBar'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const [showWelcome, setShowWelcome] = useState(true)
  const [welcomeText, setWelcomeText] = useState('')
  const fullText = "咚咚咚~ 👋\n有人在找一个超可爱的小助手吗？\n我是泽宝的专属小助手 —— 凯甲小宝 🌟"

  useEffect(() => {
    let index = 0
    // 打字机效果
    const typingEffect = setInterval(() => {
      if (index < fullText.length) {
        setWelcomeText(prev => prev + fullText.charAt(index))
        index++
      } else {
        clearInterval(typingEffect)
      }
    }, 100)

    // 5秒后隐藏欢迎消息
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 7000)

    return () => {
      clearInterval(typingEffect)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-pink-50 p-8 pb-24">
      {showWelcome && (
        <div className="fixed inset-0 flex items-center justify-center bg-pink-50/95 z-50">
          <div className="text-2xl text-pink-600 font-bold animate-fade-out text-center whitespace-pre-line">
            {welcomeText}
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-pink-600 text-center mb-8">凯甲小宝</h1>

      <div className="max-w-md mx-auto space-y-8">
        <section id="sweet-words">
          <MessageGenerator />
        </section>

        <section id="jokes">
          <JokeGenerator />
        </section>

        <section id="virtual-hug">
          <VirtualHug />
        </section>

        <section id="memory-game">
          <MemoryGame />
        </section>

        <section id="countdown" className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-pink-600 mb-4">重要日期倒计时</h2>
          <div className="space-y-4">
            <DateCountdown date="2024-05-13" event="纪念日" />
          </div>
        </section>
      </div>

      <NavBar />
    </div>
  )
}

export default HomePage
