import { content } from '@/lib/content'
import { Reveal } from './Reveal'

export function Merchants() {
  const { merchants } = content
  return (
    <section id="merchants" style={{ paddingTop: 0, paddingBottom: 96 }}>
      <div className="wrap">
        <Reveal>
          <div className="merchant-value">
            <div className="eyebrow">{merchants.eyebrow}</div>
            <h2 className="section-title">{merchants.title}</h2>
            <p className="section-sub">{merchants.sub}</p>
            <div className="mv-grid">
              {merchants.cards.map((card, i) => (
                <div key={card.num} className="mv-card">
                  <div className="num-big num">{card.num}</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
