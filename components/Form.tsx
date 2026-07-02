'use client'

import { useState, Fragment, type FormEvent } from 'react'
import { CheckCircle2, ArrowRight, Check, Sparkles, Wrench, Gauge } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { content } from '@/lib/content'
import { Reveal } from './Reveal'

const SERVICE_ICONS: Record<string, LucideIcon> = { Sparkles, Wrench, Gauge }

type FormState = {
  shop: string
  contact: string
  phone: string
  email: string
  service: string
}
type Errors = Partial<Record<keyof FormState, string>>

const { form } = content

function validate(values: FormState): Errors {
  const errors: Errors = {}
  if (!values.shop.trim())    errors.shop    = form.errors.shopRequired
  if (!values.contact.trim()) errors.contact = form.errors.contactRequired
  if (!values.phone.trim()) {
    errors.phone = form.errors.phoneRequired
  } else if (!/^[\d\s()+-]{8,15}$/.test(values.phone.trim())) {
    errors.phone = form.errors.phoneInvalid
  }
  if (!values.email.trim()) {
    errors.email = form.errors.emailRequired
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = form.errors.emailInvalid
  }
  if (!values.service) errors.service = form.errors.serviceRequired
  return errors
}

export function Form() {
  const [values, setValues]   = useState<FormState>({ shop: '', contact: '', phone: '', email: '', service: '' })
  const [errors, setErrors]   = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [failed, setFailed]   = useState(false)

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: '' }))
  }

  const setPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^\d\s+-]/g, '')
    setValues((prev) => ({ ...prev, phone: v }))
    if (errors.phone) setErrors((er) => ({ ...er, phone: '' }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setFailed(false)

    let ok = false
    try {
      const res = await fetch('/api/recruit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      ok = data.ok === true
    } catch {
      ok = false
    }

    setLoading(false)
    if (ok) {
      setSuccess(true)
    } else {
      setFailed(true)
    }
  }

  const reset = () => {
    setSuccess(false)
    setFailed(false)
    setValues({ shop: '', contact: '', phone: '', email: '', service: '' })
    setErrors({})
  }

  return (
    <section id="form" className="form-section" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="wrap">
        <div className="form-wrap">
          {/* Left: copy */}
          <Reveal>
            <div className="eyebrow eyebrow-dark">{form.eyebrow}</div>
            <h2 className="section-title" style={{ whiteSpace: 'pre-line' }}>{form.title}</h2>
            <p className="section-sub">{form.sub}</p>
            <ul className="form-bullets">
              {form.bullets.map((b) => (
                <li key={b}>
                  <CheckCircle2 size={20} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right: form card */}
          <Reveal>
            <div className="form-card" id="formCard">
              {success ? (
                /* Success state */
                <div className="form-success">
                  <div className="ok"><Check size={36} /></div>
                  <h3>{form.success.title}</h3>
                  <p>{form.success.body}</p>
                  <button
                    type="button"
                    className="submit"
                    style={{ maxWidth: 200, marginTop: 24 }}
                    onClick={reset}
                  >
                    {form.success.back}
                  </button>
                </div>
              ) : (
                /* Form */
                <>
                  <h3>{form.card.title}</h3>
                  <div className="meta">{form.card.note}</div>
                  <form noValidate onSubmit={handleSubmit}>
                    {/* Shop name */}
                    <div className={`field${errors.shop ? ' invalid' : ''}`}>
                      <label>
                        {form.fields.shop.label}<span className="req">＊</span>
                      </label>
                      <input
                        type="text"
                        value={values.shop}
                        onChange={set('shop')}
                        placeholder={form.fields.shop.placeholder}
                        autoComplete={form.fields.shop.autocomplete}
                      />
                      <div className="err">{errors.shop}</div>
                    </div>

                    {/* Contact name */}
                    <div className={`field${errors.contact ? ' invalid' : ''}`}>
                      <label>
                        {form.fields.contact.label}<span className="req">＊</span>
                      </label>
                      <input
                        type="text"
                        value={values.contact}
                        onChange={set('contact')}
                        placeholder={form.fields.contact.placeholder}
                        autoComplete={form.fields.contact.autocomplete}
                      />
                      <div className="err">{errors.contact}</div>
                    </div>

                    {/* Phone */}
                    <div className={`field${errors.phone ? ' invalid' : ''}`}>
                      <label>
                        {form.fields.phone.label}<span className="req">＊</span>
                      </label>
                      <input
                        type="tel"
                        value={values.phone}
                        onChange={setPhone}
                        placeholder={form.fields.phone.placeholder}
                        autoComplete={form.fields.phone.autocomplete}
                      />
                      <div className="err">{errors.phone}</div>
                    </div>

                    {/* Email */}
                    <div className={`field${errors.email ? ' invalid' : ''}`}>
                      <label>
                        {form.fields.email.label}<span className="req">＊</span>
                      </label>
                      <input
                        type="email"
                        value={values.email}
                        onChange={set('email')}
                        placeholder={form.fields.email.placeholder}
                        autoComplete={form.fields.email.autocomplete}
                      />
                      <div className="err">{errors.email}</div>
                    </div>

                    {/* Service type segmented control */}
                    <div className={`field${errors.service ? ' invalid' : ''}`}>
                      <label>
                        {form.fields.service.label}<span className="req">＊</span>
                      </label>
                      <div className="seg" role="radiogroup">
                        {form.fields.service.options.map((opt) => {
                          const Icon = SERVICE_ICONS[opt.icon]
                          const id = `svc-${opt.value}`
                          return (
                            <Fragment key={opt.value}>
                              <input
                                type="radio"
                                name="service"
                                value={opt.value}
                                id={id}
                                checked={values.service === opt.value}
                                onChange={() => {
                                  setValues((v) => ({ ...v, service: opt.value }))
                                  setErrors((er) => ({ ...er, service: '' }))
                                }}
                              />
                              <label htmlFor={id}>
                                {Icon && <Icon size={16} />}
                                {opt.label}
                              </label>
                            </Fragment>
                          )
                        })}
                      </div>
                      <div className="err">{errors.service}</div>
                    </div>

                    <button type="submit" className="submit" disabled={loading}>
                      <span>{loading ? form.submit.loading : form.submit.label}</span>
                      {!loading && <ArrowRight size={16} />}
                    </button>
                    {failed && (
                      <div className="form-fail" role="alert">
                        {form.submitFailed}{' '}
                        <a href={form.fallbackPhone.tel}>{form.fallbackPhone.display}</a>
                      </div>
                    )}
                    <div className="form-foot">{form.consent}</div>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
