import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'

const roboto = Roboto_Flex({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Challenge',
  description: 'RatherLabs tech challenge for Senior Frontend engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </>
  )
}
