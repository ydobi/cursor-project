"use client"

import JokeGenerator from '../../components/JokeGenerator'
import NavBar from '../../components/NavBar'

export default function JokesPage() {
  return (
    <div className="min-h-screen bg-pink-50 p-8 pb-24">
      <h1 className="text-3xl font-bold text-pink-600 text-center mb-8">开心一笑</h1>
      <div className="max-w-md mx-auto">
        <JokeGenerator />
      </div>
      <NavBar />
    </div>
  )
}
