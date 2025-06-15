// config
import { Locale } from '../../../../i18n.config'
// lib
import { getDictionary } from '@/lib/dictionary';
// section
import DashboardPage from '@/section/dashboard/main/Main';


export default async function Page({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params;
  const dash = await getDictionary(lang)

  return <DashboardPage lang={dash}/>
}
