"use client"

import { useTheme } from '../contexts/ThemeContext'

type DateCountdownProps = {
  date: string
  event: string
}

const DateCountdown = ({ date, event }: DateCountdownProps) => {
  const { theme } = useTheme()

  const getDaysUntil = () => {
    const today = new Date()
    const targetDate = new Date(date)

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
      <p className={`text-3xl font-bold text-${theme.primary}-500`}>{getDaysUntil()}天</p>
    </div>
  )
}

export default DateCountdown
