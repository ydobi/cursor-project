"use client"

import { useState } from 'react'

type SweetMessage = {
  id: number
  text: string
}

const sweetMessages: SweetMessage[] = [
  { id: 1, text: '你是我见过最可爱的女孩' },
  { id: 2, text: '今天的你也是那么美' },
  { id: 3, text: '有你的每一天都很特别' },
]

const MessageGenerator = () => {
  const [currentMessage, setCurrentMessage] = useState<SweetMessage>(sweetMessages[0])

  const handleGenerateMessage = () => {
    const randomIndex = Math.floor(Math.random() * sweetMessages.length)
    setCurrentMessage(sweetMessages[randomIndex])
  }

  return (
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
  )
}

export default MessageGenerator
