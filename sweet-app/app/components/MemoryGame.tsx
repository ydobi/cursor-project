"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTheme } from '../contexts/ThemeContext'

type Card = {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

// 使用甜蜜主题的表情
const emojis = ['❤️', '🌹', '🎀', '🌸', '💝', '🎵', '🌟', '🦄']

const MemoryGame = () => {
  const { theme } = useTheme()
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matches, setMatches] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [showSuccessImage, setShowSuccessImage] = useState(false)

  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(gameCards)
    setFlippedCards([])
    setMatches(0)
    setMoves(0)
    setShowSuccessImage(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const handleCardClick = (cardId: number) => {
    // 如果已经翻开两张牌或点击的牌已经匹配，则不处理
    if (flippedCards.length === 2 || cards[cardId].isMatched || cards[cardId].isFlipped) return

    const newCards = [...cards]
    newCards[cardId].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)
      const [firstCard, secondCard] = newFlippedCards

      if (cards[firstCard].emoji === cards[secondCard].emoji) {
        // 匹配成功
        newCards[firstCard].isMatched = true
        newCards[secondCard].isMatched = true
        setCards(newCards)
        setFlippedCards([])
        const newMatches = matches + 1
        setMatches(newMatches)

        // 当所有配对都完成时，显示图片
        if (newMatches === 8) {
          setShowSuccessImage(true)
        }
      } else {
        // 匹配失败，1秒后翻回
        setTimeout(() => {
          newCards[firstCard].isFlipped = false
          newCards[secondCard].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="text-center mb-4">
        <h2 className={`text-xl font-semibold text-${theme.text}`}>甜蜜记忆配对</h2>
        <p className="text-gray-600 mt-2">
          步数: {moves} | 配对: {matches}/8
        </p>
        <button
          onClick={initializeGame}
          className={`mt-2 bg-${theme.primary}-500 hover:bg-${theme.primary}-600 text-white py-1 px-4 rounded-md transition-colors`}
          aria-label="重新开始游戏"
        >
          重新开始
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-lg text-2xl flex items-center justify-center cursor-pointer
              ${card.isFlipped || card.isMatched
                ? `bg-${theme.primary}-100`
                : `bg-${theme.primary}-500`
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            aria-label={`记忆卡片 ${card.id + 1}`}
          >
            {(card.isFlipped || card.isMatched) && (
              <span style={{ transform: 'rotateY(180deg)' }}>{card.emoji}</span>
            )}
          </motion.button>
        ))}
      </div>

      {matches === 8 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 space-y-4"
        >
          <p className={`text-center text-${theme.primary}-600 font-semibold`}>
            🎉 恭喜完成！用了 {moves} 步
          </p>

          {showSuccessImage && (
            <div className="relative w-full h-64">
              <Image
                src="/sweet-photo.png"
                alt="完成游戏奖励照片"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default MemoryGame
