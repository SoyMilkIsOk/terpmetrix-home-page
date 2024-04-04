'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/header.css';
import '../styles/Form.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


function MyApp({ Component, pageProps }) {

  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: "",
        },
      }),
    },
  });

  return (
  <ChakraProvider theme={theme}>
  <Component {...pageProps} />
  </ChakraProvider>
  )
}

export default MyApp
