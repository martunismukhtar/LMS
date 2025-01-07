"use client";

import { isOpenMenuState } from "@/app/Jotai/atom";
import { useAtom } from "jotai";

const HamburgerButton = () => {
  const [, setOpenMenu] = useAtom(isOpenMenuState);

  const handleClick = () => {
    setOpenMenu(true);
  };

  return (
    <svg
      onClick={handleClick}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M20 7L4 7"
          stroke="#1C274C"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          opacity="0.5"
          d="M20 12L4 12"
          stroke="#1C274C"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
        <path
          d="M20 17L4 17"
          stroke="#1C274C"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </g>
    </svg>
  );
};

export default HamburgerButton;
