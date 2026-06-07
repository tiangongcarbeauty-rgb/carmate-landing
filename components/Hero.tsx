'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import {
  ArrowRight, Sparkles, Wrench, MapPin, Gauge, Gem, UsersRound,
  Search, Bell, User, Car, ChevronDown, ChevronRight,
  Home, CalendarClock, ShoppingBag,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { content } from '@/lib/content'
import { Reveal } from './Reveal'
import { useCounter } from '@/hooks/useCounter'

// Icon lookup map
const ICONS: Record<string, LucideIcon> = {
  Sparkles, Wrench, MapPin, Gauge, Gem, UsersRound,
  Home, CalendarClock, ShoppingBag, User,
}

// ===== Apple SVGs (status bar) =====
function SignalIcon() {
  return (
    <svg width="13" height="9" viewBox="0 0 16 10" fill="currentColor">
      <rect x="0" y="6" width="3" height="4" rx="0.5"/>
      <rect x="4" y="4" width="3" height="6" rx="0.5"/>
      <rect x="8" y="2" width="3" height="8" rx="0.5"/>
      <rect x="12" y="0" width="3" height="10" rx="0.5"/>
    </svg>
  )
}
function WifiIcon() {
  return (
    <svg width="13" height="10" viewBox="0 0 15 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M1 4.2C2.8 2.7 5 1.8 7.5 1.8s4.7.9 6.5 2.4"/>
      <path d="M3.4 6.5c1.2-1 2.5-1.6 4.1-1.6s2.9.6 4.1 1.6"/>
      <circle cx="7.5" cy="9" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="22" height="11" viewBox="0 0 26 12" fill="none">
      <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="currentColor" opacity="0.4"/>
      <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor"/>
      <rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.4"/>
    </svg>
  )
}
function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FCD963' }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

