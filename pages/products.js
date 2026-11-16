import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ProductsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/#ventures");
  }, [router]);
  return null;
}
