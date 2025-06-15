import "./globals.css";
import { use } from 'react'
import type { Metadata } from "next";
import 'react-toastify/dist/ReactToastify.css';
import { Locale, i18n } from "../../../i18n.config";
import { ToastContainer } from 'react-toastify';
import { estedad, geistMono, geistSans } from "../../../public/fonts";
// config
import { APP_DEFAULT_TITLE_EN, APP_DESCRIPTION_EN, APP_DEFAULT_TITLE_FA, APP_DESCRIPTION_FA } from "../../../config-global";

import { ThemeProvider } from "@/contexts/Theme"

const metadataTranslations: Record<Locale, Metadata> = {
  en: {
    title: {
      absolute: '',
      default: APP_DEFAULT_TITLE_EN,
    },
    description: APP_DESCRIPTION_EN,
  },
  fa: {
    title: {
      absolute: '',
      default: APP_DEFAULT_TITLE_FA,
    },
    description: APP_DESCRIPTION_FA,
  },
};

type Params = Promise<{ lang: Locale }>
export async function generateMetadata({ params }: { params: Params }) {

  const { lang } = await (params);
  return metadataTranslations[lang];
}


// ----------------------------------------------------------------------
export async function generateStaticParams() {
  return i18n.locales.map((locale: string) => ({ lang: locale }));
}
// ----------------------------------------------------------------------


export default function RootLayout(props: {
  children: React.ReactNode
  params: Params
}) {
const params = use(props.params)
const lang = params.lang

const fontClass =
   lang === "fa"
    ? `${estedad.className}`
    : `${geistSans.variable} ${geistMono.variable} font-sans`;

  return (
    <html lang={lang}>
      <body
        className={`${fontClass} antialiased`}
      >
         <ToastContainer
            hideProgressBar={true}
            autoClose={3000}
            closeOnClick={false}
            style={{ zIndex: 1000000004 }}
            pauseOnFocusLoss={true}
            limit={5}
            pauseOnHover
          />
         <ThemeProvider>{props.children}</ThemeProvider>
      </body>
    </html>
  );
}
