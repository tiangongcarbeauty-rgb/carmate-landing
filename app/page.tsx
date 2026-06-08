import { Nav }        from '@/components/Nav'
import { Hero }       from '@/components/Hero'
// import { TrustStrip } from '@/components/TrustStrip' // 暫時隱藏
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
        {/* 暫時隱藏：灰色信任條（合作店家遍布全台）。要加回來把下一行解除註解即可 */}
        {/* <TrustStrip /> */}
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
