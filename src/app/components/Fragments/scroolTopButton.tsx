'use client';

import { useEffect, useState } from "react";

const ScroolTopButton = () => {
    const [scroll, setScroll] = useState(0);
    const [showScroll, setShowScroll] = useState(false);

    const handleScroll = () => {
        setScroll(window.scrollY);
    };
    
    useEffect(()=>{
        window.addEventListener("scroll", handleScroll);
        if(scroll > 400) {
            setShowScroll(true);
        } else {
            setShowScroll(false);
        }       
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scroll])

    return (
        <button className={`p-3 bg-[#007BFF] transition-all duration-300 ease-in-out ${showScroll ? 'opacity-100' : 'opacity-0'} text-white rounded-full fixed bottom-[10rem] right-[20px]`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <svg fill="#ffffff" height="34px" width="34px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.867 511.867"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M508.827,350.027L263.493,104.373c-4.267-4.053-10.88-4.053-15.147,0L3.12,350.027c-4.16,4.16-4.16,10.88,0,15.04 l42.24,42.347c4.267,4.053,10.88,4.053,15.147,0L255.92,211.68l195.52,195.733c4.16,4.16,10.88,4.16,15.04,0l42.347-42.347 C512.88,360.907,512.88,354.187,508.827,350.027z M459.013,384.8l-195.52-195.733c-4.16-4.16-10.88-4.16-15.04,0L52.933,384.8 l-27.2-27.307L255.92,126.987l230.293,230.507L459.013,384.8z"></path> </g> </g> </g>
            </svg>
        </button>
    );
}
export default ScroolTopButton