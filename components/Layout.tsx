import Head from 'next/head'

import { FunctionComponent } from 'react'
import Header from './Header'
import localFont from '@next/font/local'

const myFont = localFont({
  src: [
    {
      path: '../public/fonts/BlenderPro-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/BlenderPro-BookItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/BlenderPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/BlenderPro-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-blender-pro',
})
const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Head>
        <title>KTM</title>
        <link rel="icon" href="https://cdn.bajajauto.com/images/ktm/ktm-logo.ico" />
      </Head>

      <div className={myFont.className}>
        <Header />
        <main className="relative">{children}</main>
      </div>
    </>
  )
}

export default Layout
