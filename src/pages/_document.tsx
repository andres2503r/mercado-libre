import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <div id='portal'/>
        <div id='spinner-portal'/>
        <div id='modal-portal'/>
        <div id='dialog-portal'/>
        <NextScript />
      </body>
    </Html>
  )
}
