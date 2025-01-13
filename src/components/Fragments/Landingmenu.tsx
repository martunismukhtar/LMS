"use client";

import Button from "../Elements/button";
import { signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

const Landingmenu = () => {
  const pathname = usePathname();

  const handleClickRegister = () => {
    
  };
  return (
    <>
      <ul className="list-none flex gap-8 items-center">
        {pathname !== "/login" && (
          <li>
            <Button
              type="button"
              onClick={() => signIn()}
              className="bg-[#fd440f] py-[16px] px-[30px] text-white rounded-full shadow-lg"
            >
              Sign in
            </Button>
          </li>
        )}
        <li>
          <Button
            type="button"
            onClick={handleClickRegister}
            className="bg-transparent py-[16px] px-[20px] text-black rounded-full "
          >
            Sign up
          </Button>
        </li>
      </ul>
    </>
  );
};
export default Landingmenu;
