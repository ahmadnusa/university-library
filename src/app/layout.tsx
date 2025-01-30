import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ReactNode } from "react"

const IBMPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
})

const BebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
})

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing university library management solution.",
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${IBMPlexSans.className} ${BebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout
