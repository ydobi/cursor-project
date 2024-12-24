"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useTheme } from '../contexts/ThemeContext'

interface WeatherData {
  temp: number
  description: string
  icon: string
  location: string
}

const ApiKey = '1fb6e7ea6b14ed6d163dc5c1c149615a'

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

const DailyGreeting = () => {
  const { theme } = useTheme()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      setLoading(true)
      setError('')

      // 获取天气数据
      const { data: weatherData } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${ApiKey}&units=metric`
      )

      // 获取地理位置名称
      const { data: geoData } = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${ApiKey}`
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
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-semibold text-${theme.text}`}>今日问候</h2>
        <button
          onClick={getCurrentLocation}
          disabled={loading}
          className={`text-${theme.primary}-500 hover:text-${theme.primary}-600 disabled:text-${theme.primary}-300`}
          aria-label="刷新天气"
        >
          🔄
        </button>
      </div>

      <div className="space-y-4">
        {/* 天气信息 */}
        <div className={`bg-${theme.primary}-50 rounded-lg p-4`}>
          {loading ? (
            <div className="flex justify-center">
              <div className={`animate-spin h-5 w-5 text-${theme.primary}-500`}>
                <svg className="..." xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          ) : weather ? (
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-${theme.primary}-700 font-medium`}>{weather.location}</p>
                <p className="text-gray-600 text-sm">
                  {weather.temp}°C | {weather.description}
                </p>
              </div>
              <div className={`text-${theme.primary}-600 text-2xl`}>
                {getWeatherEmoji(weather.description)}
              </div>
            </div>
          ) : error ? (
            <p className={`text-${theme.primary}-600 text-center`}>
              {error === 'LOCATION_ERROR' ? '无法获取位置信息' : '获取天气信息失败'}
            </p>
          ) : null}
        </div>

        {/* 问候语 */}
        <div className={`bg-${theme.primary}-100 rounded-lg p-4`}>
          <p className={`text-${theme.primary}-700 text-center`}>
            {getGreeting()}，亲爱的！
          </p>
          <p className={`text-${theme.primary}-600 text-center text-sm mt-2`}>
            {weather?.temp < 15 ? "天气有点凉，要记得多穿点哦！" :
             weather?.temp > 30 ? "天气有点热，要记得防晒降温哦！" :
             "今天天气不错，祝你心情愉快！"}
          </p>
        </div>

        {/* 动画提示 */}
        {loading && (
          <div className={`text-${theme.primary}-500 text-center text-sm animate-fade-out`}>
            正在获取位置信息...
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyGreeting
