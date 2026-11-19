import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AboutRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <Head>
      <title>Terpmetrix</title>
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href="https://terpmetrix.com/" />
      <meta httpEquiv="refresh" content="0;url=/" />
    </Head>
  );
}
