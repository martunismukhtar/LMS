'use client';

import Image from "next/image";
import Landingmenu from "../Landingmenu";
import Link from "next/link";
import { useAtom } from "jotai";
import { isOpenMenuState } from "@/app/Jotai/atom";

const Drawer = () => {
    const [isOpenMenu, setOpenMenu] = useAtom(isOpenMenuState);
    return (
        <div className={`absolute ${isOpenMenu ? 'opacity-100 visible' : 'opacity-0 invisible'} inset-0 top-0 left-0 right-0 bottom-0 transition-all duration-300 ease-in-out`} 
        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)'}}
        >
        <div className="drawer-inner bg-white fixed top-0 right-0 bottom-0 max-w-[90%] w-[100%]">
            <div className="p-4 flex justify-end" onClick={() => setOpenMenu(false)}>
                <svg width="34px" height="34px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 21.32L21 3.32001" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M3 3.32001L21 21.32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
            <div className="p-4 mt-4 flex flex-col gap-4">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="logo"
                        className="object-contain"
                        width={110}
                        height={110}
                        />
                </Link>
                <ul className="list-none">
                    <li className="text-2xl border-b flex flex-col">
                        <div className="flex justify-between">
                        <span>Product</span>
                        <button>
                        <svg width="20px" height="20px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"></path></g></svg>
                        </button>
                        </div>
                        

                        <ul className="list-none">
                            <li>plugin</li>
                        </ul>
                    </li>
                    <li className="text-2xl">Pricing</li>
                </ul>
                <div className="mt-4">
                    <Landingmenu />
                </div>                
            </div>
        </div>
      </div>   
    );
}
export default Drawer