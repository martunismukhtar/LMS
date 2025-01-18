"use client";

import { useSession } from "next-auth/react";
import LandingPage from "./landing/page";
import Layout from "./layouts/landing";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.MID_CLIENT_KEY;
    const script = document.createElement("script");
    script.src = snapScript;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-client-key", clientKey || "");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // useEffect(() => {
  //   if (session?.role === "admin") {
  //     router.push("/admin");
  //   }
  // }, [session, router]); // Dependency array untuk memastikan efek hanya berjalan saat session atau router berubah

  const handleCheckout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tokenizer` as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: "12345",
        gross_amount: 10000,
      }),
    });
      const token = await response.json();
      window.snap.pay(token);

    
  }

  return (
    <Layout>
      {/* <LandingPage /> */}
      <button className="btn-default" onClick={handleCheckout}>Checkout</button>
    </Layout>
  );
}
