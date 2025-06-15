"use client"
// React & Libs
import Link from "next/link"
import { usePathname } from "next/navigation"
// config
import { i18n, type Locale } from "../../../../i18n.config"
// css
import styles from "@/components/ThemeToggle/ThemeToggle.module.scss"

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const isValidLocale = (locale: string): locale is Locale => {
    return i18n.locales.includes(locale as Locale)
  }

  const getCurrentLocale = (): Locale => {
    if (!pathName) return i18n.defaultLocale
    const segments = pathName.split("/")
    const potentialLocale = segments[1]
    return isValidLocale(potentialLocale) ? potentialLocale : i18n.defaultLocale
  }

  const currentLocale = getCurrentLocale()

  const redirectedPathName = (locale: Locale): string => {
    if (!pathName) return `/${locale}`
    const segments = pathName.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  const alternativeLocales = i18n.locales.filter((locale): locale is Locale => locale !== currentLocale)

  return (
    <button className={styles.logoutButton}>
      <Link prefetch href={redirectedPathName(alternativeLocales[0])}>
        {alternativeLocales[0]}
      </Link>
    </button>
  )
}
