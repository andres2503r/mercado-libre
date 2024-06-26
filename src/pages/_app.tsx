import '../styles/globals.css'
import { GlobalState } from '@context/global-state/GlobalState'
import type { AppProps } from 'next/app'
import Layout from '@components/global/layout/Layout'
import { ToastContainer } from 'react-toastify'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { NextRouter, useRouter } from 'next/router'
import 'react-toastify/dist/ReactToastify.css'
import AxiosState from '@context/axios/AxiosState'
import ErrorBoundary from '@tools/global/error-handing/ErrorHandling'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App ({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const routesPrivate = ['settings']
  const getLayout = Component.getLayout ?? ((page: ReactElement, router: NextRouter) => {
    return routesPrivate.includes(router.asPath.split('/')[1])
      ? <Layout>
        {page}
      </Layout>
      : page
  })

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
        theme="light"
        limit={2}
      />
        <AxiosState>
            <GlobalState>
              <ErrorBoundary>
                {getLayout(<Component {...pageProps} />, router)}
              </ErrorBoundary>
            </GlobalState>
        </AxiosState>
    </>
  )
}
