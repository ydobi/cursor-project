"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

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

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('sweet-words')

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-2 hidden md:block">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md transition-colors
              ${activeSection === item.id ? 'bg-pink-100 text-pink-600' : 'hover:bg-pink-50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="hidden lg:inline">{item.title}</span>
          </motion.button>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
