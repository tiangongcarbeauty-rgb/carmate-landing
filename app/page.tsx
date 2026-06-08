import { Nav }        from '@/components/Nav'
import { Hero }       from '@/components/Hero'
import { TrustStrip } from '@/components/TrustStrip'
import { Owners }     from '@/components/Owners'
import { Merchants }  from '@/components/Merchants'
import { Recruit }    from '@/components/Recruit'
import { Process }    from '@/components/Process'
import { Pricing }    from '@/components/Pricing'
import { Form }       from '@/components/Form'
import { Footer }     from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Owners />
        <Merchants />
        <Recruit />
        <Process />
        <Pricing />
        <Form />
      </main>
      <Footer />
    </>
  )
}
