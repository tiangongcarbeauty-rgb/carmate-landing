import { PreviewPage } from '@/components/v2/PreviewPage'

// 首頁：車主版（預設）／店家版（?for=shop）
export default function Home({ searchParams }: { searchParams: { for?: string } }) {
  return <PreviewPage initialAudience={searchParams.for === 'shop' ? 'merchant' : 'owner'} />
}
