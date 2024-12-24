"use client"

import MessageGenerator from '../../components/MessageGenerator'
import NavBar from '../../components/NavBar'

export default function SweetWordsPage() {
  return (
    <div className="min-h-screen bg-pink-50 p-8 pb-24">
      <h1 className="text-3xl font-bold text-pink-600 text-center mb-8">甜言蜜语</h1>
      <div className="max-w-md mx-auto">
        <MessageGenerator />
      </div>
      <NavBar />
    </div>
  )
}
