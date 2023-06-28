import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <title>Did Kyrie Say It?</title>
      <link rel="canonical" href="https://www.didkyriesayit.com"/>
      <link rel="icon" href="https://didkyriesayit.s3.us-east-2.amazonaws.com/icons/favicon-32x32.png" type="image/x-icon"/>
      <link href="https://didkyriesayit.s3.us-east-2.amazonaws.com/icons/apple-touch-icon.png" rel="apple-touch-icon" />
      <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"></meta>
      <meta content="Did Kyrie Say It?"/>
      <meta content="https://didkyriesayit.s3.us-east-2.amazonaws.com/kyrie_universe.png" property="og:image"></meta>
      <meta content="Did Kyrie Say It?" property="og:description"/>
      <meta content="Did Kyrie Say It" property="og:title"></meta>
      <meta content="Did Kyrie Say It?" property="twitter:description" />
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:site" content="@asadhabibs"></meta>
      <meta name="twitter:title" content="Did Kyrie Say It"></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:url" content="https://www.didkyriesayit.com/"></meta>
      <meta property="og:site_name" content="didkyriesayit.com"></meta>
      <body className={inter.className}>
        <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=GTM-${process.env.GTM}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}>
            </iframe>
          </noscript>
        {children}
      </body>
    </html>
  )
}
