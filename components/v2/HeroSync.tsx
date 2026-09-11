'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue,
  useReducedMotion, useTransform, type MotionValue,
} from 'motion/react'
import { ArrowRight, CalendarPlus, Pause, Play } from 'lucide-react'
import { v2, type Audience } from './content'
import { PhoneFrame } from './PhoneFrame'
import { OwnerScreen } from './OwnerScreen'
import { MerchantScreen } from './MerchantScreen'
import { EASE } from './bits'

// ── 劇本時間軸（毫秒）──────────────────────────────────────────
// 0 地圖 1 選店 2 預約單 3 送出 4 店家通知 5 店家接單 6 完成
// 車主模式看不到店家畫面，等待確認的時間縮短
const STEP_MS: Record<Audience, number[]> = {
  owner: [1900, 1400, 1900, 700, 900, 900, 3000],
  merchant: [1900, 1400, 1800, 1000, 1700, 1500, 2700],
}
const CHAPTER_STEPS = [[0, 1], [2, 3], [4, 5], [6]]
const chapterOf = (step: number) => CHAPTER_STEPS.findIndex((c) => c.includes(step))

type Timing = { ms: number[]; starts: number[]; total: number }
const makeTiming = (ms: number[]): Timing => ({
  ms,
  starts: ms.map((_, i) => ms.slice(0, i).reduce((a, b) => a + b, 0)),
  total: ms.reduce((a, b) => a + b, 0),
})
const TIMING: Record<Audience, Timing> = { owner: makeTiming(STEP_MS.owner), merchant: makeTiming(STEP_MS.merchant) }
const stepAt = (starts: number[], ms: number) => {
  for (let i = starts.length - 1; i >= 0; i--) if (ms >= starts[i]) return i
  return 0
}

// ── 舞台座標（固定尺寸，再依容器寬度等比縮放）─────────────────────
const WIDE = { w: 1080, h: 720, owner: 130, merchant: 650, single: 390 }
const COMPACT = { w: 380, h: 720 }
const PHONE_W = 300
const PHONE_TOP = 24
// 店家模式：預約卡片從車主的「送出預約」飛到店家的「待接單」
const FLY_PATH = 'M 285 598 C 470 610, 520 330, 800 372'

