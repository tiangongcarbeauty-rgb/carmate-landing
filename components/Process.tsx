import { FileEdit, BadgeCheck, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { content } from '@/lib/content'
import { Reveal } from './Reveal'

const ICONS: Record<string, LucideIcon> = { FileEdit, BadgeCheck, Rocket }

export function Process() {
  const { process } = content
  return (
    <>
      <a id="faq-anchor" />
      <section style={{ paddingTop: 32, paddingBottom: 96 }}>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">{process.eyebrow}</div>
            <h2 className="section-title">{process.title}</h2>
            <p className="section-sub">{process.sub}</p>
          </Reveal>
          <div className="steps">
            {process.steps.map((step, i) => {
              const Icon = ICONS[step.icon]
              const isLast = i === process.steps.length - 1
              return (
                <Reveal key={step.step} delay={i * 100}>
                  <div className={`step${isLast ? ' step-last' : ''}`}>
                    <div className="ic">{Icon && <Icon size={22} />}</div>
                    <div className="step-num num">{step.step}</div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
