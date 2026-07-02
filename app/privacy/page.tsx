import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '隱私權政策｜Carmate',
  description: 'Carmate 隱私權政策：說明我們如何蒐集、使用與保護您的個人資料。',
  robots: { index: true, follow: true },
}

const S: Record<string, React.CSSProperties> = {
  page: { maxWidth: 720, margin: '0 auto', padding: '64px 24px 96px', lineHeight: 1.8 },
  back: { display: 'inline-block', marginBottom: 32, fontSize: 14, color: '#0090EE', textDecoration: 'none' },
  h1: { fontSize: 32, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' },
  updated: { fontSize: 13, color: '#888', marginBottom: 40 },
  h2: { fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 12 },
  p: { fontSize: 15, color: '#444', marginBottom: 12 },
  ul: { fontSize: 15, color: '#444', paddingLeft: 24, marginBottom: 12 },
}

export default function PrivacyPage() {
  return (
    <main style={S.page}>
      <Link href="/" style={S.back}>← 回到首頁</Link>
      <h1 style={S.h1}>隱私權政策</h1>
      <div style={S.updated}>最後更新日期：2026 年 7 月 2 日</div>

      <p style={S.p}>
        俥盛科技有限公司（以下簡稱「本公司」）經營 Carmate 網站（tgcarauto.com，以下簡稱「本網站」）。
        本公司重視您的個人資料保護，依據中華民國《個人資料保護法》訂定本隱私權政策，
        說明本網站如何蒐集、處理及利用您的個人資料。
      </p>

      <h2 style={S.h2}>一、蒐集之個人資料項目</h2>
      <p style={S.p}>當您透過本網站「店家入駐申請」表單與我們聯繫時，我們會蒐集以下資料：</p>
      <ul style={S.ul}>
        <li>店家名稱</li>
        <li>聯絡人姓名</li>
        <li>手機號碼</li>
        <li>電子郵件信箱</li>
        <li>主要服務類型</li>
      </ul>

      <h2 style={S.h2}>二、蒐集目的與利用方式</h2>
      <p style={S.p}>您提供的資料僅用於以下目的：</p>
      <ul style={S.ul}>
        <li>由本公司商務專員與您聯繫，說明店家入駐合作事宜</li>
        <li>入駐申請之審核與後續合作流程處理</li>
      </ul>
      <p style={S.p}>
        本公司不會將您的個人資料出售、出租或以其他方式提供予無關之第三人。
      </p>

      <h2 style={S.h2}>三、資料保存與安全</h2>
      <p style={S.p}>
        您的資料儲存於本公司使用之雲端服務（Google 表單／試算表），僅限本公司授權人員存取。
        資料保存至合作關係終止或您要求刪除為止。
      </p>

      <h2 style={S.h2}>四、您的權利</h2>
      <p style={S.p}>
        依《個人資料保護法》第 3 條，您得就您的個人資料行使查詢、閱覽、複製、補充、更正、
        停止蒐集處理利用及刪除之權利。如欲行使上述權利，請透過下方聯絡方式與我們聯繫。
      </p>

      <h2 style={S.h2}>五、Cookie 與第三方服務</h2>
      <p style={S.p}>
        本網站由 Vercel 平台代管，可能因技術需要使用必要性 Cookie。
        本網站目前未使用廣告追蹤或行銷用途之 Cookie。
      </p>

      <h2 style={S.h2}>六、政策修訂</h2>
      <p style={S.p}>
        本公司得隨時修訂本政策並公告於本網站，修訂後之政策自公告時起生效。
      </p>

      <h2 style={S.h2}>七、聯絡我們</h2>
      <p style={S.p}>
        如對本隱私權政策有任何疑問，或欲行使個人資料相關權利，請聯繫：<br />
        俥盛科技有限公司<br />
        Email：tiangongcarbeauty@gmail.com<br />
        電話：0916-789-758<br />
        地址：台北市中正區重慶南路一段57號10樓之17
      </p>
    </main>
  )
}
