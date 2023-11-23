/* eslint-disable @next/next/no-page-custom-font */
import type { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Box } from '@chakra-ui/react'

export type BaseLayoutProps = {
  pageTitle: string
  children: ReactNode
}

const defaultPageTitle = 'Web Application'
const defaultPageDescription = 'Web Application'

const BaseLayout: FC<BaseLayoutProps> = (p: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${p.pageTitle} | ${defaultPageTitle}`}</title>
        <meta name='application-name' content={defaultPageTitle} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content={defaultPageTitle} />
        <meta name='description' content={defaultPageDescription} />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#000000' />

        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={defaultPageTitle} />
        <meta property='og:description' content={defaultPageTitle} />
        <meta property='og:site_name' content={defaultPageTitle} />
      </Head>
      <Box minH={'100dvh'}>
        <main>{p.children}</main>
      </Box>
    </>
  )
}

export default BaseLayout
