import Head from 'next/head'
import Script from 'next/script';

export default function Meta () {
  return (
    <>
    <Head>
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
      </Head>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','');
        `}
    </Script>
    </>
  )
}