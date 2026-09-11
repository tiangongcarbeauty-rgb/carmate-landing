'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from 'motion/react'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, CreditCard, MapPin, Plus, Store, Users,
} from 'lucide-react'
import { LINE_URL, v2 } from './content'
import { Counter, EASE, fmtPrice } from './bits'
import { Reveal, SectionHead } from './ui'

type SvcKey = 'wash' | 'wax' | 'interior' | 'coating'
type SortKey = 'distance' | 'price' | 'rating'

// ─────────────────────────────── 價格透明 ───────────────────────────────
export function PriceCompare() {
  const p = v2.price
  const [svc, setSvc] = useState<SvcKey>('wash')
  const [sort, setSort] = useState<SortKey>('distance')

  const rows = [...p.shops].sort((a, b) =>
    sort === 'distance' ? a.km - b.km
      : sort === 'price' ? a.prices[svc] - b.prices[svc]
        : b.rating - a.rating,
  )
  const prices = p.shops.map((s) => s.prices[svc])
  const max = Math.max(...prices)
  const min = Math.min(...prices)

  return (
    <section className="sx" id="price">
      <div className="cx-wrap">
        <SectionHead eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
        <Reveal className="pc-card">
          <div className="pc-controls">
            <div className="pc-chips" role="group" aria-label="選擇服務">
              {p.services.map((s) => (
                <button key={s.key} type="button" className="sx-chip" aria-pressed={svc === s.key} onClick={() => setSvc(s.key)}>
                  {s.name}
                </button>
              ))}
            </div>
            <div className="sx-seg" role="group" aria-label="排序方式">
              {p.sorts.map((s) => (
                <button key={s.key} type="button" aria-pressed={sort === s.key} onClick={() => setSort(s.key)}>
                  {sort === s.key && <motion.span layoutId="pc-sort-thumb" className="sx-seg-thumb" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <span className="sx-seg-label">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <ul className="pc-list">
            {rows.map((s, i) => {
              const price = s.prices[svc]
              return (
                <motion.li key={s.name} layout className="pc-row" transition={{ type: 'spring', stiffness: 380, damping: 36 }}>
                  <span className="pc-rank">{i + 1}</span>
                  <div className="pc-shop">
                    <b>{s.name}{price === min && <em className="pc-tag">最低價</em>}</b>
                    <span>★ {s.rating.toFixed(1)}（{s.reviews}）・{s.km} km</span>
                  </div>
                  <div className="pc-bar" aria-hidden>
                    <motion.i animate={{ width: `${(price / max) * 100}%` }} transition={{ duration: 0.6, ease: EASE }} />
                  </div>
                  <b className="pc-price"><Counter value={price} prefix="NT$" /></b>
                </motion.li>
              )
            })}
          </ul>
          <p className="sx-note">{p.note}</p>
        </Reveal>
      </div>
    </section>
  )
}

// ─────────────────────────────── 到店付款 ───────────────────────────────
export function PayAtStore() {
  const p = v2.pay
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (!inView || reduced || touched) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % p.steps.length), 3200)
    return () => window.clearInterval(id)
  }, [inView, reduced, touched, p.steps.length])

  return (
    <section className="sx" id="pay" ref={ref}>
      <div className="cx-wrap sx-split">
        <div>
          <SectionHead eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
          <Reveal className="sx-steps">
            {p.steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className={`sx-step${i === active ? ' is-on' : ''}`}
                onClick={() => { setTouched(true); setActive(i) }}
              >
                <em>0{i + 1}</em>
                <div><b>{s.title}</b><span>{s.text}</span></div>
              </button>
            ))}
          </Reveal>
          <p className="sx-note">{p.note}</p>
        </div>

        <Reveal className="pay-stage" delay={0.1}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              className="pay-visual"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {active === 0 && <CardVisual />}
              {active === 1 && <ServiceVisual />}
              {active === 2 && <ReceiptVisual />}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}

function CardVisual() {
  return (
    <div className="pay-card-wrap">
      <motion.div
        className="pay-card"
        initial={{ rotateX: 18, rotateY: -22, y: 20 }}
        animate={{ rotateX: 8, rotateY: -12, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="pay-card-sheen" />
        <div className="pay-card-top">
          <span className="pay-chip" />
          <CreditCard size={22} />
        </div>
        <div className="pay-card-num">•••• •••• •••• 4821</div>
        <div className="pay-card-foot"><span>LIN CHIA-HAO</span><span>09 / 29</span></div>
      </motion.div>
      <motion.div
        className="pay-pill"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4, ease: EASE }}
      >
        <Check size={15} strokeWidth={2.6} />信用卡驗證完成
      </motion.div>
    </div>
  )
}

