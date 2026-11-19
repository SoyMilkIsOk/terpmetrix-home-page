import Head from "next/head";
import { useEffect } from "react";
import Router from "next/router";

export default function QR() {
  useEffect(() => {
    const url = "https://instagram.com/terpscoops";
    Router.push(url);
  }, []);

  return (
    <Head>
      <title>TerpScoops on Instagram | Terpmetrix</title>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
}
