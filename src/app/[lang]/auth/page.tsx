import { Locale } from '../../../../i18n.config'
import { getDictionary } from '@/lib/dictionary';
import AuthPage from '@/section/auth/AuthPage';

export default async function Page({
  params
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params;
  const { auth } = await getDictionary(lang)

  return <AuthPage lang={auth}/>
}