function ServiceVisual() {
  const { demo } = v2
  return (
    <div className="pay-panel">
      <div className="pay-panel-head">
        <span className="pay-icon"><Store size={18} /></span>
        <div><b>{demo.shop.name}</b><span>{demo.date} {demo.pickedSlot}</span></div>
      </div>
      <div className="pay-ring">
        <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden>
          <circle cx="75" cy="75" r="64" className="pay-ring-track" />
          <motion.circle
            cx="75" cy="75" r="64" className="pay-ring-fill"
            initial={{ pathLength: 0 }} animate={{ pathLength: 0.72 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
        </svg>
        <div><b>施工中</b><span>{demo.service.name}・{demo.service.size}</span></div>
      </div>
      <p className="pay-panel-foot">工位已為你保留，到店就能開始</p>
    </div>
  )
}

function ReceiptVisual() {
  const { demo } = v2
  return (
    <div className="pay-panel pay-receipt">
      <span className="sx-kicker">付款明細</span>
      <div className="pay-rows">
        <div><span>服務</span><b>{demo.service.name}・{demo.service.size}</b></div>
        <div><span>店家</span><b>{demo.shop.name}</b></div>
        <div><span>付款方式</span><b>到店付款</b></div>
      </div>
      <div className="pay-total"><span>金額</span><b>{fmtPrice(demo.service.price)}</b></div>
      <motion.div
        className="pay-pill"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: EASE }}
      >
        <Check size={15} strokeWidth={2.6} />直接付給店家，平台不經手
      </motion.div>
    </div>
  )
}

// ─────────────────────────────── 邀請回饋 ───────────────────────────────
// 回饋規則：自己消費得 self%；被你邀請的朋友消費時，朋友得 self%，你另得 referral%
type Spender = 'you' | 'friend'
const RF = { you: { x: 120, y: 104 }, friend: { x: 420, y: 104 }, r: 44, chipY: 206 }
// 消費 → 自己
const P_YOU_SELF = `M ${RF.you.x} ${RF.chipY - 22} L ${RF.you.x} ${RF.you.y + RF.r}`
const P_FRIEND_SELF = `M ${RF.friend.x} ${RF.chipY - 22} L ${RF.friend.x} ${RF.friend.y + RF.r}`
// 朋友消費 → 沿著邀請關係回饋給你
const P_FRIEND_TO_YOU = `M ${RF.friend.x - RF.r} ${RF.friend.y} L ${RF.you.x + RF.r} ${RF.you.y}`
const GAIN_Y = RF.you.y - RF.r - 16

