'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { Minus, Plus, RotateCcw, UserPlus } from 'lucide-react'
import { v2, type Audience } from './content'
import { EASE } from './bits'

// 一天 09:00–19:00，每格 30 分鐘，共 20 格
const UNITS = 20
const MAX_BAYS = 4

type Kind = 'platform' | 'walkin'
type Job = { id: string; bay: number; start: number; units: number; kind: Kind; name: string }

const INITIAL_JOBS: Job[] = [
  { id: 'a', bay: 0, start: 1, units: 3, kind: 'platform', name: '精緻洗車' },
  { id: 'b', bay: 0, start: 8, units: 8, kind: 'platform', name: '奈米鍍膜' },
  { id: 'c', bay: 1, start: 2, units: 4, kind: 'walkin', name: '內裝清潔' },
  { id: 'd', bay: 1, start: 10, units: 2, kind: 'platform', name: '打蠟' },
]
const HOUR_STARTS = Array.from({ length: 10 }, (_, i) => i * 2)

const clock = (unit: number) => {
  const m = 9 * 60 + unit * 30
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}
const hoursText = (units: number) => `${units / 2} 小時`

const fits = (jobs: Job[], bay: number, start: number, units: number) =>
  start + units <= UNITS &&
  !jobs.some((j) => j.bay === bay && start < j.start + j.units && j.start < start + units)

const firstFreeBay = (jobs: Job[], bays: number, start: number, units: number) => {
  for (let bay = 0; bay < bays; bay++) if (fits(jobs, bay, start, units)) return bay
  return -1
}

