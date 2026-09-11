'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { v2, type Audience } from './content'
import { EASE } from './bits'

export function NavV2({ audience, onChange }: { audience: Audience; onChange: (a: Audience) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const cta = v2.nav.cta[audience]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`cx-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="cx-nav-inner">
        <a className="cx-logo" href="#top" aria-label={v2.brand}>
          <img src="/carllection-mark.png" alt="" />
          <span className="cx-wordmark">{v2.brand}</span>
        </a>

        <div className="cx-switch" role="group" aria-label="切換身分">
          {(['owner', 'merchant'] as const).map((a) => (
            <button key={a} type="button" aria-pressed={audience === a} onClick={() => onChange(a)}>
              {audience === a && (
                <motion.span
                  layoutId="cx-switch-thumb"
                  className="cx-switch-thumb"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="cx-switch-label">{v2.nav.switch[a]}</span>
            </button>
          ))}
        </div>

        <div className="cx-nav-end">
          <AnimatePresence mode="wait" initial={false}>
            <motion.a
              key={audience}
              className="cx-nav-cta"
              href={cta.href}
              {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {cta.label}
              <ArrowUpRight size={15} />
            </motion.a>
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
