"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

const VirtualHug = () => {
  const [isHugging, setIsHugging] = useState(false)

  const handleVirtualHug = () => {
    setIsHugging(true)
    setTimeout(() => setIsHugging(false), 2000)
  }

  return (
    <motion.div
      className="bg-white rounded-lg p-6 shadow-md text-center"
      animate={isHugging ? { scale: 1.1 } : { scale: 1 }}
    >
      <button onClick={handleVirtualHug} className="text-4xl" aria-label="发送虚拟抱抱">
        {isHugging ? '🤗' : '🤗'}
      </button>
      <p className="mt-2 text-gray-600">点击发送虚拟抱抱</p>
    </motion.div>
  )
}

export default VirtualHug
