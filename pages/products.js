import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ProductsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/#ventures");
  }, [router]);

  return (
    <Head>
      <title>Ventures | Terpmetrix</title>
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href="https://terpmetrix.com/" />
      <meta httpEquiv="refresh" content="0;url=/#ventures" />
    </Head>
  );
}
