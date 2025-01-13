'use client'

import { useSession } from "next-auth/react";
import LandingPage from "./landing/page";
import Layout from "./layouts/landing";
import AdminLayout from "./layouts/admin";
import AdminPage from "./admin/page";

export default function Home() {
  const { data: session } = useSession()

  if(session?.role==='admin') {
    return (
      <AdminLayout>
        <AdminPage />
      </AdminLayout>
    )
  } else {
    return (        
      <Layout>
        <LandingPage />
      </Layout>  
  );
  }
  
}
