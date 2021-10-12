/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import React from 'react'

const App = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
)

export default App