// ===== Simulated phone screen (static) =====
function PhoneScreen() {
  const { phoneScreen } = content.hero
  return (
    <div className="phone-screen">
      <div className="phone-island" />

      {/* Status bar */}
      <div className="phone-status">
        <span>9:41</span>
        <span className="right">
          <SignalIcon />
          <WifiIcon />
          <BatteryIcon />
        </span>
      </div>

      {/* App body */}
      <div className="app">
        <div className="app-scroll">
          {/* Header */}
          <div className="app-h">
            <span className="ttl">{phoneScreen.appName}</span>
            <span className="bell"><Bell size={18} /></span>
          </div>

          {/* Search */}
          <div className="app-search">
            <Search size={14} />
            <span>{phoneScreen.searchPlaceholder}</span>
          </div>

          {/* Login card */}
          <div className="app-login">
            <div className="row1">
              <div className="hi">
                <span className="av"><User size={16} /></span>
                <span>
                  <div className="lg">{phoneScreen.login.title}</div>
                  <div className="sm">{phoneScreen.login.sub}</div>
                </span>
              </div>
              <span className="car-pill">
                <Car size={11} />
                {phoneScreen.login.bindCar}
                <ChevronDown size={10} />
              </span>
            </div>
            <div className="row2">
              <span className="pt">
                <Gem size={11} style={{ color: 'var(--blue-300)' }} />
                {phoneScreen.login.points.label} <b>{phoneScreen.login.points.value}</b>
              </span>
              <span className="lnk">
                {phoneScreen.login.points.cta}
                <ChevronRight size={10} />
              </span>
            </div>
          </div>

          {/* Service tiles */}
          <div className="app-tiles">
            {phoneScreen.tiles.map((tile) => {
              const Icon = ICONS[tile.icon]
              return (
                <div key={tile.label} className="app-tile">
                  <span className="b">{Icon && <Icon size={18} />}</span>
                  <span className="l">{tile.label}</span>
                </div>
              )
            })}
          </div>

          {/* Promo banner */}
          <div className="app-promo">
            <div className="tg">{phoneScreen.promo.tag}</div>
            <h4>{phoneScreen.promo.title}</h4>
            <span className="cta">
              {phoneScreen.promo.cta}
              <ArrowRight size={11} />
            </span>
            <div className="dots">
              <i className="on" /><i /><i />
            </div>
          </div>

          {/* Nearby shops */}
          <div className="app-shops">
            <div className="head">
              <span className="t">{phoneScreen.shops.title}</span>
              <span className="m">{phoneScreen.shops.more}</span>
            </div>
            {phoneScreen.shops.items.map((shop) => (
              <div key={shop.name} className="shop-row">
                <div className="img" />
                <div className="info">
                  <div className="nm">{shop.name}</div>
                  <div className="meta">{shop.meta}</div>
                  <div className="foot">
                    <span className="rt">
                      <StarIcon />
                      <b>{shop.rating.toFixed(1)}</b>
                    </span>
                    <span className="dist">
                      <MapPin size={11} />
                      {shop.distance}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div className="app-tab">
          {phoneScreen.tabBar.map((tab) => {
            const Icon = ICONS[tab.icon]
            return (
              <span key={tab.label} className={`t${tab.active ? ' active' : ''}`}>
                {Icon && <Icon size={18} />}
                {tab.label}
              </span>
            )
          })}
        </div>
        <span className="home-indicator" />
      </div>
    </div>
  )
}

// Chip positions: 6 chips distributed around the phone (top / middle / bottom × left / right)
const CHIP_POS: React.CSSProperties[] = [
  { top: '10%',    left:  '1%',  animationDelay: '-0.2s' },  // 汽車美容  — top-left
  { top: '10%',    right: '1%',  animationDelay: '-1.4s' },  // 保養維修  — top-right
  { top: '44%',    left:  '0%',  animationDelay: '-0.8s' },  // 就近找店  — mid-left
  { top: '44%',    right: '0%',  animationDelay: '-1.8s' },  // 改裝升級  — mid-right
  { bottom: '10%', left:  '1%',  animationDelay: '-1.0s' },  // 點數回饋  — bottom-left
  { bottom: '10%', right: '1%',  animationDelay: '-2.2s' },  // 車友圈   — bottom-right
]

function Chips() {
  const { chips } = content.hero
  return (
    <>
      {chips.map((chip, i) => {
        const Icon = ICONS[chip.icon]
        return (
          <div key={chip.text} className="chip" aria-hidden="true" style={CHIP_POS[i]}>
            <span className="ic">{Icon && <Icon size={14} />}</span>
            <span className="hd">{chip.text}</span>
          </div>
        )
      })}
    </>
  )
}

// ===== Interactive phone stage =====
function PhoneStage() {
  const stageRef = useRef<HTMLDivElement>(null)
  const tiltRef  = useRef<HTMLDivElement>(null)
  const spotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const tilt  = tiltRef.current
    const spot  = spotRef.current
    if (!stage || !tilt || !spot) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const apply = (xPct: number, yPct: number) => {
      const tx = (xPct - 50) * 0.16
      const ty = (50 - yPct) * 0.12
      tilt.style.setProperty('--tx', `${tx.toFixed(2)}deg`)
      tilt.style.setProperty('--ty', `${ty.toFixed(2)}deg`)
      spot.style.setProperty('--mx', `${xPct}%`)
      spot.style.setProperty('--my', `${yPct}%`)
    }

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      apply(
        Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)),
        Math.max(0, Math.min(100, ((e.clientY - r.top)  / r.height) * 100)),
      )
    }
    const onLeave = () => apply(50, 50)

    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    apply(50, 50)

    return () => {
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="hero-visual">
      <div className="phone-stage" ref={stageRef}>
        {/* Rotating dashed rings */}
        <svg className="stage-rings" viewBox="0 0 560 560" aria-hidden="true">
          <circle cx="280" cy="280" r="260" />
          <circle cx="280" cy="280" r="205" />
          <circle cx="280" cy="280" r="150" />
        </svg>

        {/* Cursor spotlight */}
        <div className="stage-spot" ref={spotRef} />

        {/* 3-D tilt wrapper */}
        <div className="stage-tilt" ref={tiltRef}>
          {/* iPhone */}
          <div className="phone" aria-label="Carmate App 預覽">
            <div className="phone-btns-l" aria-hidden="true"><i /><i /><i /></div>
            <div className="phone-btns-r" aria-hidden="true" />
            <div className="phone-frame">
              <PhoneScreen />
            </div>
          </div>
        </div>

        {/* Floating service chips — outside tilt so they stay fixed beside the phone */}
        <Chips />
      </div>
    </div>
  )
}

