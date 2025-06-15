// config
import { Locale } from '../../../../i18n.config'
// dictionary
import { getDictionary } from '@/lib/dictionary';
// section
import AuthPage from '@/section/auth/AuthPage';

export default async function Page({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang)

  return <AuthPage dictionary={dictionary}/>
}
