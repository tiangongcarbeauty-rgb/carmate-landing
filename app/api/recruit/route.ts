import { NextRequest, NextResponse } from 'next/server'

const FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSd4MbS2aPJ9OKXPcGfBcT_XOqYdI7JOrpS5MKBq-AB3BBM6Vw/formResponse'

export async function POST(req: NextRequest) {
  const data = await req.json()
  console.log('[recruit] received:', data)

  const body = new URLSearchParams({
    'entry.479267022': data.shop,
    'entry.730991246': data.contact,
    'entry.1021079948': data.phone,
    'entry.878507940': data.email,
    'entry.473507713': data.service,
  })

  console.log('[recruit] posting to Google Forms:', body.toString())

  let status = 0
  try {
    const res = await fetch(FORM_ACTION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      redirect: 'follow',
    })
    status = res.status
    console.log('[recruit] Google Forms response status:', status)
  } catch (err) {
    console.error('[recruit] fetch error:', err)
  }

  return NextResponse.json({ ok: true, status })
}
