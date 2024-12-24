"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'

interface WeatherData {
  temp: number
  description: string
  icon: string
  location: string
}

const getWeatherEmoji = (description: string): string => {
  const weatherMap: { [key: string]: string } = {
    'clear': '☀️',
    'clouds': '☁️',
    'rain': '🌧️',
    'snow': '❄️',
    'thunderstorm': '⛈️',
    'drizzle': '🌦️',
    'mist': '🌫️'
  }

  const key = Object.keys(weatherMap).find(key => description.toLowerCase().includes(key))
  return weatherMap[key || 'clear']
}

const getGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 6) return "夜深了"
  if (hour < 9) return "早安"
  if (hour < 12) return "上午好"
  if (hour < 14) return "午安"
  if (hour < 18) return "下午好"
  if (hour < 22) return "晚上好"
  return "夜深了"
}

export default function DailyGreeting() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      setLoading(true)
      setError('')

      // 获取天气数据
      const { data: weatherData } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      )

      // 获取地理位置名称
      const { data: geoData } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      )

      setWeather({
        temp: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        icon: getWeatherEmoji(weatherData.weather[0].main),
        location: geoData[0]?.local_names?.zh || geoData[0]?.name || '当前位置'
      })
    } catch (error) {
      console.error('Failed to fetch weather:', error)
      setError('获取天气信息失败')
    } finally {
      setLoading(false)
    }
  }

  const getCurrentLocation = () => {
    setLoading(true)
    setError('')

    if (!navigator.geolocation) {
      setError('您的浏览器不支持地理位置功能')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude)
      },
      (err) => {
        console.error('Geolocation error:', err)
        setError('无法获取您的位置，将显示默认位置天气')
        // 使用默认位置（北京）
        fetchWeather(42.2559049, 118.7881407)
      }
    )
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold text-pink-600">
          {getGreeting()}，亲爱的泽宝 💖
        </div>
        <button
          onClick={getCurrentLocation}
          className="text-pink-600 hover:text-pink-700 p-2"
          disabled={loading}
        >
          🔄
        </button>
      </div>

      <div className="space-y-2">
        {loading ? (
          <p className="text-gray-500">正在获取天气信息...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : weather ? (
          <>
            <p className="flex items-center gap-2">
              <span className="text-2xl">{weather.icon}</span>
              <span className="text-gray-700">
                {weather.location}，{weather.temp}°C，{weather.description}
              </span>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              {weather.temp < 15 ? "天气有点凉，要记得多穿点哦！" :
               weather.temp > 30 ? "天气有点热，要记得防晒降温哦！" :
               "今天天气不错，祝你心情愉快！"}
            </p>
          </>
        ) : null}
      </div>
    </div>
  )
}
