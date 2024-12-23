"use client"

import { useState } from 'react'
import { moonshotAPI } from '@/lib/moonshot'

type SweetMessage = {
  id: number
  text: string
}

// 默认的甜言蜜语列表，作为备用
const defaultMessages: SweetMessage[] = [
  { id: 1, text: '你是我见过最可爱的女孩' },
  { id: 2, text: '今天的你也是那么美' },
  { id: 3, text: '有你的每一天都很特别' },
]

/**
 * 调用 Moonshot Chat API 获取甜言蜜语
 * @returns Promise<string>
 */
const fetchAIMessage = async (): Promise<string> => {
  try {
    const message = await moonshotAPI.chat('请生成一句浪漫的甜言蜜语，字数在15字以内', {
      temperature: 0.7, // 增加一些随机性
      max_tokens: 50,
    })
    return message
  } catch (error) {
    console.error('获取 AI 消息失败:', error)
    // 发生错误时返回默认消息
    return defaultMessages[Math.floor(Math.random() * defaultMessages.length)].text
  }
}

const MessageGenerator = () => {
  const [currentMessage, setCurrentMessage] = useState<string>(defaultMessages[0].text)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * 处理生成新消息的点击事件
   */
  const handleGenerateMessage = async () => {
    setIsLoading(true)
    try {
      const newMessage = await fetchAIMessage()
      setCurrentMessage(newMessage)
    } catch (error) {
      console.error('生成消息失败:', error)
      // 发生错误时使用默认消息
      const randomMessage = defaultMessages[Math.floor(Math.random() * defaultMessages.length)]
      setCurrentMessage(randomMessage.text)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <p className="text-gray-700 text-center mb-4 min-h-[24px]">
        {currentMessage}
      </p>
      <button
        onClick={handleGenerateMessage}
        disabled={isLoading}
        className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300
                 text-white py-2 px-4 rounded-md transition-colors"
        aria-label="生成新的甜言蜜语"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            生成中...
          </span>
        ) : '再来一句'}
      </button>
    </div>
  )
}

export default MessageGenerator
