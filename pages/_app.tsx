/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProps } from 'next/app'
import React from 'react'
import '@/styles/globals.css'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
)

export default App
