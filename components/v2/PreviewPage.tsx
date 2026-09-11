'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { v2, type Audience } from './content'
import { NavV2 } from './NavV2'
import { HeroSync } from './HeroSync'
import { BayScheduler } from './BayScheduler'
import { CarMeets, OwnerCta, PayAtStore, PriceCompare, Referral } from './OwnerSections'
import { IdleCost, JoinForm, MoneyFlow, NoShow, Plans, StoreApp } from './MerchantSections'
import { Faq, FooterV2 } from './ui'
import './v2.css'

export function PreviewPage({ initialAudience }: { initialAudience: Audience }) {
  const [audience, setAudience] = useState<Audience>(initialAudience)

  // 身分寫進網址（?for=shop），廣告與業務連結可以直接帶到店家版
  const change = (next: Audience) => {
    if (next === audience) return
    setAudience(next)
    const url = new URL(window.location.href)
    if (next === 'merchant') url.searchParams.set('for', 'shop')
    else url.searchParams.delete('for')
    url.hash = ''
    window.history.replaceState(null, '', url)
    if (window.scrollY > 200) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 舊版網站的招商連結（簡報、QR Code 可能還在用 #form 等）：自動切到店家版並捲到申請表單
  useEffect(() => {
    const legacy = ['#form', '#recruit', '#merchants', '#faq-anchor']
    if (!legacy.includes(window.location.hash)) return
    setAudience('merchant')
    const t = window.setTimeout(() => {
      document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
    }, 600)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="cx" data-theme={audience === 'owner' ? 'light' : 'dark'}>
        <NavV2 audience={audience} onChange={change} />
        <main>
          <HeroSync audience={audience} onSwitch={() => change(audience === 'owner' ? 'merchant' : 'owner')} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={audience}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {audience === 'owner' ? (
                <>
                  <PriceCompare />
                  <BayScheduler audience="owner" />
                  <PayAtStore />
                  <Referral />
                  <CarMeets />
                  <Faq {...v2.ownerFaq} />
                  <OwnerCta />
                </>
              ) : (
                <>
                  <IdleCost />
                  <StoreApp />
                  <BayScheduler audience="merchant" />
                  <NoShow />
                  <MoneyFlow />
                  <Plans />
                  <Faq {...v2.merchantFaq} />
                  <JoinForm />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
        <FooterV2 onChange={change} />
      </div>
    </MotionConfig>
  )
}
