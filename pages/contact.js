import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ContactRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/#access");
  }, [router]);

  return (
    <Head>
      <title>Inquire | Terpmetrix</title>
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href="https://terpmetrix.com/" />
      <meta httpEquiv="refresh" content="0;url=/#access" />
    </Head>
  );
}
