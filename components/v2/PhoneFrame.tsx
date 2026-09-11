import type { ReactNode } from 'react'

export function PhoneFrame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="cx-phone" role="img" aria-label={label}>
      <div className="cx-screen">
        <div className="cx-island" />
        <StatusBar />
        {children}
        <div className="cx-home" />
      </div>
    </div>
  )
}

function StatusBar() {
  return (
    <div className="cx-status">
      <span className="cx-status-time">9:41</span>
      <span className="cx-status-icons" aria-hidden>
        <svg width="16" height="10" viewBox="0 0 16 10">
          <rect x="0" y="6" width="3" height="4" rx=".8" />
          <rect x="4.3" y="4" width="3" height="6" rx=".8" />
          <rect x="8.6" y="2" width="3" height="8" rx=".8" />
          <rect x="12.9" y="0" width="3" height="10" rx=".8" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10">
          <path d="M7 2.2c2 0 3.8.8 5.1 2.1l1.1-1.1A8.8 8.8 0 0 0 7 .6 8.8 8.8 0 0 0 .8 3.2l1.1 1.1A7.2 7.2 0 0 1 7 2.2Zm0 3.1c1.2 0 2.2.5 3 1.2l1.1-1.1A5.8 5.8 0 0 0 7 3.7c-1.6 0-3 .6-4.1 1.7L4 6.5c.8-.7 1.8-1.2 3-1.2Zm0 3.1c.4 0 .8.2 1 .4L7 9.9 6 8.8c.2-.2.6-.4 1-.4Z" />
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11">
          <rect x=".5" y=".5" width="20" height="10" rx="2.6" fill="none" stroke="currentColor" opacity=".4" />
          <rect x="2" y="2" width="17" height="7" rx="1.6" />
          <path d="M22 3.8v3.4c.7-.3 1.2-1 1.2-1.7s-.5-1.4-1.2-1.7Z" opacity=".45" />
        </svg>
      </span>
    </div>
  )
}
