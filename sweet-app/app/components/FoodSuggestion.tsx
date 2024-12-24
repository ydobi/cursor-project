"use client"

import { useState } from 'react'
import { moonshotAPI } from '@/lib/moonshot'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

interface DishSuggestion {
  name: string
  cuisine: string
  description: string
}

interface FoodSuggestion {
  dishes: DishSuggestion[]
  reason?: string
}

// 备用的食物建议
const fallbackSuggestions = [
  {
    dishes: [
      { name: '宫保鸡丁', cuisine: '川菜', description: '经典川菜，口感麻辣鲜香' },
      { name: '鱼香肉丝', cuisine: '川菜', description: '开胃下饭，酸甜可口' }
    ],
    reason: '推荐川菜，开胃爽口，适合日常用餐'
  },
  {
    dishes: [
      { name: '红烧狮子头', cuisine: '苏菜', description: '肉质鲜嫩，口感细腻' },
      { name: '阳春面', cuisine: '苏菜', description: '清淡爽口，简单美味' }
    ],
    reason: '推荐江苏菜系，清淡可口，适合日常食用'
  }
]

// 添加菜系常量
const CUISINES = [
  '川菜', '粤菜', '苏菜', '浙菜', '鲁菜',
  '湘菜', '闽菜', '徽菜', '东北菜', '本帮菜'
]

export default function FoodSuggestion() {
  const { theme } = useTheme()
  const [suggestion, setSuggestion] = useState<FoodSuggestion | null>(null)
  const [loading, setLoading] = useState(false)
  const [customInput, setCustomInput] = useState('')

  const categories = [
    { label: '随机推荐', prompt: '随机推荐', icon: '🎲' },  // 添加随机选项
    { label: '家常菜', prompt: '推荐2-3个家常菜' },
    { label: '川菜', prompt: '推荐2-3个川菜' },
    { label: '粤菜', prompt: '推荐2-3个粤菜' },
    { label: '东北菜', prompt: '推荐2-3个东北菜' },
    { label: '江浙菜', prompt: '推荐2-3个江浙菜' },
    { label: '面食', prompt: '推荐2-3个面食' }
  ]

  const getFallbackSuggestion = () => {
    return fallbackSuggestions[Math.floor(Math.random() * fallbackSuggestions.length)]
  }

  const getSuggestion = async (prompt: string) => {
    setLoading(true)
    try {
      const response = await moonshotAPI.chat(
        `${prompt}，请按以下格式回复：
        菜品1名称|菜系|特色描述
        菜品2名称|菜系|特色描述
        菜品3名称|菜系|特色描述
        推荐理由：xxx`,
        {
          temperature: 0.8,
          max_tokens: 200,
        }
      )

      if (response) {
        const lines = response.split('\n').filter(line => line.trim())
        const dishes: DishSuggestion[] = []
        let reason = ''

        lines.forEach(line => {
          if (line.startsWith('推荐理由：')) {
            reason = line.replace('推荐理由：', '').trim()
          } else {
            const [name, cuisine, description] = line.split('|').map(s => s.trim())
            if (name && cuisine && description) {
              dishes.push({ name, cuisine, description })
            }
          }
        })

        setSuggestion({
          dishes,
          reason
        })
      } else {
        setSuggestion(getFallbackSuggestion())
      }
    } catch (error) {
      console.error('Failed to get food suggestion:', error)
      setSuggestion(getFallbackSuggestion())
    } finally {
      setLoading(false)
    }
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (customInput.trim()) {
      getSuggestion(`考虑到以下需求：${customInput}，请推荐2-3个合适的菜品`)
      setCustomInput('')
    }
  }

  // 添加随机推荐函数
  const getRandomSuggestion = () => {
    const randomCuisines = CUISINES
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .join('或')

    return getSuggestion(`随机推荐2-3个${randomCuisines}菜系的特色菜品`)
  }

  // 修改按钮点击处理函数
  const handleCategoryClick = (category: typeof categories[0]) => {
    if (category.label === '随机推荐') {
      getRandomSuggestion()
    } else {
      getSuggestion(category.prompt)
    }
  }

  return (
    <div className="space-y-6">
      {/* 快速选择区 */}
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <motion.button
            key={category.label}
            onClick={() => handleCategoryClick(category)}
            disabled={loading}
            className={`py-2 px-4 rounded-lg transition-colors disabled:opacity-50 ${
              category.label === '随机推荐'
                ? `bg-gradient-to-r from-${theme.primary}-400 to-${theme.primary}-500 text-white hover:from-${theme.primary}-500 hover:to-${theme.primary}-600`
                : `bg-${theme.primary}-100 hover:bg-${theme.primary}-200 text-${theme.primary}-700`
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-1">
              {category.icon && <span>{category.icon}</span>}
              {category.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* 自定义输入区 */}
      <form onSubmit={handleCustomSubmit} className="space-y-3">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="输入特殊需求，例如：想吃辣的、清淡的..."
          className={`w-full px-4 py-2 rounded-lg border border-${theme.primary}-200 focus:outline-none focus:border-${theme.primary}-500`}
        />
        <motion.button
          type="submit"
          disabled={loading || !customInput.trim()}
          className={`w-full bg-${theme.primary}-500 hover:bg-${theme.primary}-600 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          获取建议
        </motion.button>
      </form>

      {/* 建议显示区 */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 py-8"
          >
            <div className="flex items-center justify-center">
              <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 text-${theme.primary}-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              思考中...
            </div>
          </motion.div>
        ) : suggestion ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-4 rounded-lg shadow-md space-y-4"
          >
            <div className="space-y-3">
              {suggestion.dishes.map((dish, index) => (
                <div key={index} className={`border-b border-${theme.primary}-100 last:border-0 pb-2 last:pb-0`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-bold text-${theme.primary}-600`}>{dish.name}</span>
                    <span className={`text-sm text-${theme.primary}-400 bg-${theme.primary}-50 px-2 py-1 rounded`}>
                      {dish.cuisine}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{dish.description}</p>
                </div>
              ))}
            </div>
            {suggestion.reason && (
              <div className={`text-gray-600 text-sm pt-2 border-t border-${theme.primary}-100`}>
                推荐理由：{suggestion.reason}
              </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
