import { Mail, Phone, MapPin } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { content } from '@/lib/content'

const CONTACT_ICONS: Record<string, LucideIcon> = { Mail, Phone, MapPin }

export function Footer() {
  const { footer } = content
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          {/* Brand column */}
          <div className="foot-brand">
            <span className="foot-wordmark">Carmate</span>
            <p>{footer.tagline}</p>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.title} className="foot-col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="foot-col">
            <h4>聯絡我們</h4>
            <ul>
              {footer.contact.map((item) => {
                const Icon = CONTACT_ICONS[item.icon]
                return (
                  <li key={item.value} className="contact-row">
                    {Icon && <Icon size={16} />}
                    <span>{item.value}</span>
                  </li>
                )
              })}
            </ul>
            <div className="foot-social">
              {footer.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="foot-social-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <div>{footer.copy}</div>
          <div className="legal">
            {footer.legal.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
