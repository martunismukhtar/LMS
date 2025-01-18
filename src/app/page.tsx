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
    if (session?.role === "admin") {
      router.push("/admin");
    }
  }, [session, router]); // Dependency array untuk memastikan efek hanya berjalan saat session atau router berubah

  return (
    <Layout>
      <LandingPage />      
    </Layout>
  );
}
