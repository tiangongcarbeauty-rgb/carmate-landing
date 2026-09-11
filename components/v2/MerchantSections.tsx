'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import {
  ArrowRight, ArrowUpRight, CalendarCheck, Car, Check, Clock, HandCoins, MessageCircle, Plus, RotateCcw,
  Store, Timer, UserX,
} from 'lucide-react'
import { content as legacy } from '@/lib/content'
import { LINE_URL, v2 } from './content'
import { Counter, EASE, fmtPrice } from './bits'
import { Reveal, SectionHead } from './ui'

// ─────────────────────────────── 空檔成本 ───────────────────────────────
export function IdleCost() {
  const d = v2.idle
  const [price, setPrice] = useState<number>(d.calc.price.value)
  const [slots, setSlots] = useState<number>(d.calc.slots.value)
  const weekly = price * slots
  const yearly = weekly * 52

  return (
    <section className="sx" id="idle">
      <div className="cx-wrap">
        <SectionHead eyebrow={d.eyebrow} title={d.title} sub={d.sub} />
        <div className="ic-grid">
          <Reveal className="ic-pains">
            {d.pains.map((p, i) => (
              <div key={p.title} className="ic-pain">
                <em>0{i + 1}</em>
                <div><b>{p.title}</b><span>{p.text}</span></div>
              </div>
            ))}
          </Reveal>

          <Reveal className="ic-calc" delay={0.1}>
            <span className="sx-kicker">空檔損失試算</span>
            <Slider
              label={d.calc.price.label}
              value={price}
              min={d.calc.price.min}
              max={d.calc.price.max}
              step={d.calc.price.step}
              format={(v) => fmtPrice(v)}
              onChange={setPrice}
            />
            <Slider
              label={d.calc.slots.label}
              value={slots}
              min={d.calc.slots.min}
              max={d.calc.slots.max}
              step={d.calc.slots.step}
              format={(v) => `${v} 個`}
              onChange={setSlots}
            />
            <div className="ic-out">
              <span>{d.calc.weekly}</span>
              <b><Counter value={weekly} prefix="NT$" /></b>
            </div>
            <div className="ic-big">
              <span>{d.calc.yearly}</span>
              <b><Counter value={yearly} prefix="NT$" /></b>
            </div>
            <p className="sx-note">{d.calc.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Slider({ label, value, min, max, step, format, onChange }: {
  label: string; value: number; min: number; max: number; step: number
  format: (v: number) => string; onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <label className="ic-slider">
      <span className="ic-slider-top"><span>{label}</span><b>{format(value)}</b></span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--pct': `${pct}%` } as React.CSSProperties}
      />
    </label>
  )
}

// ─────────────────────────────── 店家版 App ───────────────────────────────
export function StoreApp() {
  const s = v2.storeApp
  const widgets: Record<string, React.ReactNode> = {
    hours: <HoursWidget />,
    accept: <AcceptWidget />,
    block: <BlockWidget />,
    private: <PrivateWidget />,
  }
  return (
    <section className="sx" id="store-app">
      <div className="cx-wrap">
        <SectionHead eyebrow={s.eyebrow} title={s.title} sub={s.sub} />
        <div className="sa-grid">
          {s.cards.map((c, i) => (
            <Reveal key={c.key} className="sa-card" delay={i * 0.06}>
              <div className="sa-widget">{widgets[c.key]}</div>
              <div className="sa-copy">
                <b>{c.title}</b>
                <span>{c.text}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const DAYS = ['一', '二', '三', '四', '五', '六', '日']

function HoursWidget() {
  const [open, setOpen] = useState<boolean[]>([false, true, true, true, true, true, true])
  return (
    <div className="sa-hours">
      <div className="sa-days">
        {DAYS.map((d, i) => (
          <button
            key={d}
            type="button"
            className="sa-day"
            aria-pressed={open[i]}
            onClick={() => setOpen((o) => o.map((v, k) => (k === i ? !v : v)))}
          >
            <span>{d}</span>
            <em>{open[i] ? '營業' : '公休'}</em>
          </button>
        ))}
      </div>
      <div className="sa-time"><Clock size={14} />09:00 – 19:00</div>
    </div>
  )
}

function AcceptWidget() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const [state, setState] = useState<'pending' | 'accepted' | 'declined'>('pending')
  const [left, setLeft] = useState(59 * 60 + 59)

  useEffect(() => {
    if (!inView || state !== 'pending') return
    const id = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(id)
  }, [inView, state])

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  return (
    <div className="sa-accept" ref={ref}>
      <div className="sa-order">
        <div className="sa-order-top">
          <b>{v2.demo.pickedSlot}</b>
          {state === 'pending' && <span className="sa-countdown"><Timer size={12} />{mm}:{ss} 後自動取消</span>}
        </div>
        <p>{v2.demo.customer}・{v2.demo.service.name}・{fmtPrice(v2.demo.service.price)}</p>
        <AnimatePresence mode="wait" initial={false}>
          {state === 'pending' ? (
            <motion.div key="btns" className="sa-btns" exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <button type="button" className="sx-btn" onClick={() => setState('declined')}>婉拒</button>
              <button type="button" className="sx-btn is-solid" onClick={() => setState('accepted')}>確認預約</button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              className="sa-result"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <span>{state === 'accepted' ? <><Check size={14} strokeWidth={2.6} />已確認，排入行事曆</> : '已婉拒，車主會收到通知'}</span>
              <button type="button" className="sa-reset" onClick={() => { setState('pending'); setLeft(59 * 60 + 59) }} aria-label="重來">
                <RotateCcw size={13} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function BlockWidget() {
  // 10:00–18:00 每小時一格；true = 已有預約
  const booked = [false, true, true, false, false, true, false, false, false]
  const [blocked, setBlocked] = useState<boolean[]>([false, false, false, false, true, false, false, false, false])
  return (
    <div className="sa-block">
      <div className="sa-cells">
        {booked.map((b, i) => (
          <button
            key={i}
            type="button"
            className={`sa-cell${b ? ' is-booked' : blocked[i] ? ' is-blocked' : ''}`}
            disabled={b}
            aria-label={`${10 + i}:00 ${b ? '已有預約' : blocked[i] ? '已封閉，點擊開放' : '開放中，點擊封閉'}`}
            onClick={() => setBlocked((x) => x.map((v, k) => (k === i ? !v : v)))}
          >
            <span>{10 + i}</span>
          </button>
        ))}
      </div>
      <div className="sa-legend">
        <span><i className="is-booked" />已預約</span>
        <span><i className="is-blocked" />封閉</span>
        <span><i />開放</span>
      </div>
    </div>
  )
}

function PrivateWidget() {
  const [extra, setExtra] = useState(0)
  const rows = [
    { time: '10:00', who: '王小姐', svc: '內裝清潔', kind: 'platform' },
    { time: '13:00', who: '陳先生（熟客）', svc: '精緻洗車', kind: 'walkin' },
    { time: '15:30', who: '林先生', svc: '打蠟', kind: 'platform' },
  ]
  return (
    <div className="sa-private">
      <ul>
        {rows.map((r) => (
          <li key={r.time}>
            <i className={`is-${r.kind}`} />
            <b>{r.time}</b>
            <span>{r.who}・{r.svc}</span>
          </li>
        ))}
        <AnimatePresence initial={false}>
          {Array.from({ length: extra }, (_, k) => (
            <motion.li
              key={k}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <i className="is-walkin" />
              <b>{`${17 + k}:00`}</b>
              <span>現場客・精緻洗車</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <button type="button" className="sx-btn" onClick={() => setExtra((n) => (n >= 2 ? 0 : n + 1))}>
        {extra >= 2 ? <><RotateCcw size={13} />重來</> : <><Plus size={14} />新增現場客</>}
      </button>
    </div>
  )
}

// ─────────────────────────────── 放鳥保護 ───────────────────────────────
const NO_SHOW_ICONS = [CalendarCheck, Clock, UserX, HandCoins]

export function NoShow() {
  const n = v2.noShow
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const [stage, setStage] = useState(-1)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) { setStage(n.steps.length - 1); return }
    setStage(-1)
    const timers = n.steps.map((_, i) => window.setTimeout(() => setStage(i), 300 + i * 900))
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [inView, reduced, run, n.steps])

  return (
    <section className="sx" id="no-show" ref={ref}>
      <div className="cx-wrap">
        <div className="ns-head">
          <SectionHead eyebrow={n.eyebrow} title={n.title} sub={n.sub} />
          <button type="button" className="sx-btn" onClick={() => setRun((r) => r + 1)}><RotateCcw size={13} />{n.replay}</button>
        </div>
        <Reveal className="ns-track">
          <div
            className="ns-line"
            aria-hidden
            style={{ '--p': Math.max(0, stage) / (n.steps.length - 1) } as React.CSSProperties}
          >
            <i />
          </div>
          {n.steps.map((s, i) => {
            const Icon = NO_SHOW_ICONS[i]
            const on = i <= stage
            const last = i === n.steps.length - 1
            return (
              <div key={s.title} className={`ns-step${on ? ' is-on' : ''}${last ? ' is-last' : ''}`}>
                <motion.span
                  className="ns-dot"
                  animate={{ scale: i === stage ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.45 }}
                >
                  <Icon size={20} />
                </motion.span>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </div>
            )
          })}
        </Reveal>
        <p className="sx-note">{n.note}</p>
      </div>
    </section>
  )
}

// ─────────────────────────────── 金流透明 ───────────────────────────────
export function MoneyFlow() {
  const m = v2.money
  return (
    <section className="sx" id="money">
      <div className="cx-wrap">
        <SectionHead eyebrow={m.eyebrow} title={m.title} sub={m.sub} />
        <Reveal className="mf-flow">
          <div className="mf-node"><span className="mf-icon"><Car size={22} /></span><b>{m.nodes.owner}</b></div>
          <div className="mf-link is-main">
            <div className="mf-wire"><i className="mf-dot" /><i className="mf-dot" style={{ animationDelay: '-1.2s' }} /></div>
            <b>{m.flows[0].label}</b><span>{m.flows[0].detail}</span>
          </div>
          <div className="mf-node is-shop"><span className="mf-icon"><Store size={22} /></span><b>{m.nodes.shop}</b></div>
          <div className="mf-link">
            <div className="mf-wire is-dashed"><i className="mf-dot is-small" /></div>
            <b>{m.flows[1].label}</b><span>{m.flows[1].detail}</span>
          </div>
          <div className="mf-node">
            <span className="mf-icon"><img src="/carllection-mark.png" alt="" /></span>
            <b>{m.nodes.platform}</b>
          </div>
        </Reveal>
        <Reveal className="mf-checks" delay={0.1}>
          {m.checks.map((c) => <span key={c}><Check size={16} strokeWidth={2.4} />{c}</span>)}
        </Reveal>
      </div>
    </section>
  )
}

// ─────────────────────────────── 合作方案 ───────────────────────────────
export function Plans() {
  const p = v2.plans
  const total = legacy.recruit.counter.total
  const left = legacy.recruit.counter.left
  const taken = total - left

  return (
    <section className="sx" id="plans">
      <div className="cx-wrap">
        <SectionHead eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
        <div className="pl-grid">
          <Reveal className="pl-table-wrap">
            <table className="pl-table">
              <thead>
                <tr>
                  <th scope="col">{p.columns.item}</th>
                  <th scope="col" className="is-founder">{p.columns.founder}</th>
                  <th scope="col">{p.columns.standard}</th>
                </tr>
              </thead>
              <tbody>
                {p.rows.map((r) => (
                  <tr key={r.item}>
                    <th scope="row">{r.item}</th>
                    <td className="is-founder">{r.founder}</td>
                    <td>{r.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="pl-seats" delay={0.1}>
            <span className="sx-kicker">{p.seatsTitle}</span>
            <b className="pl-seats-count">{p.seatsLeft(left, total)}</b>
            <div className="pl-lot" role="img" aria-label={`創始名額共 ${total} 席，已簽約 ${taken} 席`}>
              {Array.from({ length: total }, (_, i) => (
                <motion.span
                  key={i}
                  className={`pl-stall${i < taken ? ' is-taken' : ''}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.012, duration: 0.3 }}
                >
                  {i < taken && <Car size={12} />}
                </motion.span>
              ))}
            </div>
            <a className="cx-btn cx-btn--primary pl-cta" href="#join">申請創始名額<ArrowRight size={16} /></a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────── 申請入駐 ───────────────────────────────
type FormValues = { shop: string; contact: string; phone: string; email: string; service: string }
type FormErrors = Partial<Record<keyof FormValues, string>>
const EMPTY: FormValues = { shop: '', contact: '', phone: '', email: '', service: '' }

export function JoinForm() {
  const j = v2.join
  const f = j.form
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle')

  const validate = (v: FormValues) => {
    const e: FormErrors = {}
    if (!v.shop.trim()) e.shop = f.errors.shop
    if (!v.contact.trim()) e.contact = f.errors.contact
    if (!v.phone.trim()) e.phone = f.errors.phone
    else if (!/^[\d\s()+-]{8,15}$/.test(v.phone.trim())) e.phone = f.errors.phoneInvalid
    if (!v.email.trim()) e.email = f.errors.email
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = f.errors.emailInvalid
    if (!v.service) e.service = f.errors.service
    return e
  }

  const set = (field: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      const res = await fetch('/api/recruit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      setStatus(data.ok === true ? 'success' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  const fields: { key: 'shop' | 'contact' | 'phone' | 'email'; type: string; auto: string }[] = [
    { key: 'shop', type: 'text', auto: 'organization' },
    { key: 'contact', type: 'text', auto: 'name' },
    { key: 'phone', type: 'tel', auto: 'tel' },
    { key: 'email', type: 'email', auto: 'email' },
  ]

  return (
    <section className="sx jf" id="join">
      <div className="cx-wrap sx-split">
        <div>
          <SectionHead eyebrow={j.eyebrow} title={j.title} sub={j.sub} />
          <Reveal className="jf-steps">
            {j.steps.map((s, i) => (
              <div key={s.title} className="jf-step">
                <em>0{i + 1}</em>
                <div><b>{s.title}</b><span>{s.text}</span></div>
              </div>
            ))}
          </Reveal>
          <a className="jf-line" href={LINE_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} />想先聊聊？{v2.merchantCta.line}<ArrowUpRight size={14} />
          </a>
        </div>

        <Reveal className="jf-card" delay={0.1}>
          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' ? (
              <motion.div
                key="ok"
                className="jf-success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span className="jf-ok"><Check size={28} strokeWidth={2.4} /></span>
                <b>{f.success.title}</b>
                <p>{f.success.body}</p>
                <button type="button" className="sx-btn" onClick={() => { setValues(EMPTY); setStatus('idle') }}>{f.success.back}</button>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0 }}>
                <b className="jf-title">{f.title}</b>
                {fields.map((fd) => (
                  <label key={fd.key} className={`jf-field${errors[fd.key] ? ' is-invalid' : ''}`}>
                    <span>{f[fd.key]}<i>＊</i></span>
                    <input
                      type={fd.type}
                      autoComplete={fd.auto}
                      value={values[fd.key]}
                      onChange={(e) => set(fd.key, fd.key === 'phone' ? e.target.value.replace(/[^\d\s+-]/g, '') : e.target.value)}
                    />
                    <em>{errors[fd.key]}</em>
                  </label>
                ))}

                <div className={`jf-field${errors.service ? ' is-invalid' : ''}`}>
                  <span>{f.service}<i>＊</i></span>
                  <div className="jf-options" role="radiogroup" aria-label={f.service}>
                    {f.options.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        role="radio"
                        aria-checked={values.service === o.value}
                        className="sx-chip"
                        onClick={() => set('service', o.value)}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                  <em>{errors.service}</em>
                </div>

                <button type="submit" className="cx-btn cx-btn--primary jf-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? f.loading : <>{f.submit}<ArrowRight size={16} /></>}
                </button>
                {status === 'failed' && (
                  <p className="jf-fail" role="alert">{f.failed} <a href={f.fallbackPhone.tel}>{f.fallbackPhone.display}</a></p>
                )}
                <p className="jf-consent">{f.consent} <a href="/privacy">{f.privacy}</a>。</p>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