export function HeroSync({ audience, onSwitch }: { audience: Audience; onSwitch: () => void }) {
  const copy = v2.hero[audience]
  const reduced = useReducedMotion()

  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { amount: 0.25 })
  const [width, setWidth] = useState(0)
  const [userPaused, setUserPaused] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const compact = width > 0 && width < 760
  const running = inView && !userPaused && !hovered && !reduced
  const timing = TIMING[audience]
  const clock = useStoryClock(running, timing)

  // 切換身分時，劇本從頭播
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    clock.jumpTo(reduced ? 6 : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audience])

  // 系統開啟「減少動態效果」時，停在最後完成的畫面
  useEffect(() => {
    if (reduced) clock.jumpTo(6)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  const box = compact ? COMPACT : WIDE
  const scale = width ? Math.min(1, width / box.w) : 1
  const chapter = chapterOf(clock.step)
  const mode = audience === 'owner' ? 'single' : compact ? 'flip' : 'dual'
  // 店家模式窄螢幕只放一支手機：店家處理訂單時翻到店家畫面
  const showMerchantFace = clock.step === 4 || clock.step === 5

  const ownerPhone = (
    <PhoneFrame label="車主 App 示範畫面">
      <Swap k={`o${clock.cycle}`}><OwnerScreen step={clock.step} /></Swap>
    </PhoneFrame>
  )
  const merchantPhone = (
    <PhoneFrame label="店家 App 示範畫面">
      <Swap k={`m${clock.cycle}`}><MerchantScreen step={clock.step} running={running} /></Swap>
    </PhoneFrame>
  )

  return (
    <section className="cx-hero" id="top">
      <div className="cx-wrap">
        <div className="cx-hero-copy">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={audience}
              className="cx-hero-copy-inner"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                show: { transition: { staggerChildren: 0.07 } },
                exit: { transition: { staggerChildren: 0.03 } },
              }}
            >
              <motion.p className="cx-eyebrow" variants={fade}>{copy.eyebrow}</motion.p>
              <h1 className="cx-h1">
                <span className="cx-line cx-line--muted"><motion.span variants={rise}>{copy.line1}</motion.span></span>
                <span className="cx-line"><motion.span variants={rise}>{copy.line2}</motion.span></span>
              </h1>
              <motion.p className="cx-sub" variants={fade}>{copy.sub}</motion.p>
              <motion.div className="cx-actions" variants={fade}>
                <a
                  className="cx-btn cx-btn--primary"
                  href={copy.primary.href}
                  {...(copy.primary.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {copy.primary.label}
                  <ArrowRight size={16} />
                </a>
                <button type="button" className="cx-btn cx-btn--ghost" onClick={onSwitch}>
                  {copy.secondary}
                </button>
              </motion.div>
              <motion.p className="cx-note" variants={fade}>{copy.note}</motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          ref={stageRef}
          className="cx-stage-wrap"
          style={{ height: box.h * scale, opacity: width ? 1 : 0 }}
          onMouseEnter={() => !compact && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="cx-stage" style={{ width: box.w, height: box.h, transform: `translateX(-50%) scale(${scale})` }}>
            <div className="cx-floor" />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${mode}-${compact}`}
                className="cx-layer"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                {mode === 'single' && (
                  <>
                    <div className="cx-phone-slot" style={{ left: (box.w - PHONE_W) / 2, top: PHONE_TOP }}>
                      {ownerPhone}
                      <p className="cx-phone-label">{v2.hero.phoneLabels.owner}</p>
                    </div>
                    {!compact && <Callouts chapter={chapter} />}
                  </>
                )}

                {mode === 'flip' && (
                  <div className="cx-flip" style={{ left: (COMPACT.w - PHONE_W) / 2, top: PHONE_TOP }}>
                    <motion.div
                      className="cx-flip-inner"
                      animate={{ rotateY: showMerchantFace ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    >
                      <div className="cx-face">{ownerPhone}</div>
                      <div className="cx-face cx-face--back">{merchantPhone}</div>
                    </motion.div>
                    <p className="cx-phone-label">
                      {showMerchantFace ? v2.hero.phoneLabels.merchant : v2.hero.phoneLabels.owner}
                    </p>
                  </div>
                )}

                {mode === 'dual' && (
                  <>
                    <div className="cx-phone-slot is-back" style={{ left: WIDE.owner, top: PHONE_TOP }}>
                      {ownerPhone}
                      <p className="cx-phone-label">{v2.hero.phoneLabels.owner}</p>
                    </div>
                    <div className="cx-phone-slot" style={{ left: WIDE.merchant, top: PHONE_TOP }}>
                      {merchantPhone}
                      <p className="cx-phone-label">{v2.hero.phoneLabels.merchant}</p>
                    </div>

                    <svg className="cx-route" width={WIDE.w} height={WIDE.h} aria-hidden>
                      <defs>
                        <clipPath id="cx-gap">
                          <rect x={WIDE.owner + 306} y="0" width={WIDE.merchant - WIDE.owner - 312} height={WIDE.h} />
                        </clipPath>
                      </defs>
                      <motion.path
                        d={FLY_PATH}
                        clipPath="url(#cx-gap)"
                        className="cx-route-line"
                        initial={false}
                        animate={{ pathLength: clock.step >= 3 ? 1 : 0, opacity: clock.step >= 3 ? 1 : 0 }}
                        transition={{ duration: clock.step >= 3 ? 0.8 : 0.3, ease: EASE }}
                      />
                    </svg>

                    {clock.step === 3 && (
                      <div key={`t${clock.cycle}`} className="cx-ticket" style={{ offsetPath: `path("${FLY_PATH}")` }}>
                        <CalendarPlus size={15} />
                        新預約 {v2.demo.pickedSlot}
                      </div>
                    )}
                    {clock.step === 6 && (
                      <span key={`p${clock.cycle}`} className="cx-pulse" style={{ offsetPath: `path("${FLY_PATH}")` }} />
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="cx-story">
          <div className="cx-caption">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`${audience}-${chapter}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {copy.chapters[chapter].caption}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="cx-chapters">
            {copy.chapters.map((c, i) => (
              <button
                key={c.key}
                type="button"
                className={`cx-chapter${i === chapter ? ' is-on' : ''}`}
                onClick={() => clock.jumpTo(CHAPTER_STEPS[i][0])}
                aria-current={i === chapter ? 'step' : undefined}
              >
                <span><em>0{i + 1}</em>{c.label}</span>
                <ChapterTrack elapsed={clock.elapsed} chapter={i} timing={timing} />
              </button>
            ))}
            <button
              type="button"
              className="cx-play"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? '播放示範動畫' : '暫停示範動畫'}
            >
              {userPaused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: EASE } },
}
const rise = {
  hidden: { y: '105%' },
  show: { y: '0%', transition: { duration: 0.75, ease: EASE } },
  exit: { y: '-105%', transition: { duration: 0.3, ease: EASE } },
}

/** 車主模式：手機左右兩側的重點卡，跟著章節換 */
function Callouts({ chapter }: { chapter: number }) {
  const [left, right] = v2.hero.owner.callouts[chapter]
  const side = (dir: 1 | -1) => ({
    hidden: { opacity: 0, x: 16 * dir },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
    exit: { opacity: 0, x: 8 * dir, transition: { duration: 0.2, ease: EASE } },
  })

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={chapter}
        className="cx-callouts"
        initial="hidden"
        animate="show"
        exit="exit"
        variants={{ show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } }}
      >
        <motion.div
          className="cx-callout cx-callout--left"
          style={{ right: WIDE.w - WIDE.single + 44, top: 168 }}
          variants={side(-1)}
        >
          <b>{left.title}</b>
          <span>{left.text}</span>
        </motion.div>
        <motion.div
          className="cx-callout cx-callout--right"
          style={{ left: WIDE.single + PHONE_W + 44, top: 392 }}
          variants={side(1)}
        >
          <b>{right.title}</b>
          <span>{right.text}</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function ChapterTrack({ elapsed, chapter, timing }: { elapsed: MotionValue<number>; chapter: number; timing: Timing }) {
  const steps = CHAPTER_STEPS[chapter]
  const last = steps[steps.length - 1]
  const start = timing.starts[steps[0]]
  const end = timing.starts[last] + timing.ms[last]
  const progress = useTransform(elapsed, (ms) => Math.min(1, Math.max(0, (ms - start) / (end - start))))
  return (
    <i className="cx-track">
      <motion.i style={{ scaleX: progress }} />
    </i>
  )
}

/** 每一輪換一個 key，舊畫面淡出、新畫面淡入 */
function Swap({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={k}
        className="cx-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function useStoryClock(running: boolean, timing: Timing) {
  const timingRef = useRef(timing)
  timingRef.current = timing
  const elapsed = useMotionValue(0)
  const [step, setStep] = useState(0)
  const [cycle, setCycle] = useState(0)
  const stepRef = useRef(0)

  const commit = (next: number) => {
    if (next === stepRef.current) return
    if (next < stepRef.current) setCycle((c) => c + 1) // 往回跳或重播時重新掛載，進場動畫才會再播一次
    stepRef.current = next
    setStep(next)
  }

  useAnimationFrame((_, delta) => {
    if (!running) return
    const t = timingRef.current
    let ms = elapsed.get() + Math.min(delta, 50)
    if (ms >= t.total) ms -= t.total
    elapsed.set(ms)
    commit(stepAt(t.starts, ms))
  })

  const jumpTo = (s: number) => {
    elapsed.set(timingRef.current.starts[s])
    if (s === stepRef.current) setCycle((c) => c + 1)
    commit(s)
  }

  return { step, cycle, elapsed, jumpTo }
}
