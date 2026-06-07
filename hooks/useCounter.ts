'use client'

import { useRef, useEffect, useState } from 'react'

export function useCounter(target: number, duration = 1400) {
  const [value, setValue] = useState(0)
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(target * eased))
          if (p < 1) requestAnimationFrame(tick)
          else setValue(target)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return { value, containerRef }
}
