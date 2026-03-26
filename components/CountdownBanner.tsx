'use client'
import { useState, useEffect } from 'react'

interface Props {
  targetDate: string
}

export default function CountdownBanner({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    const target = new Date(targetDate).getTime()
    const tick = () => {
      const now = Date.now()
      const diff = target - now
      if (diff <= 0) {
        setEnded(true)
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="bg-elos-orange px-6 md:px-10 py-3 flex justify-between items-center">
      <span className="text-sm font-medium text-gray-900">
        Red Hat Success Week | 20.–24. dubna 2026
      </span>
      <span className="text-sm font-bold text-gray-900">
        {ended
          ? 'Akce skončila'
          : `${timeLeft.days} dní ${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`
        }
      </span>
    </div>
  )
}
