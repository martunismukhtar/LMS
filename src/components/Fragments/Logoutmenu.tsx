"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";

const Logoutmenu = () => {  
  const { cart, myclass } = useCart();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if(cart.length > 0){      
      const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
      setTotal(totalQuantity);
    }
  }, [cart]);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ul className="list-none flex items-center gap-4 ">
        {total > 0 && <li className="relative">
          <Link href="/cart" className="relative">
            <span className="absolute top-[-10px] right-[-9px] w-5 h-5 flex items-center justify-center bg-red-500 rounded-full text-white text-sm">
              {total}
            </span>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </Link>
        </li>}
        {myclass && myclass > 0 && <li>
          <Link href={`myclass`} className="text-sm hover:bg-slate-100 cursor-pointer hover:rounded-md px-2 py-3">my class</Link>
        </li>}
        
        <li className="relative">
          <Image
            src="/user-01.png"
            alt="profile"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          <div
            className={`absolute right-0 mt-4 flex w-60 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
              isOpen ? "block opacity-100" : "hidden opacity-0"
            } transition-all duration-300 ease-in-out`}
          >
            <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7 dark:border-strokedark">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  My profile
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  Account Setting
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Logoutmenu;
