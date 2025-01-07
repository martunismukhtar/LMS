
'use client';

import { useAtom } from "jotai";
import React from "react";
import { jenisFormState } from "@/app/Jotai/atom";

type Props = {
  title: string;
  size?: "sm" | "base" | "md" | "lg" | "xl";
  children: React.ReactNode;
  className?: string;
};

const Modal = (props: Props) => {
  
  const { title = "Judul Modal", 
    size = "md", children, className="" } = props;

  const [jenisForm, setJenisForm] = useAtom(jenisFormState);
  const [customSize, setCustomSize] = React.useState("sm:w-1/3");

  const handleCloseModal = () => {    
    setJenisForm("");
  }

  React.useEffect(() => {
    switch (size) {
      case "sm":
        setCustomSize("sm:w-1/4");
        break;
      case "base":
        setCustomSize("sm:w-1/3");
        break;
      case "md":
        setCustomSize("sm:w-1/2");
        break;
      case "lg":
        setCustomSize("sm:w-3/4");
        break;
      case "xl":
        setCustomSize("sm:w-4/5");
        break;
      default:
        setCustomSize("sm:w-1/2"); // Fallback ke 'md'
        break;
    }
  }, [size]);

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-[99] ${
          jenisForm ? 'opacity-100 visible' : 'opacity-0 invisible'
        } ${className}`}
      >
        <div
          className={`bg-[#f5f3ef] rounded-lg shadow dark:bg-gray-700 w-full ${customSize} relative transform scale-95 ${jenisForm ? 'animate-fade-in opacity-100' : 'animate-fade-out opacity-0'}`}
        >
          <div className="border-b-[1px] border-[#235af3] p-4">
            <h2 className="text-base text-slate-950 font-bold mb-2">{title}</h2>
          </div>
          <div className="p-4">{children}</div>

          <button
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleCloseModal}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
