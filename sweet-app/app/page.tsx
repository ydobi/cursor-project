"use client"

import MessageGenerator from './components/MessageGenerator'
import VirtualHug from './components/VirtualHug'
import MemoryGame from './components/MemoryGame'
import DateCountdown from './components/DateCountdown'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-md mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-pink-600 text-center">泽宝专属甜心小助手</h1>

        {/* 甜言蜜语生成器 */}
        <MessageGenerator />

        {/* 虚拟抱抱 */}
        <VirtualHug />

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

export default HomePage
