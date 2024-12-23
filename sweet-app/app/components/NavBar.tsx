"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type NavItem = {
  id: string
  title: string
  icon: string
}

const navItems: NavItem[] = [
  { id: 'sweet-words', title: '甜言蜜语', icon: '💝' },
  { id: 'jokes', title: '开心一刻', icon: '😄' },
  { id: 'virtual-hug', title: '虚拟抱抱', icon: '🤗' },
  { id: 'memory-game', title: '记忆游戏', icon: '🎮' },
  { id: 'countdown', title: '纪念日', icon: '📅' },
]

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('sweet-words')

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* 浮动的切换按钮 - 移到左侧中上方 */}
      <motion.button
        className="fixed left-4 top-24 z-50 bg-pink-500 text-white rounded-full p-3 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? '收起导航' : '展开导航'}
      >
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </motion.button>

      {/* 导航菜单 - 从左侧展开 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed left-16 top-24 z-50 flex flex-col gap-2"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md
                  transition-colors ${
                    activeSection === item.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-pink-100'
                  }`}
                whileHover={{ scale: 1.05, x: 8 }}
                whileTap={{ scale: 0.95 }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: navItems.indexOf(item) * 0.1
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="whitespace-nowrap">{item.title}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavBar
