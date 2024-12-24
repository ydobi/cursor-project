"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const pathname = usePathname()

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/sweet-words', label: '甜言蜜语', icon: '💝' },
    { path: '/jokes', label: '开心一笑', icon: '😊' },
    { path: '/memory', label: '记忆游戏', icon: '🎮' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center space-y-1 ${
                pathname === item.path ? 'text-pink-600' : 'text-gray-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
