'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Menu } from 'lucide-react'
import { content } from '@/lib/content'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { nav } = content

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`nav${scrolled ? ' is-scrolled' : ''}`} id="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="brand">
            <Image src="/carmate-logo.png" alt={nav.cta.label} width={120} height={32} priority />
          </a>

          <nav className="nav-links" aria-label="主導覽">
            {nav.links.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href={nav.cta.href} className="nav-cta">
              <span>{nav.cta.label}</span>
              <ArrowRight size={14} />
            </a>
            <button
              className="menu-btn"
              aria-label="選單"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div className={`mobile-sheet${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {nav.links.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
        <a href={nav.cta.href} onClick={closeMenu}>{nav.cta.label}</a>
      </div>
    </>
  )
}
