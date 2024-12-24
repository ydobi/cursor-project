"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const themes = [
  { name: 'pink', emoji: '🌸', label: '粉色' },
  { name: 'purple', emoji: '🍇', label: '紫色' },
  { name: 'blue', emoji: '🌊', label: '蓝色' },
  { name: 'green', emoji: '🌿', label: '绿色' },
]

export default function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const toggleExpand = () => setIsExpanded(!isExpanded)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 left-4 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg"
            animate={{ width: isExpanded ? 'auto' : '40px' }}
          >
            <div className="p-2">
              <div className="flex items-center">
                <motion.button
                  onClick={toggleExpand}
                  className={`p-2 rounded-lg text-${currentTheme}-600 hover:bg-${currentTheme}-50`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isExpanded ? '×' : '🎨'}
                </motion.button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="flex gap-1 ml-1"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      {themes.map((theme) => (
                        <motion.button
                          key={theme.name}
                          onClick={() => setTheme(theme.name)}
                          className={`p-2 rounded-lg ${
                            currentTheme === theme.name
                              ? `bg-${theme.name}-100 text-${theme.name}-600`
                              : 'hover:bg-gray-100'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          title={theme.label}
                        >
                          {theme.emoji}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* 隐藏按钮 */}
          <motion.button
            onClick={toggleVisibility}
            className={`mt-2 p-1 rounded-lg bg-white shadow-lg text-${currentTheme}-600
              hover:bg-${currentTheme}-50 text-xs w-full`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            隐藏
          </motion.button>
        </motion.div>
      )}

      {/* 显示按钮 */}
      {!isVisible && (
        <motion.button
          onClick={toggleVisibility}
          className={`fixed top-2 left-2 z-50 p-2 rounded-lg bg-white shadow-lg
            text-${currentTheme}-600 hover:bg-${currentTheme}-50`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          🎨
        </motion.button>
      )}
    </AnimatePresence>
  )
}
