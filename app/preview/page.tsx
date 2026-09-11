import { redirect } from 'next/navigation'

// 改版原型已正式上線為首頁，舊網址導回首頁
export default function Preview({ searchParams }: { searchParams: { for?: string } }) {
  redirect(searchParams.for === 'shop' ? '/?for=shop' : '/')
}