// ===== Counter stat =====
function HeroStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: count, containerRef } = useCounter(value)
  return (
    <div className="stat">
      <div
        className="n num"
        ref={containerRef as React.RefObject<HTMLDivElement>}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div className="l">{label}</div>
    </div>
  )
}

// ===== App Store / Google Play buttons =====
function AppleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 12.04c-.02-2.79 2.28-4.13 2.38-4.2-1.3-1.9-3.32-2.16-4.04-2.19-1.72-.18-3.36 1.02-4.23 1.02-.88 0-2.22-1-3.65-.97-1.88.03-3.61 1.09-4.58 2.78-1.95 3.38-.5 8.39 1.4 11.13.93 1.34 2.04 2.84 3.49 2.79 1.4-.06 1.93-.91 3.62-.91 1.68 0 2.16.91 3.64.88 1.5-.03 2.45-1.37 3.37-2.71 1.06-1.56 1.5-3.07 1.52-3.15-.03-.01-2.92-1.12-2.92-4.47zM14.32 3.7c.77-.94 1.29-2.24 1.15-3.54-1.11.05-2.46.74-3.26 1.67-.71.82-1.34 2.15-1.17 3.43 1.24.1 2.5-.63 3.28-1.56z"/>
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.6 1.95L13.95 12.3 3.6 22.65c-.42-.27-.6-.78-.6-1.27V3.22c0-.5.18-1 .6-1.27zm11.55 11.55l2.43 2.43-12.27 7.1 9.84-9.53zm3.36-2.4l3.06 1.77c.72.42.72 1.47 0 1.89l-3.06 1.77-2.7-2.71 2.7-2.72zm-3.36-1.2L5.34 1.5l12.27 7.1-2.46 2.4z"/>
    </svg>
  )
}

// ===== Hero section =====
export function Hero() {
  const { hero } = content

  return (
    <div id="top">
      <section className="hero">
        <div className="wrap hero-grid">
          {/* Left: copy */}
          <div className="hero-copy">
            <Reveal>
              <div className="badge-pill">
                <span className="dot num">{hero.badge.number}</span>
                <span>{hero.badge.text}</span>
              </div>
              <h1>
                {hero.headline.line1}<br />
                <span className="accent">{hero.headline.accent}</span>
              </h1>
              <p className="lead">{hero.lead}</p>
              <div className="download-row">
                <a href={hero.appStore.url} className="store-btn" aria-label="App Store 下載">
                  <span className="glyph"><AppleIcon /></span>
                  <span className="lines">
                    <span className="sm">Download on the</span>
                    <span className="lg">App Store</span>
                  </span>
                </a>
                <a href={hero.googlePlay.url} className="store-btn" aria-label="Google Play 下載">
                  <span className="glyph"><PlayIcon /></span>
                  <span className="lines">
                    <span className="sm">GET IT ON</span>
                    <span className="lg">Google Play</span>
                  </span>
                </a>
              </div>
              <div className="hero-stats">
                {hero.stats.map((stat) => (
                  <HeroStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: interactive phone */}
          <PhoneStage />
        </div>
      </section>
    </div>
  )
}
