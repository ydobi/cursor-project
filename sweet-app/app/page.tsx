"use client"

import MessageGenerator from './components/MessageGenerator'
import VirtualHug from './components/VirtualHug'
import MemoryGame from './components/MemoryGame'
import DateCountdown from './components/DateCountdown'
import JokeGenerator from './components/JokeGenerator'
import NavBar from './components/NavBar'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-pink-50 p-8 pb-24">
      <h1 className="text-3xl font-bold text-pink-600 text-center mb-8">泽宝专属甜心小助手</h1>

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
