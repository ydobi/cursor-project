"use client"

import { useState, useEffect } from 'react'
import { moonshotAPI } from '@/lib/moonshot'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

// 设置名字变量
const BOT_NAME = "凯甲小宝"

// 备用的笑话列表，仅在 API 调用失败时使用
const fallbackJokes = [
  "为什么程序员不喜欢户外？因为外面有太多的 bug。",
  "你知道程序员最浪漫的表白是什么吗？while(true) { love(you); }",
  "程序员最讨厌什么节日？答案是：清明节，因为要扫墓（Debug）。"
]

// 负面情绪关键词
const negativeEmotions = ['不开心', '难过', '伤心', '沮丧', '失落', '焦虑', '烦恼', '生气', '委屈']

// 安慰话语列表
const comfortMessages = [
  `${BOT_NAME}说：别难过，每个人都会有不开心的时候，让我陪你一起度过这个时刻。`,
  `${BOT_NAME}说：生活就像心电图，有起有落才是正常的。记住，明天会更好！`,
  `${BOT_NAME}说：你是最棒的！不开心的事情很快就会过去的。`,
  `${BOT_NAME}说：给你一个大大的拥抱，记住你并不孤单。`,
  `${BOT_NAME}说：不要太在意一时的不开心，让我们一起找找生活中美好的事物吧。`
]

const JokeGenerator = () => {
  const { theme } = useTheme()
  const [currentMessage, setCurrentMessage] = useState<{
    comfort?: string
    joke?: string
  }>({ joke: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [isComforting, setIsComforting] = useState(false)

  // 组件加载时获取初始笑话
  useEffect(() => {
    const initializeJoke = async () => {
      try {
        const joke = await moonshotAPI.chat(
          '请讲一个简短有趣的笑话，要求：1. 内容健康积极 2. 长度在50字以内 3. 要有趣好笑',
          {
            temperature: 0.8,
            max_tokens: 100,
          }
        )
        setCurrentMessage({ joke: joke || getFallbackJoke() })
      } catch (error) {
        console.error('获取初始笑话失败:', error)
        setCurrentMessage({
          joke: getFallbackJoke()
        })
      } finally {
        setIsLoading(false)
      }
    }

    initializeJoke()
  }, [])

  const checkNegativeEmotion = (text: string) => {
    return negativeEmotions.some(emotion => text.includes(emotion))
  }

  const getRandomComfort = () => {
    return comfortMessages[Math.floor(Math.random() * comfortMessages.length)]
  }

  const getFallbackJoke = () => {
    return fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)]
  }

  const fetchContent = async (searchKeyword?: string) => {
    setIsLoading(true)
    try {
      if (searchKeyword && checkNegativeEmotion(searchKeyword)) {
        setIsComforting(true)
        const comfortPrompt = `请以"${BOT_NAME}说："开头，根据用户的心情"${searchKeyword}"，生成一段暖心的安慰话语，要求：1. 语气温暖 2. 长度在50字以内 3. 给予希望和鼓励`
        const [comfort, joke] = await Promise.all([
          moonshotAPI.chat(comfortPrompt, {
            temperature: 0.8,
            max_tokens: 100,
          }),
          moonshotAPI.chat('请讲一个轻松有趣的笑话来让人开心，要求：1. 内容健康积极 2. 长度在50字以内', {
            temperature: 0.8,
            max_tokens: 100,
          })
        ])
        setCurrentMessage({
          comfort: comfort || getRandomComfort(),
          joke: joke || getFallbackJoke()
        })
      } else {
        setIsComforting(false)
        const prompt = searchKeyword
          ? `请讲一个关于"${searchKeyword}"的笑话，要求：1. 内容健康积极 2. 长度在50字以内 3. 要有趣好笑`
          : '请讲一个简短有趣的笑话，要求：1. 内容健康积极 2. 长度在50字以内'

        const joke = await moonshotAPI.chat(prompt, {
          temperature: 0.8,
          max_tokens: 100,
        })
        setCurrentMessage({ joke: joke || getFallbackJoke() })
      }
    } catch (error) {
      console.error('获取内容失败:', error)
      if (isComforting) {
        setCurrentMessage({
          comfort: getRandomComfort(),
          joke: getFallbackJoke()
        })
      } else {
        setCurrentMessage({
          joke: getFallbackJoke()
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      fetchContent(keyword.trim())
      setShowInput(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-semibold text-${theme.text}`}>开心一刻</h2>
        <motion.button
          onClick={() => setShowInput(!showInput)}
          className={`text-${theme.primary}-500 hover:text-${theme.primary}-600`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {showInput ? '×' : '🔍'}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {showInput ? (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="请输入关键词或者当前心情..."
                className={`flex-1 px-3 py-2 border border-${theme.primary}-200 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-${theme.primary}-500
                  text-${theme.primary}-600 placeholder-${theme.primary}-300
                  bg-white/90`}
              />
              <button
                type="submit"
                className={`bg-${theme.primary}-500 hover:bg-${theme.primary}-600 text-white px-4 py-2
                  rounded-md transition-colors disabled:bg-${theme.primary}-300`}
                disabled={!keyword.trim()}
              >
                搜索
              </button>
            </div>
          </motion.form>
        ) : null}
      </AnimatePresence>

      <div className="space-y-4 mb-4">
        {isComforting && currentMessage?.comfort && (
          <div className={`bg-${theme.primary}-100 rounded-lg p-4 min-h-[80px] flex items-center justify-center`}>
            <p className={`text-${theme.primary}-600 text-center font-medium`}>{currentMessage.comfort}</p>
          </div>
        )}

        {!isLoading && (
          <div className={`bg-${theme.primary}-50 rounded-lg p-4 min-h-[80px] flex items-center justify-center`}>
            <p className="text-gray-700 text-center">
              {isComforting && '来听个笑话吧：'}{currentMessage.joke}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => fetchContent(keyword)}
        disabled={isLoading}
        className={`w-full bg-${theme.primary}-500 hover:bg-${theme.primary}-600 disabled:bg-${theme.primary}-300
                 text-white py-2 px-4 rounded-md transition-colors`}
        aria-label={isComforting ? "再来一句暖心话" : "讲个笑话"}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            生成中...
          </span>
        ) : isComforting ? '再来安慰我' : '再来一个'}
      </button>
    </div>
  )
}

export default JokeGenerator
