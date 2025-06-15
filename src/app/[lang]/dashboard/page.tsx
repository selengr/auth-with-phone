// config
import { Locale } from '../../../../i18n.config'
// dictionary
import { getDictionary } from '@/lib/dictionary';
// section
import DashboardPage from '@/section/dashboard/main/Main';

export default async function Page({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang)

  return <DashboardPage lang={lang} dictionary={dictionary}/>
}
