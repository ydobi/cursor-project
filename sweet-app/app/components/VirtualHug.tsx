"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * VirtualHug 组件 - 提供虚拟拥抱互动体验
 * 包含触觉反馈和动画效果
 */
const VirtualHug = () => {
  // 控制拥抱动画状态
  const [isHugging, setIsHugging] = useState(false)
  // 控制心形动画显示状态
  const [showHearts, setShowHearts] = useState(false)

  /**
   * 触发设备振动反馈
   * 仅在支持振动API的设备上生效
   */
  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      // 创建温和的振动模式：100ms振动-50ms暂停-100ms振动
      navigator.vibrate([100, 50, 100])
    }
  }

  /**
   * 处理虚拟拥抱点击事件
   * 触发动画、振动反馈，并在2秒后重置状态
   */
  const handleVirtualHug = () => {
    setIsHugging(true)
    setShowHearts(true)
    triggerHapticFeedback()

    // 2秒后重置所有动画状态
    setTimeout(() => {
      setIsHugging(false)
      setShowHearts(false)
    }, 2000)
  }

  /**
   * 心形动画配置
   * 定义心形图案的出现、漂浮和消失动画
   */
  const heartVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [0, 1, 0],      // 淡入淡出效果
      scale: [0, 1.2, 0],      // 缩放效果
      y: [-20, -60],           // 向上漂浮效果
      transition: { duration: 1.5 }
    }
  }

  return (
    <div className="relative">
      {/* 主容器：使用 Framer Motion 实现动画效果 */}
      <motion.div
        className="bg-white rounded-lg p-6 shadow-md text-center"
        animate={isHugging ? {
          scale: [1, 1.2, 1.1],    // 点击时的放大效果
          rotate: [0, 5, -5, 0]     // 轻微摇晃效果
        } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 拥抱按钮 */}
        <button
          onClick={handleVirtualHug}
          className="text-4xl hover:scale-110 transition-transform"
          aria-label="发送虚拟抱抱"
        >
          {isHugging ? '🤗' : '🤗'}
        </button>
        <p className="mt-2 text-gray-600">点击发送虚拟抱抱</p>

        {/* 漂浮的心形动画容器 */}
        <AnimatePresence>
          {showHearts && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              {/* 生成三个心形动画 */}
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  initial="initial"
                  animate="animate"
                  variants={heartVariants}
                  custom={i}
                  style={{
                    left: `${(i - 1) * 20}px`,    // 水平分布心形
                    animationDelay: `${i * 0.2}s`  // 错开动画时间
                  }}
                >
                  ❤️
                </motion.span>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default VirtualHug
