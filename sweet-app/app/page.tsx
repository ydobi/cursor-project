"use client"

import DateCountdown from './components/DateCountdown'
import DailyGreeting from './components/DailyGreeting'
import NavBar from './components/NavBar'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-pink-50 p-8 pb-24">
      <h1 className="text-3xl font-bold text-pink-600 text-center mb-8">凯甲小宝</h1>

      <div className="max-w-md mx-auto space-y-8">
        <section>
          <DailyGreeting />
        </section>

        <section className="bg-white rounded-lg p-6 shadow-md">
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
