import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500;600;700&family=VT323:wght@400&family=Press+Start+2P&display=swap&v=4"
          rel="stylesheet"
        />

        {/* Preload critical fonts for better stability */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2isfFJUWGblV.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/pressstart2p/v14/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Social Media Meta Tags */}
        <meta property="og:image" content="/inflatable shop tools button.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Mandy's Workshop - Shop Tools Button"
        />
        <meta
          name="twitter:image"
          content="/inflatable shop tools button.png"
        />
        <meta
          name="twitter:image:alt"
          content="Mandy's Workshop - Shop Tools Button"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