export function Referral() {
  const r = v2.referral
  const [copied, setCopied] = useState(false)
  const [run, setRun] = useState<{ who: Spender; n: number } | null>(null)
  const busy = useRef(false)

  const simulate = (who: Spender) => {
    if (busy.current) return
    busy.current = true
    setRun((prev) => ({ who, n: (prev?.n ?? 0) + 1 }))
    window.setTimeout(() => { busy.current = false }, who === 'friend' ? 2100 : 1300)
  }

  const copy = async () => {
    try { await navigator.clipboard.writeText(r.code) } catch { /* 瀏覽器不允許時只顯示狀態 */ }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section className="sx" id="referral">
      <div className="cx-wrap sx-split">
        <div>
          <SectionHead eyebrow={r.eyebrow} title={r.title} sub={r.sub} />
          <Reveal className="rf-steps">
            {r.steps.map((s, i) => (
              <div key={s} className="rf-step"><em>0{i + 1}</em><span>{s}</span></div>
            ))}
          </Reveal>
          <p className="sx-note">{r.note}</p>
        </div>

        <Reveal className="rf-card" delay={0.1}>
          <div className="rf-code">
            <div><span>你的邀請碼</span><b>{r.code}</b></div>
            <button type="button" className="sx-btn" onClick={copy}>
              {copied ? <><Check size={14} />已複製</> : <><Copy size={14} />複製</>}
            </button>
          </div>

          <svg className="rf-svg" viewBox="0 0 540 250" role="img" aria-label={r.diagramLabel}>
            <path d={P_YOU_SELF} className="rf-path" />
            <path d={P_FRIEND_SELF} className="rf-path" />
            <line x1={RF.you.x + RF.r} y1={RF.you.y} x2={RF.friend.x - RF.r} y2={RF.friend.y} className="rf-link" />
            <text x={(RF.you.x + RF.friend.x) / 2} y={RF.you.y - 12} textAnchor="middle" className="rf-link-label">{r.linkLabel}</text>

            <Node x={RF.you.x} y={RF.you.y} label={r.you} strong />
            <Node x={RF.friend.x} y={RF.friend.y} label={r.friend} />

            {/* 最後一次模擬的消費者會保持亮起；key 變動時重播動畫 */}
            <Chip key={`cy-${run?.who === 'you' ? run.n : 0}`} x={RF.you.x} label={r.chips.you} active={run?.who === 'you'} />
            <Chip key={`cf-${run?.who === 'friend' ? run.n : 0}`} x={RF.friend.x} label={r.chips.friend} active={run?.who === 'friend'} />

            {run && (
              <g key={run.n}>
                {run.who === 'you' ? (
                  <>
                    <Traveler d={P_YOU_SELF} delay={0.25} duration={0.5} />
                    <Gain x={RF.you.x} text={`+${r.rates.self}%`} delay={0.7} />
                  </>
                ) : (
                  <>
                    <Traveler d={P_FRIEND_SELF} delay={0.25} duration={0.5} />
                    <Gain x={RF.friend.x} text={`+${r.rates.self}%`} delay={0.7} />
                    <Traveler d={P_FRIEND_TO_YOU} delay={1.0} duration={0.8} />
                    <Gain x={RF.you.x} text={`+${r.rates.referral}%`} delay={1.75} />
                  </>
                )}
              </g>
            )}
          </svg>

          <div className="rf-actions">
            <button type="button" className="sx-btn rf-btn" onClick={() => simulate('you')}>{r.actions.you}</button>
            <button type="button" className="sx-btn is-solid rf-btn" onClick={() => simulate('friend')}>{r.actions.friend}</button>
          </div>

          <div className="rf-table-wrap">
          <table className="rf-table">
            <thead>
              <tr>
                <th scope="col">{r.table.who}</th>
                <th scope="col">{r.table.you}</th>
                <th scope="col">{r.table.friend}</th>
              </tr>
            </thead>
            <tbody>
              <tr className={run?.who === 'you' ? 'is-on' : undefined}>
                <th scope="row">{r.chips.you}</th>
                <td>{r.rates.self}%</td>
                <td>—</td>
              </tr>
              <tr className={run?.who === 'friend' ? 'is-on' : undefined}>
                <th scope="row">{r.chips.friend}</th>
                <td>{r.rates.referral}%</td>
                <td>{r.rates.self}%</td>
              </tr>
            </tbody>
          </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Node({ x, y, label, strong = false }: { x: number; y: number; label: string; strong?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={RF.r} className={`rf-node${strong ? ' is-strong' : ''}`} />
      <text x={x} y={y + 7} textAnchor="middle" className={`rf-node-label${strong ? ' is-strong' : ''}`}>{label}</text>
    </g>
  )
}

function Chip({ x, label, active }: { x: number; label: string; active: boolean }) {
  return (
    <g className={`rf-chip${active ? ' is-active' : ''}`}>
      <rect x={x - 58} y={RF.chipY - 21} width="116" height="42" rx="21" />
      <text x={x} y={RF.chipY + 5} textAnchor="middle">{label}</text>
    </g>
  )
}

/** 回饋百分比標籤：CSS 動畫淡入後停留，直到下一次模擬 */
function Gain({ x, text, delay }: { x: number; text: string; delay: number }) {
  return (
    <text x={x} y={GAIN_Y} textAnchor="middle" className="rf-gain" style={{ animationDelay: `${delay}s` }}>
      {text}
    </text>
  )
}

function Traveler({ d, delay, duration = 0.75 }: { d: string; delay: number; duration?: number }) {
  const pathRef = useRef<SVGPathElement>(null)
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    const controls = animate(0, 1, {
      delay,
      duration,
      ease: EASE,
      onUpdate: (v) => { const q = path.getPointAtLength(v * len); setPt({ x: q.x, y: q.y }) },
      onComplete: () => setPt(null),
    })
    return () => controls.stop()
  }, [d, delay, duration])

  return (
    <>
      <path ref={pathRef} d={d} fill="none" stroke="none" />
      {pt && <circle cx={pt.x} cy={pt.y} r="7" className="rf-dot" />}
    </>
  )
}

