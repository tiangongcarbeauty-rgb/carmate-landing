'use client'

import { useRef, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { content } from '@/lib/content'
import { Reveal } from './Reveal'

export function Recruit() {
  const { recruit } = content
  const { counter } = recruit
  const filled = counter.total - counter.left
  const fillPct = Math.round((filled / counter.total) * 100)
  const footText = `${filled} 間已成功媒合，最後 ${counter.left} 席即將額滿`
  const barRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bar.style.width = `${fillPct}%`
          io.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    io.observe(bar)
    return () => io.disconnect()
  }, [fillPct])

  return (
    <section id="recruit" className="recruit-hero" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="wrap">
        <Reveal>
          <div className="recruit-banner">
            <div className="copy">
              <div className="eyebrow">{recruit.eyebrow}</div>
              <h2>
                前 <strong>50 間</strong> 合作店家，<br />
                <strong>終生免月費</strong>。
              </h2>
              <p>{recruit.body}</p>
              <a href="#form" className="recruit-cta">
                {recruit.cta}
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Counter card */}
            <div className="recruit-counter">
              <div className="l">{counter.label}</div>
              <div className="big num">
                <span>{counter.left}</span>
                <span className="unit">/ {counter.total} 席</span>
              </div>
              <div className="bar">
                <i ref={barRef as React.RefObject<HTMLElement>} style={{ transition: 'width 1.6s cubic-bezier(0.20,0,0.10,1)' }} />
              </div>
              <div className="counter-foot">{footText}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
