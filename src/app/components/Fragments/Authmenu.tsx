'use client'

import { useEffect, useState } from "react";
import Landingmenu from "./Landingmenu";
import Logoutmenu from "./Logoutmenu";
import { Session } from "next-auth";

const Authmenu = () => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
    };

    fetchSession();
  }, []);
  return <>{session?.user ? <Logoutmenu /> : <Landingmenu />}</>;
};
export default Authmenu;
