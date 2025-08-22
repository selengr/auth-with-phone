import localFont from 'next/font/local';
import { Geist, Geist_Mono } from "next/font/google";

export const estedad = localFont({
  src: [
    {
      path: '/estedad/Estedad-FD-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/estedad/Estedad-FD-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '/estedad/Estedad-FD-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '/estedad/Estedad-FD-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '/estedad/Estedad-FD-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});


export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
