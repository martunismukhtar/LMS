'use client'

import { useSession } from "next-auth/react";
import Landingmenu from "./Landingmenu";
import Logoutmenu from "./Logoutmenu";

const Authmenu = () => {
  const { data: session } = useSession()
  return <>{session?.user ? <Logoutmenu /> : <Landingmenu />}</>;
};
export default Authmenu;
