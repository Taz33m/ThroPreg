import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/thyroid-favicon.ico" sizes="any" />
        <link rel="icon" href="/thyroid-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/thyroid-icon-48.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

