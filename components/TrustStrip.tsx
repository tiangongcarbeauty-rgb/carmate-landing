'use client'

import { useRef } from 'react'
import { content } from '@/lib/content'
import { useCounter } from '@/hooks/useCounter'

function StatItem({ value, unit, label }: { value: number; unit: string; label: string }) {
  const { value: count, containerRef } = useCounter(value)
  return (
    <div className="stat">
      <div className="n num" ref={containerRef as React.RefObject<HTMLDivElement>}>
        {count.toLocaleString()}
        <span className="unit">{unit}</span>
      </div>
      <div className="l">{label}</div>
    </div>
  )
}

export function TrustStrip() {
  return (
    <div className="strip">
      <div className="wrap strip-inner">
        {content.trust.map((item) => (
          <StatItem key={item.label} value={item.value} unit={item.unit} label={item.label} />
        ))}
      </div>
    </div>
  )
}
