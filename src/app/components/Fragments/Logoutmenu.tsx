"use client";

import { signOut } from "next-auth/react";
import Button from "../Elements/button";

const Logoutmenu = () => {
  return (
    <>
      <ul className="list-none flex gap-8 items-center">
        <li>
          <Button
            type="button"
            onClick={() => signOut()}
            className="bg-[#fd440f] py-[16px] px-[30px] text-white rounded-full shadow-lg"
          >
            Sign out
          </Button>
        </li>
      </ul>
    </>
  );
};

export default Logoutmenu;
