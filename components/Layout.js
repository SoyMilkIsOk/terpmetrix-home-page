import React from 'react';
import Head from 'next/head';

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>{props.pageTitle}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </Head>
      <div>
        {props.children}
      </div>
    </div>
  )
}
export default Layout;