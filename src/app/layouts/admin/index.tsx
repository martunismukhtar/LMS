'use client'

import Image from 'next/image'
import Aside from "./Aside";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="flex h-screen overflow-hidden bg-[#f1f5f9]">
            <Aside />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* header */}
                <header className="sticky top-0 z-999 flex w-full shadow-md bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
                    <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                        <ul className="list-none flex items-center gap-4 ">
                            <li>{session?.role}</li>
                            <li className='relative'>
                                <Image src="/user-01.png" alt="profile" width={40} height={40} className="rounded-full cursor-pointer" 
                                onClick={()=> setIsOpen(!isOpen)}
                                />
                                <div className={`absolute right-0 mt-4 flex w-60 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${isOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-all duration-300 ease-in-out`}>
                                    <ul className='flex flex-col gap-5 border-b border-stroke px-6 py-7 dark:border-strokedark'>
                                        <li>
                                            <Link href="#" className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'>
                                            My profile
                                            </Link>                                            
                                        </li>
                                        <li>
                                            <Link href="#" className='flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'>
                                            Account Setting
                                            </Link>                                            
                                        </li>
                                    </ul>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                </header>
                {/* konten */}
                <div className='max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
                {children}
                </div>                
            </div>            
        </div>
    );
};

export default AdminLayout;