'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  Bell, CalendarDays, Check, Gauge, LayoutGrid, List, Power, Settings, Timer,
} from 'lucide-react'
import { v2 } from './content'
import { Counter, EASE, Tap, fmtPrice } from './bits'

// 劇本步驟：0–3 待機 4 收到預約 5 接單 6 排入今日排程
export function MerchantScreen({ step, running }: { step: number; running: boolean }) {
  const { demo } = v2
  const pending = step === 4 || step === 5
  const accepted = step >= 5
  const revenue = demo.merchantStart.revenue + (accepted ? demo.service.price : 0)
  const orders = demo.merchantStart.orders + (accepted ? 1 : 0)
  const waiting = step === 4 ? 1 : 0

  return (
    <div className="me">
      <div className="me-head">
        <div><span>歡迎回來</span><b>{demo.shop.name}</b></div>
        <div className="me-bell">
          <Bell size={16} />
          <AnimatePresence>
            {pending && (
              <motion.i
                key="badge"
                className="me-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 600, damping: 20, delay: 0.25 }}
              >
                1
              </motion.i>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="me-open">
        <span className="me-open-icon"><Power size={15} /></span>
        <div><b>目前營業中</b><span>點擊切換營業狀態</span></div>
        <span className="me-toggle" />
      </div>

      <div className="me-stats">
        <div className="me-stat"><b><Counter value={revenue} prefix="NT$" /></b><span>今日營收</span></div>
        <div className="me-stat"><b><Counter value={orders} /></b><span>今日訂單</span></div>
        <motion.div
          className="me-stat"
          animate={{ backgroundColor: waiting ? '#0A0A0A' : '#FFFFFF', color: waiting ? '#FFFFFF' : '#0A0A0A' }}
          transition={{ duration: 0.3, delay: waiting ? 0.3 : 0 }}
        >
          <b><Counter value={waiting} /></b><span>待接單</span>
        </motion.div>
      </div>

      <div className="me-sec"><b>待接單</b><span>全部訂單</span></div>
      <div className="me-pending-slot">
        <AnimatePresence mode="wait" initial={false}>
          {pending ? (
            <motion.div
              key="pending"
              className="me-pending"
              initial={{ opacity: 0, y: -14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30, delay: 0.2 }}
            >
              <div className="me-pending-top">
                <b>{demo.pickedSlot}</b>
                {accepted
                  ? <span className="me-chip"><Check size={11} strokeWidth={3} />已確認</span>
                  : <Countdown running={running} />}
              </div>
              <p>{demo.customer} · {demo.service.name} · {demo.service.size} · {fmtPrice(demo.service.price)}</p>
              <AnimatePresence mode="wait" initial={false}>
                {accepted ? (
                  <motion.div
                    key="done"
                    className="me-confirmed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Check size={14} strokeWidth={2.6} />已排入今日行事曆
                  </motion.div>
                ) : (
                  <motion.div key="actions" className="me-actions" exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <span className="me-btn">詳情</span>
                    <motion.span
                      className="me-btn me-btn--dark"
                      animate={{ scale: [1, 1, 0.94, 1] }}
                      transition={{ duration: 1.55, times: [0, 0.8, 0.88, 1] }}
                    >
                      接受訂單
                      <Tap delay={1.25} onDark />
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="me-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              目前沒有待接單
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="me-sec"><b>今日排程</b><span>行事曆</span></div>
      <div className="me-list">
        <div className="me-job">
          <div><b>{demo.existingJob.time}</b><span>{demo.existingJob.who} · {demo.existingJob.service}</span></div>
          <span className="me-chip"><Check size={11} strokeWidth={3} />已確認</span>
        </div>
        <AnimatePresence>
          {step >= 6 && (
            <motion.div
              key="new-job"
              className="me-job is-new"
              initial={{ opacity: 0, y: -10, height: 0, marginTop: -7 }}
              animate={{ opacity: 1, y: 0, height: 'auto', marginTop: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div><b>{demo.newJobTime}</b><span>{demo.customer} · {demo.service.name}</span></div>
              <span className="me-chip"><Check size={11} strokeWidth={3} />已確認</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="me-tabbar">
        <span className="me-tab is-on"><Gauge size={17} />營運</span>
        <span className="me-tab"><List size={17} />訂單</span>
        <span className="me-tab"><CalendarDays size={17} />行事曆</span>
        <span className="me-tab"><LayoutGrid size={17} />工位</span>
        <span className="me-tab"><Settings size={17} />管理</span>
      </div>

      <AnimatePresence>
        {step === 4 && (
          <motion.div
            key="push"
            className="cx-push"
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: [-90, 0, 0, -90], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.6, times: [0, 0.14, 0.72, 1], ease: EASE }}
          >
            <span className="cx-push-icon"><img src="/carllection-mark.png" alt="" /></span>
            <div>
              <b>{v2.brand} 店家版</b>
              <span>新預約：{v2.demo.date} {v2.demo.pickedSlot} {v2.demo.service.name}</span>
            </div>
            <small>現在</small>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Countdown({ running }: { running: boolean }) {
  const [left, setLeft] = useState(59 * 60 + 59)

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => window.clearInterval(id)
  }, [running])

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  return <span className="me-countdown"><Timer size={11} />{mm}:{ss} 後自動取消</span>
}