// ─────────────────────────────── 車聚 ───────────────────────────────
export function CarMeets() {
  const m = v2.meets
  const [joined, setJoined] = useState<Record<number, boolean>>({})
  const railRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.querySelector<HTMLElement>('.mt-card')
    rail.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 16), behavior: 'smooth' })
  }

  return (
    <section className="sx" id="meets">
      <div className="cx-wrap mt-head">
        <SectionHead eyebrow={m.eyebrow} title={m.title} sub={m.sub} />
        <div className="mt-arrows">
          <button type="button" className="sx-round" aria-label="上一個活動" onClick={() => scrollBy(-1)}><ArrowLeft size={18} /></button>
          <button type="button" className="sx-round" aria-label="下一個活動" onClick={() => scrollBy(1)}><ArrowRight size={18} /></button>
        </div>
      </div>

      <Reveal>
        <div className="mt-rail" ref={railRef}>
          {m.events.map((e, i) => {
            const on = !!joined[i]
            const count = e.joined + (on ? 1 : 0)
            const full = count >= e.cap && !on
            return (
              <article key={e.title} className="mt-card">
                <div className="mt-top">
                  <svg className="mt-road" viewBox="0 0 320 170" preserveAspectRatio="none" aria-hidden>
                    <path d="M-10 150 C 90 120, 150 60, 330 40" />
                    <path d="M-10 170 C 100 140, 170 90, 330 80" />
                  </svg>
                  <span className="mt-date">{e.date}</span>
                  <h3>{e.title}</h3>
                </div>
                <div className="mt-body">
                  <p className="mt-place"><MapPin size={14} />{e.place}</p>
                  <div className="mt-tags">{e.tags.map((t) => <i key={t}>{t}</i>)}</div>
                  <div className="mt-foot">
                    <div className="mt-people">
                      <div className="mt-avatars">
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              key="me"
                              className="mt-avatar is-me"
                              initial={{ scale: 0, width: 0, marginLeft: 0 }}
                              animate={{ scale: 1, width: 26, marginLeft: -8 }}
                              exit={{ scale: 0, width: 0, marginLeft: 0 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                            >
                              你
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {Array.from({ length: Math.min(e.joined, 4) }, (_, k) => (
                          <span key={k} className="mt-avatar" style={{ opacity: 1 - k * 0.15 }} />
                        ))}
                      </div>
                      <b><Users size={13} /><Counter value={count} /> / {e.cap}</b>
                    </div>
                    <button
                      type="button"
                      className={`mt-join${on ? ' is-on' : ''}`}
                      disabled={full}
                      onClick={() => setJoined((j) => ({ ...j, [i]: !j[i] }))}
                    >
                      {on ? <><Check size={14} strokeWidth={2.6} />已報名</> : full ? '已額滿' : '我要參加'}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
          <article className="mt-card mt-create">
            <span className="sx-round is-static"><Plus size={20} /></span>
            <h3>{m.create.title}</h3>
            <p>{m.create.text}</p>
          </article>
        </div>
      </Reveal>
    </section>
  )
}

// ─────────────────────────────── 結尾行動 ───────────────────────────────
export function OwnerCta() {
  const c = v2.ownerCta
  return (
    <section className="sx sx-cta">
      <div className="cx-wrap">
        <Reveal className="sx-cta-card">
          <div className="sx-cta-copy">
            <h2>{c.title}</h2>
            <p>{c.sub}</p>
            <a className="cx-btn sx-cta-btn" href={LINE_URL} target="_blank" rel="noopener noreferrer">
              {c.button}<ArrowUpRight size={16} />
            </a>
          </div>
          <div className="sx-qr">
            <img src="/line-qr.svg" alt="LINE 官方帳號 QR Code" width={148} height={148} />
            <span>{c.qrLabel}</span>
            <b>{c.lineId}</b>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
