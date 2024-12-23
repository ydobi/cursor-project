"use client"

import { useState } from 'react'
import { moonshotAPI } from '@/lib/moonshot'

// 默认的笑话列表，作为备用
const defaultJokes = [
  "为什么程序员不喜欢户外？因为外面有太多的 bug。",
  "你知道程序员最浪漫的表白是什么吗？while(true) { love(you); }",
  "程序员最讨厌什么节日？答案是：清明节，因为要扫墓（Debug）。"
]

const JokeGenerator = () => {
  const [currentJoke, setCurrentJoke] = useState<string>(defaultJokes[0])
  const [isLoading, setIsLoading] = useState(false)

  const fetchJoke = async () => {
    setIsLoading(true)
    try {
      const joke = await moonshotAPI.chat(
        '请讲一个简短有趣的笑话，要求：1. 内容健康积极 2. 长度在50字以内 3. 最好是程序员相关的笑话',
        {
          temperature: 0.8,
          max_tokens: 100,
        }
      )
      setCurrentJoke(joke)
    } catch (error) {
      console.error('获取笑话失败:', error)
      // 发生错误时使用默认笑话
      const randomJoke = defaultJokes[Math.floor(Math.random() * defaultJokes.length)]
      setCurrentJoke(randomJoke)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-pink-600 mb-4">开心一刻</h2>

      <div className="bg-pink-50 rounded-lg p-4 mb-4 min-h-[80px] flex items-center justify-center">
        <p className="text-gray-700 text-center">{currentJoke}</p>
      </div>

      <button
        onClick={fetchJoke}
        disabled={isLoading}
        className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300
                 text-white py-2 px-4 rounded-md transition-colors"
        aria-label="讲个笑话"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            生成中...
          </span>
        ) : '再来一个'}
      </button>
    </div>
  )
}

export default JokeGenerator
