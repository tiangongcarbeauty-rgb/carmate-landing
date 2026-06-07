import { Check, Sparkles } from 'lucide-react'
import { content } from '@/lib/content'
import { Reveal } from './Reveal'

export function Pricing() {
  const { pricing } = content
  return (
    <section style={{ background: 'var(--gray-25)', paddingTop: 96, paddingBottom: 96 }}>
      <div className="wrap">
        <Reveal>
          <div style={{ textAlign: 'center' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>{pricing.eyebrow}</div>
            <h2 className="section-title">{pricing.title}</h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>{pricing.sub}</p>
          </div>
        </Reveal>

        <div className="pricing-grid">
          {pricing.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div className={`price-card${plan.featured ? ' featured' : ''}`}>
                <span className="tag">
                  {plan.featured && <Sparkles size={12} />}
                  {plan.tag}
                </span>
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="cur">{plan.currency}</span>
                  <span className="amt num">{plan.price.toLocaleString()}</span>
                  <span className="per">{plan.per}</span>
                </div>
                <div className="sub">{plan.sub}</div>
                <ul>
                  {plan.features.map((feat) => (
                    <li key={feat}>
                      <Check size={18} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <p className="note">{plan.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
