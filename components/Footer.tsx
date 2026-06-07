import Image from 'next/image'
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
            <Image src="/carmate-logo.png" alt="Carmate" width={120} height={36} />
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
