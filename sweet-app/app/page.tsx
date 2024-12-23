"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import MemoryGame from './components/MemoryGame'

type SweetMessage = {
  id: number
  text: string
}

const sweetMessages: SweetMessage[] = [
  { id: 1, text: '你是我见过最可爱的女孩' },
  { id: 2, text: '今天的你也是那么美' },
  { id: 3, text: '有你的每一天都很特别' },
  // ... 更多甜言蜜语
]

const HomePage = () => {
  const [currentMessage, setCurrentMessage] = useState<SweetMessage>(sweetMessages[0])
  const [isHugging, setIsHugging] = useState(false)

  const handleGenerateMessage = () => {
    const randomIndex = Math.floor(Math.random() * sweetMessages.length)
    setCurrentMessage(sweetMessages[randomIndex])
  }

  const handleVirtualHug = () => {
    setIsHugging(true)
    setTimeout(() => setIsHugging(false), 2000)
  }

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-md mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-pink-600 text-center">专属甜心小助手</h1>

        {/* 甜言蜜语生成器 */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <p className="text-gray-700 text-center mb-4">{currentMessage.text}</p>
          <button
            onClick={handleGenerateMessage}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md transition-colors"
            aria-label="生成新的甜言蜜语"
          >
            再来一句
          </button>
        </div>

        {/* 虚拟抱抱 */}
        <motion.div
          className="bg-white rounded-lg p-6 shadow-md text-center"
          animate={isHugging ? { scale: 1.1 } : { scale: 1 }}
        >
          <button onClick={handleVirtualHug} className="text-4xl" aria-label="发送虚拟抱抱">
            {isHugging ? '🤗' : '🤗'}
          </button>
          <p className="mt-2 text-gray-600">点击发送虚拟抱抱</p>
        </motion.div>

        {/* 记忆配对小游戏 */}
        <MemoryGame />

        {/* 重要日期倒计时 */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-pink-600 mb-4">重要日期倒计时</h2>
          <div className="space-y-4">
            <DateCountdown date="2024-05-13" event="纪念日" />
          </div>
        </div>
      </div>
    </div>
  )
}

type DateCountdownProps = {
  date: string
  event: string
}

const DateCountdown = ({ date, event }: DateCountdownProps) => {
  const getDaysUntil = () => {
    const today = new Date()
    const targetDate = new Date(date)

    // 调整目标日期到当前年份或下一年
    targetDate.setFullYear(today.getFullYear())
    if (targetDate < today) {
      targetDate.setFullYear(today.getFullYear() + 1)
    }

    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="text-center">
      <p className="text-gray-700">距离{event}还有</p>
      <p className="text-3xl font-bold text-pink-500">{getDaysUntil()}天</p>
    </div>
  )
}

export default HomePage
