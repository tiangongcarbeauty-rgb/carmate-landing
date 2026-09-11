'use client'

import { AnimatePresence, motion } from 'motion/react'
import {
  Check, ChevronRight, Clock, CreditCard, LayoutGrid, List, Map as MapIcon,
  Navigation, Search, SlidersHorizontal, Sparkles, User,
} from 'lucide-react'
import { v2 } from './content'
import { EASE, Tap, fmtPrice } from './bits'

// 劇本步驟：0 地圖 1 選店 2 預約單 3 送出 4 店家通知 5 店家接單 6 完成
const PINS = [
  { x: 58, y: 214 },
  { x: 206, y: 196 },
  { x: 132, y: 292, target: true },
  { x: 224, y: 356 },
  { x: 70, y: 404 },
]

export function OwnerScreen({ step }: { step: number }) {
  const phase = step <= 1 ? 'map' : step === 2 ? 'book' : step <= 5 ? 'wait' : 'done'

  return (
    <div className="ow">
      <MapLayer />

      {PINS.map((p, i) => (
        <motion.div
          key={i}
          className="ow-pin"
          style={{ left: p.x, top: p.y }}
          initial={{ y: -22, opacity: 0 }}
          animate={{
            y: 0,
            opacity: step >= 1 && !p.target ? 0.28 : 1,
            scale: step >= 1 && p.target ? 1.22 : 1,
          }}
          transition={{ type: 'spring', stiffness: 520, damping: 26, delay: step === 0 ? 0.25 + i * 0.1 : 0 }}
        >
          <span className="ow-pin-head"><Sparkles size={12} strokeWidth={2.4} /></span>
        </motion.div>
      ))}
      <span className="ow-me" style={{ left: 150, top: 338 }} />

      <div className="ow-search">
        <div className="ow-search-bar"><Search size={14} />搜尋汽車美容店家…</div>
        <div className="ow-filter"><SlidersHorizontal size={14} /></div>
      </div>
      <div className="ow-chips">
        {['全部', '洗車', '鍍膜', '打蠟', '內裝清潔'].map((c, i) => (
          <span key={c} className={`ow-chip${i === 0 ? ' is-on' : ''}`}>{c}</span>
        ))}
      </div>

      <AnimatePresence>
        {step === 1 && (
          <motion.div
            key="card"
            className="ow-card"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="ow-thumb"><Sparkles size={20} /></div>
            <div className="ow-card-body">
              <b>{v2.demo.shop.name}</b>
              <span>★ {v2.demo.shop.rating} · {v2.demo.shop.distance} · 營業中</span>
              <div className="ow-tags"><i>洗車</i><i>鍍膜</i><i>內裝</i></div>
            </div>
            <ChevronRight size={16} color="#A1A1AA" />
            <Tap delay={0.85} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ow-tabbar">
        <span className="ow-tab is-on"><MapIcon size={17} />探索地圖</span>
        <span className="ow-tab"><List size={17} />店家列表</span>
        <span className="ow-fab"><Navigation size={17} /></span>
        <span className="ow-tab"><LayoutGrid size={17} />更多</span>
        <span className="ow-tab"><User size={17} />個人資料</span>
      </div>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            key="scrim"
            className="ow-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            key="sheet"
            className="ow-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          >
            <div className="ow-handle" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={phase}
                className="ow-sheet-inner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                {phase === 'book' && <BookPhase />}
                {phase === 'wait' && <WaitPhase />}
                {phase === 'done' && <DonePhase />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step === 6 && (
          <motion.div
            key="push"
            className="cx-push"
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: [-90, 0, 0, -90], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2, times: [0, 0.12, 0.8, 1], ease: EASE }}
          >
            <span className="cx-push-icon"><img src="/carllection-mark.png" alt="" /></span>
            <div>
              <b>{v2.brand}</b>
              <span>{v2.demo.shop.name}已確認你的預約</span>
            </div>
            <small>現在</small>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BookPhase() {
  const { demo } = v2
  return (
    <>
      <div className="ow-head">
        <b>{demo.shop.name}</b>
        <span>★ {demo.shop.rating} · {demo.shop.distance}</span>
      </div>

      <div className="ow-label">服務項目</div>
      <div className="ow-svc is-on">
        <div><b>{demo.service.name}・{demo.service.size}</b><span>約 {demo.service.duration}</span></div>
        <b className="ow-price">{fmtPrice(demo.service.price)}</b>
      </div>
      <div className="ow-svc">
        <div><b>{demo.otherService.name}・{demo.otherService.size}</b><span>約 4 小時</span></div>
        <b className="ow-price">{fmtPrice(demo.otherService.price)}</b>
      </div>

      <div className="ow-label">選擇時段 · {demo.date}</div>
      <div className="ow-slots">
        {demo.slots.map((s) => {
          if (s === demo.fullSlot) {
            return <span key={s} className="ow-slot is-full"><s>{s}</s><em>已滿</em></span>
          }
          if (s === demo.pickedSlot) {
            return (
              <motion.span
                key={s}
                className="ow-slot"
                initial={{ backgroundColor: '#FFFFFF', color: '#0A0A0A', borderColor: '#E4E4E7' }}
                animate={{ backgroundColor: '#0A0A0A', color: '#FFFFFF', borderColor: '#0A0A0A' }}
                transition={{ delay: 0.7, duration: 0.2 }}
              >
                {s}
                <Tap delay={0.6} />
              </motion.span>
            )
          }
          return <span key={s} className="ow-slot">{s}</span>
        })}
      </div>

      <div className="ow-pay"><CreditCard size={13} />首次預約驗證信用卡・到店才付款</div>

      <motion.div
        className="ow-cta"
        animate={{ scale: [1, 1, 0.95, 1] }}
        transition={{ duration: 1.75, times: [0, 0.78, 0.86, 1] }}
      >
        送出預約
        <Tap delay={1.35} onDark />
      </motion.div>
    </>
  )
}

function Summary() {
  const { demo } = v2
  return (
    <div className="ow-summary">
      <div><span>店家</span><b>{demo.shop.name}</b></div>
      <div><span>時段</span><b>{demo.date} {demo.pickedSlot}</b></div>
      <div><span>服務</span><b>{demo.service.name}・{demo.service.size}</b></div>
      <div><span>金額</span><b>{fmtPrice(demo.service.price)}・到店付款</b></div>
    </div>
  )
}

function WaitPhase() {
  return (
    <div className="ow-center">
      <div className="ow-wait-icon"><Clock size={24} /></div>
      <b>等待店家確認</b>
      <span>店家確認後，會立即通知你</span>
      <Summary />
    </div>
  )
}

function DonePhase() {
  return (
    <div className="ow-center">
      <svg className="ow-check" width="64" height="64" viewBox="0 0 64 64" aria-hidden>
        <motion.circle
          cx="32" cy="32" r="29" fill="none" stroke="#0A0A0A" strokeWidth="2.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, ease: EASE }}
        />
        <motion.path
          d="M20 33 l8 8 l16 -17" fill="none" stroke="#0A0A0A" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, delay: 0.45, ease: EASE }}
        />
      </svg>
      <b>預約成功</b>
      <span>到店再付款即可</span>
      <Summary />
      <div className="ow-cta ow-cta--ghost"><Check size={14} />加入行事曆</div>
    </div>
  )
}

function MapLayer() {
  return (
    <svg className="ow-map" viewBox="0 0 278 606" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="278" height="606" fill="#EFEFEF" />
      <path d="M-20 470 C 40 440, 90 500, 150 478 S 250 440, 300 470 V 620 H -20 Z" fill="#E5E5E5" />
      <path d="M180 250 h70 v70 h-70z" fill="#E7E7E7" />
      <path d="M-30 150 C 50 190, 90 118, 160 150 S 250 230, 310 196" stroke="#DDDDDD" strokeWidth="20" fill="none" />
      <g stroke="#FFFFFF" fill="none" strokeLinecap="round">
        <path d="M-10 262 L290 236" strokeWidth="9" />
        <path d="M-10 432 L290 400" strokeWidth="7" />
        <path d="M44 -10 L96 620" strokeWidth="7" />
        <path d="M196 -10 L172 620" strokeWidth="9" />
        <path d="M-10 330 L290 318" strokeWidth="3.5" />
        <path d="M-10 540 L290 520" strokeWidth="3.5" />
        <path d="M130 -10 L140 620" strokeWidth="3.5" />
        <path d="M250 -10 L238 620" strokeWidth="3.5" />
        <path d="M-10 190 L120 300" strokeWidth="3" />
      </g>
      <g fill="#ACACAC" fontSize="9" fontWeight="600" letterSpacing="1">
        <text x="14" y="360">中山區</text>
        <text x="208" y="290">松山區</text>
        <text x="150" y="455">大安區</text>
        <text x="220" y="505">信義區</text>
      </g>
    </svg>
  )
}
