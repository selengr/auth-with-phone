import "./globals.css";
import type { Metadata } from "next";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Geist, Geist_Mono } from "next/font/google";


import { ThemeProvider } from "@/contexts/Theme"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "احراز هویت",
  description: "پروژه  احراز هویت با تماس ميني",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
         <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
