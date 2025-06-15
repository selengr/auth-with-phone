"use client";
// React & Libs
import Link from "next/link";
import { usePathname } from "next/navigation";
// config
import { i18n } from "../../../../i18n.config";
// css
import styles from "@/components/ThemeToggle/ThemeToggle.module.scss";

export default function LocaleSwitcher() {
  const pathName = usePathname();

  const getCurrentLocale = () => {
    if (!pathName) return i18n.defaultLocale;
    const segments = pathName.split("/");
    const potentialLocale = segments[1];
    return i18n.locales.includes(potentialLocale as any)
      ? (potentialLocale as (typeof i18n.locales)[number])
      : i18n.defaultLocale;
  };

  const currentLocale = getCurrentLocale();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return `/${locale}`;
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const alternativeLocales = i18n.locales.filter(
    (locale) => locale !== currentLocale
  );

  return (
    <button className={styles.logoutButton}>
      <Link
        prefetch
        href={redirectedPathName(alternativeLocales[0])} >
        {alternativeLocales[0]}
      </Link>
    </button>
  );
}
