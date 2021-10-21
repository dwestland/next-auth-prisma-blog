/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'next-auth/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProps } from 'next/app'
import React from 'react'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </Provider>
)

export default App