export function BayScheduler({ audience }: { audience: Audience }) {
  const copy = v2.scheduler[audience]
  const s = v2.scheduler
  const reduced = useReducedMotion()

  const [bays, setBays] = useState(2)
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS)
  const [svcKey, setSvcKey] = useState<string>(s.services[0].key)
  const [freshId, setFreshId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [demoSlot, setDemoSlot] = useState<number | null>(null)
  const touched = useRef(false)
  const nextId = useRef(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.45 })

  const svc = s.services.find((x) => x.key === svcKey) ?? s.services[0]
  const used = jobs.reduce((sum, j) => sum + j.units, 0)
  const utilization = Math.round((used / (bays * UNITS)) * 100)
  const canRemoveBay = bays > 1 && !jobs.some((j) => j.bay === bays - 1)

  const flash = (id: string, text: string) => {
    setFreshId(id)
    setMessage(text)
  }

  const book = (start: number) => {
    const bay = firstFreeBay(jobs, bays, start, svc.units)
    if (bay < 0) return
    const id = `n${nextId.current++}`
    setJobs((list) => [...list, { id, bay, start, units: svc.units, kind: 'platform', name: svc.name }])
    flash(id, audience === 'owner'
      ? s.owner.booked(clock(start), svc.name)
      : s.merchant.booked(clock(start), svc.name, bay + 1))
  }

  // 切換身分時清掉上一個視角的提示文字
  useEffect(() => { setMessage(null) }, [audience])

  const addWalkIn = () => {
    touched.current = true
    const units = 2
    const options: { bay: number; start: number }[] = []
    for (let bay = 0; bay < bays; bay++) {
      for (let start = 0; start + units <= UNITS; start += 2) {
        if (fits(jobs, bay, start, units)) options.push({ bay, start })
      }
    }
    if (!options.length) {
      setMessage('今天的工位已經排滿了')
      return
    }
    const pick = options[Math.floor(Math.random() * options.length)]
    const id = `n${nextId.current++}`
    setJobs((list) => [...list, { id, ...pick, units, kind: 'walkin', name: '現場客' }])
    flash(id, `現場客登記 ${clock(pick.start)}，車主端的時段同步更新`)
  }

  const reset = () => {
    touched.current = true
    setBays(2)
    setJobs(INITIAL_JOBS)
    setFreshId(null)
    setMessage(null)
  }

  // 進到畫面時自動示範一次預約，之後交給使用者操作
  useEffect(() => {
    if (!inView || reduced) return
    const first = HOUR_STARTS.find((h) => firstFreeBay(jobs, bays, h, svc.units) >= 0)
    if (first === undefined) return
    const t1 = window.setTimeout(() => !touched.current && setDemoSlot(first), 700)
    const t2 = window.setTimeout(() => {
      setDemoSlot(null)
      if (!touched.current) book(first)
    }, 1700)
    return () => { window.clearTimeout(t1); window.clearTimeout(t2) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced])

  useEffect(() => {
    if (!freshId) return
    const t = window.setTimeout(() => setFreshId(null), 1600)
    return () => window.clearTimeout(t)
  }, [freshId])

  return (
    <section className={`bs is-${audience}`} id="scheduling" ref={sectionRef}>
      <div className="cx-wrap">
        <div className="bs-layout">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={audience}
            className="bs-head"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p className="cx-eyebrow">{copy.eyebrow}</p>
            <h2 className="bs-title">{copy.title}</h2>
            <p className="bs-sub">{copy.sub}</p>
            {audience === 'owner' && <p className="bs-rule">{copy.rule}</p>}
          </motion.div>
        </AnimatePresence>

        <div className="bs-body">
          {/* 店家端：工位看板（車主模式不顯示） */}
          {audience === 'merchant' && (
          <div className="bs-board">
            <div className="bs-top">
              <div>
                <b>{s.boardTitle}</b>
                <span>{v2.demo.date} 09:00–19:00</span>
              </div>
              <div className="bs-stepper">
                <span>工位數</span>
                <div className="bs-stepper-ctl">
                  <button
                    type="button"
                    aria-label="減少工位"
                    disabled={!canRemoveBay}
                    title={canRemoveBay ? undefined : '最後一個工位上還有預約'}
                    onClick={() => { touched.current = true; setBays((b) => b - 1) }}
                  >
                    <Minus size={14} />
                  </button>
                  <output aria-live="polite">{bays}</output>
                  <button
                    type="button"
                    aria-label="增加工位"
                    disabled={bays >= MAX_BAYS}
                    onClick={() => { touched.current = true; setBays((b) => b + 1) }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bs-util">
              <span>今日利用率</span>
              <b>{utilization}%</b>
              <span className="bs-util-bar">
                <motion.i animate={{ width: `${utilization}%` }} transition={{ duration: 0.6, ease: EASE }} />
              </span>
            </div>

            <div className="bs-scroll">
              <div className="bs-grid">
                <div className="bs-hours" aria-hidden>
                  {HOUR_STARTS.map((h) => <span key={h}>{clock(h).slice(0, 2)}</span>)}
                </div>
                <AnimatePresence initial={false}>
                  {Array.from({ length: bays }, (_, bay) => (
                    <motion.div
                      key={bay}
                      className="bs-row"
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 52, marginBottom: 8 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <span className="bs-bay">工位 {bay + 1}</span>
                      <div className="bs-track">
                        <AnimatePresence initial={false}>
                          {jobs.filter((j) => j.bay === bay).map((j) => (
                            <motion.div
                              key={j.id}
                              className={`bs-job is-${j.kind}${j.id === freshId ? ' is-fresh' : ''}`}
                              style={{
                                left: `calc(${(j.start / UNITS) * 100}% + 2px)`,
                                width: `calc(${(j.units / UNITS) * 100}% - 4px)`,
                              }}
                              initial={{ opacity: 0, y: -16, scale: 0.92 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.92 }}
                              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                              title={`${j.name} ${clock(j.start)}–${clock(j.start + j.units)}`}
                            >
                              <b>{j.name}</b>
                              <span>{clock(j.start)}</span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="bs-foot">
              <div className="bs-legend">
                <span><i className="bs-swatch is-platform" />{s.legend.platform}</span>
                <span><i className="bs-swatch is-walkin" />{s.legend.walkin}</span>
              </div>
              <div className="bs-btns">
                <button type="button" className="bs-btn" onClick={addWalkIn}><UserPlus size={14} />新增現場客</button>
                <button type="button" className="bs-btn bs-btn--text" onClick={reset}><RotateCcw size={13} />重置</button>
              </div>
            </div>
          </div>
          )}

          {/* 車主端：可預約時段 */}
          <div className="bs-panel">
            <span className="bs-kicker">{copy.panelTitle}</span>
            <div className="bs-shop">
              <b>{v2.demo.shop.name}</b>
              <span>{v2.demo.date}</span>
            </div>

            <div className="bs-svcs" role="group" aria-label="選擇服務">
              {s.services.map((x) => (
                <button
                  key={x.key}
                  type="button"
                  className="bs-svc"
                  aria-pressed={x.key === svcKey}
                  onClick={() => { touched.current = true; setSvcKey(x.key) }}
                >
                  {x.name}<em>{hoursText(x.units)}</em>
                </button>
              ))}
            </div>

            <div className="bs-slots">
              {HOUR_STARTS.map((h) => {
                const open = firstFreeBay(jobs, bays, h, svc.units) >= 0
                return (
                  <button
                    key={h}
                    type="button"
                    className={`bs-slot${open ? '' : ' is-full'}${demoSlot === h ? ' is-demo' : ''}`}
                    disabled={!open}
                    onClick={() => { touched.current = true; book(h) }}
                  >
                    <span className="bs-slot-time">{clock(h)}</span>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.em
                        key={open ? 'open' : 'full'}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {open ? '可預約' : '已滿'}
                      </motion.em>
                    </AnimatePresence>
                  </button>
                )
              })}
            </div>

            <p className="bs-hint" aria-live="polite">
              {message ?? (<><i className="bs-dot" />{copy.hint}</>)}
            </p>
          </div>
        </div>
        </div>

        {audience === 'merchant' && <p className="bs-rule">{copy.rule}</p>}
      </div>
    </section>
  )
}
