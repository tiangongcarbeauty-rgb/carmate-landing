'use client'

import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { v2, type Audience } from './content'
import { EASE } from './bits'

/** 進入畫面時淡入上移，只播一次 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({ eyebrow, title, sub, center = false }: { eyebrow: string; title: string; sub?: string; center?: boolean }) {
  return (
    <Reveal className={`sx-head${center ? ' is-center' : ''}`}>
      <p className="cx-eyebrow">{eyebrow}</p>
      <h2 className="sx-title">{title}</h2>
      {sub && <p className="sx-sub">{sub}</p>}
    </Reveal>
  )
}

export function Faq({ eyebrow, title, items }: { eyebrow: string; title: string; items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="sx sx-faq">
      <div className="cx-wrap sx-faq-grid">
        <SectionHead eyebrow={eyebrow} title={title} />
        <Reveal className="sx-faq-list">
          {items.map((it, i) => {
            const isOpen = open === i
            return (
              <div key={it.q} className={`sx-faq-item${isOpen ? ' is-open' : ''}`}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                  <span>{it.q}</span>
                  <motion.i animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }}>
                    <Plus size={18} />
                  </motion.i>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="a"
                      className="sx-faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p>{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

export function FooterV2({ onChange }: { onChange: (a: Audience) => void }) {
  const f = v2.footer
  return (
    <footer className="sx-foot">
      <div className="cx-wrap">
        <div className="sx-foot-grid">
          <div className="sx-foot-brand">
            <div className="cx-logo">
              <img src="/carllection-mark.png" alt="" />
              <span className="cx-wordmark">{v2.brand}</span>
            </div>
            <p>{f.tagline}</p>
          </div>

          <div className="sx-foot-col">
            <h4>{f.groups.audience}</h4>
            <button type="button" onClick={() => onChange('owner')}>給車主</button>
            <button type="button" onClick={() => onChange('merchant')}>給店家</button>
          </div>

          <div className="sx-foot-col">
            <h4>{f.groups.contact}</h4>
            {f.contact.map((c) => (
              <a key={c.label} href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {c.label}
              </a>
            ))}
          </div>

          <div className="sx-foot-col">
            <h4>{f.groups.company}</h4>
            <span>{f.company}</span>
            <span>{f.address}</span>
            <a href={f.privacy.href}>{f.privacy.label}</a>
          </div>
        </div>
        <div className="sx-foot-bottom">© 2026 {f.company}</div>
      </div>
    </footer>
  )
}
