import { Search, Layers, CalendarClock, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { content } from '@/lib/content'
import { Reveal } from './Reveal'

const ICONS: Record<string, LucideIcon> = { Search, Layers, CalendarClock, UsersRound }

export function Owners() {
  const { owners } = content
  return (
    <section id="owners" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">{owners.eyebrow}</div>
          <h2 className="section-title">{owners.title}</h2>
          <p className="section-sub">{owners.sub}</p>
        </Reveal>
        <div className="features-grid">
          {owners.features.map((feat, i) => {
            const Icon = ICONS[feat.icon]
            return (
              <Reveal key={feat.title} delay={i * 80}>
                <div className="feature-card">
                  <div className="ic">{Icon && <Icon size={22} />}</div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
