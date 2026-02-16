import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "../components/navbar"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.julescheron.com"),
  title: {
    default: "Jules Chéron",
    template: "%s | Jules Chéron",
  },
  description: "Developer, cardist and maker of things.",
  openGraph: {
    title: "Jules Chéron",
    description: "Developer, cardist and maker of things.",
    url: "https://www.julescheron.com",
    siteName: "Jules Chéron",
    locale: "en_US",
    type: "website",
    images: ["https://julescheron.com/og/home"],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  // twitter: {
  //   title: "Jules Chéron",
  //   card: "summary_large_image",
  //   creator: "@nexxeln",
  // },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://photos.julescheron.com" />
        <link rel="dns-prefetch" href="https://photos.julescheron.com" />
      </head>
      <body
        className={`${geistMono.variable} antialiased min-h-screen font-mono`}
      >
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
