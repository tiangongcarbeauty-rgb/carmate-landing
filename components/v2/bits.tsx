'use client'

import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

export const EASE = [0.2, 0.8, 0.2, 1] as const

/** 模擬手指點擊的漣漪 */
export function Tap({ delay, onDark = false }: { delay: number; onDark?: boolean }) {
  return (
    <motion.span
      aria-hidden
      className={`cx-tap${onDark ? ' cx-tap--light' : ''}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.9], opacity: [0.85, 0] }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    />
  )
}

/** 數字滾動 */
export function Counter({ value, prefix = '' }: { value: number; prefix?: string }) {
  const mv = useMotionValue(value)
  const text = useTransform(mv, (v) => prefix + Math.round(v).toLocaleString('en-US'))

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.8, ease: EASE })
    return () => controls.stop()
  }, [mv, value])

  return <motion.span>{text}</motion.span>
}

export const fmtPrice = (n: number) => `NT$${n.toLocaleString('en-US')}`
