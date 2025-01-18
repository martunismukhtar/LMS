"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Aside = () => {
  const [isOpenMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setSelected(pathname);    
  }, [pathname]);

  return (
    <div className="bg-[#1c2434] text-white absolute left-0 top-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark sm:static translate-x-[-100%] sm:translate-x-0">
      {/*start side header */}
      <div className="flex items-center justify-start gap-2 px-8 py-7">
        <svg
          width="34px"
          height="34px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#f5f5f5"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM13 8C13 7.44772 12.5523 7 12 7C11.4477 7 11 7.44772 11 8V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V8ZM8 10C8.55228 10 9 10.4477 9 11V16C9 16.5523 8.55229 17 8 17C7.44772 17 7 16.5523 7 16V11C7 10.4477 7.44772 10 8 10ZM16 12C16.5523 12 17 12.4477 17 13V16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16V13C15 12.4477 15.4477 12 16 12Z"
              fill="#2453c2"
            ></path>{" "}
          </g>
        </svg>
        <h1 className="text-2xl font-bold">EduForge</h1>
      </div>
      {/* end side header */}
      <div className="flex flex-col static ">
        <h2 className="mt-4 ml-4 text-lg font-medium">Menu</h2>
        <nav className="px-4 py-2 ">
          <div>
            <ul className="flex flex-col gap-1.5">
              <li>
                <Link
                  href="#"
                  className="group relative flex bg-dark items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-color-dark1 duration-300 ease-in-out hover:bg-color-dark dark:hover:bg-meta-4"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <div
                  className="group relative flex bg-dark items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-color-dark1 duration-300 ease-in-out hover:bg-color-dark dark:hover:bg-meta-4 cursor-pointer"
                  onClick={() =>
                    setOpenMenu(isOpenMenu === "data" ? null : "data")
                  }
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9728)">
                      <path
                        d="M3.45928 0.984375H1.6874C1.04053 0.984375 0.478027 1.51875 0.478027 2.19375V3.96563C0.478027 4.6125 1.0124 5.175 1.6874 5.175H3.45928C4.10615 5.175 4.66865 4.64063 4.66865 3.96563V2.16562C4.64053 1.51875 4.10615 0.984375 3.45928 0.984375ZM3.3749 3.88125H1.77178V2.25H3.3749V3.88125Z"
                        fill=""
                      ></path>
                      <path
                        d="M7.22793 3.71245H16.8748C17.2123 3.71245 17.5217 3.4312 17.5217 3.06558C17.5217 2.69995 17.2404 2.4187 16.8748 2.4187H7.22793C6.89043 2.4187 6.58105 2.69995 6.58105 3.06558C6.58105 3.4312 6.89043 3.71245 7.22793 3.71245Z"
                        fill=""
                      ></path>
                      <path
                        d="M3.45928 6.75H1.6874C1.04053 6.75 0.478027 7.28437 0.478027 7.95937V9.73125C0.478027 10.3781 1.0124 10.9406 1.6874 10.9406H3.45928C4.10615 10.9406 4.66865 10.4062 4.66865 9.73125V7.95937C4.64053 7.28437 4.10615 6.75 3.45928 6.75ZM3.3749 9.64687H1.77178V8.01562H3.3749V9.64687Z"
                        fill=""
                      ></path>
                      <path
                        d="M16.8748 8.21252H7.22793C6.89043 8.21252 6.58105 8.49377 6.58105 8.8594C6.58105 9.22502 6.86231 9.47815 7.22793 9.47815H16.8748C17.2123 9.47815 17.5217 9.1969 17.5217 8.8594C17.5217 8.5219 17.2123 8.21252 16.8748 8.21252Z"
                        fill=""
                      ></path>
                      <path
                        d="M3.45928 12.8531H1.6874C1.04053 12.8531 0.478027 13.3875 0.478027 14.0625V15.8344C0.478027 16.4813 1.0124 17.0438 1.6874 17.0438H3.45928C4.10615 17.0438 4.66865 16.5094 4.66865 15.8344V14.0625C4.64053 13.3875 4.10615 12.8531 3.45928 12.8531ZM3.3749 15.75H1.77178V14.1188H3.3749V15.75Z"
                        fill=""
                      ></path>
                      <path
                        d="M16.8748 14.2875H7.22793C6.89043 14.2875 6.58105 14.5687 6.58105 14.9344C6.58105 15.3 6.86231 15.5812 7.22793 15.5812H16.8748C17.2123 15.5812 17.5217 15.3 17.5217 14.9344C17.5217 14.5687 17.2123 14.2875 16.8748 14.2875Z"
                        fill=""
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9728">
                        <rect width="18" height="18" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  Data
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                      fill=""
                    ></path>
                  </svg>
                </div>
                <ul
                  className={`list-none ${
                    isOpenMenu === "data" || (selected?.includes("category") || selected?.includes("course"))
                      ? "block opacity-100"
                      : "hidden opacity-0"
                  } transition-all duration-300 ease-in-out mb-5.5 mt-4 flex flex-col gap-2.5 pl-6`}
                >
                  <li>
                    <Link
                      href="/admin/role"
                      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-color-dark2 duration-300 ease-in-out hover:text-white ${
                        selected?.includes("role") ? "text-white" : ""
                      }`}
                    >
                      Roles
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/category"
                      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-color-dark2 duration-300 ease-in-out hover:text-white ${
                        selected?.includes("category") ? "text-white" : ""
                      }`}
                    >
                      Category
                    </Link>
                    <Link
                      href="/admin/course"
                      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-color-dark2 duration-300 ease-in-out hover:text-white ${
                        selected?.includes("course") ? "text-white" : ""
                      }`}
                    >
                      Course
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <div
                  className="group relative flex bg-dark items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-color-dark1 duration-300 ease-in-out hover:bg-color-dark dark:hover:bg-meta-4 cursor-pointer"
                  onClick={() =>
                    setOpenMenu(isOpenMenu === "user" ? null : "user")
                  }
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_130_9728)">
                      <path
                        d="M3.45928 0.984375H1.6874C1.04053 0.984375 0.478027 1.51875 0.478027 2.19375V3.96563C0.478027 4.6125 1.0124 5.175 1.6874 5.175H3.45928C4.10615 5.175 4.66865 4.64063 4.66865 3.96563V2.16562C4.64053 1.51875 4.10615 0.984375 3.45928 0.984375ZM3.3749 3.88125H1.77178V2.25H3.3749V3.88125Z"
                        fill=""
                      ></path>
                      <path
                        d="M7.22793 3.71245H16.8748C17.2123 3.71245 17.5217 3.4312 17.5217 3.06558C17.5217 2.69995 17.2404 2.4187 16.8748 2.4187H7.22793C6.89043 2.4187 6.58105 2.69995 6.58105 3.06558C6.58105 3.4312 6.89043 3.71245 7.22793 3.71245Z"
                        fill=""
                      ></path>
                      <path
                        d="M3.45928 6.75H1.6874C1.04053 6.75 0.478027 7.28437 0.478027 7.95937V9.73125C0.478027 10.3781 1.0124 10.9406 1.6874 10.9406H3.45928C4.10615 10.9406 4.66865 10.4062 4.66865 9.73125V7.95937C4.64053 7.28437 4.10615 6.75 3.45928 6.75ZM3.3749 9.64687H1.77178V8.01562H3.3749V9.64687Z"
                        fill=""
                      ></path>
                      <path
                        d="M16.8748 8.21252H7.22793C6.89043 8.21252 6.58105 8.49377 6.58105 8.8594C6.58105 9.22502 6.86231 9.47815 7.22793 9.47815H16.8748C17.2123 9.47815 17.5217 9.1969 17.5217 8.8594C17.5217 8.5219 17.2123 8.21252 16.8748 8.21252Z"
                        fill=""
                      ></path>
                      <path
                        d="M3.45928 12.8531H1.6874C1.04053 12.8531 0.478027 13.3875 0.478027 14.0625V15.8344C0.478027 16.4813 1.0124 17.0438 1.6874 17.0438H3.45928C4.10615 17.0438 4.66865 16.5094 4.66865 15.8344V14.0625C4.64053 13.3875 4.10615 12.8531 3.45928 12.8531ZM3.3749 15.75H1.77178V14.1188H3.3749V15.75Z"
                        fill=""
                      ></path>
                      <path
                        d="M16.8748 14.2875H7.22793C6.89043 14.2875 6.58105 14.5687 6.58105 14.9344C6.58105 15.3 6.86231 15.5812 7.22793 15.5812H16.8748C17.2123 15.5812 17.5217 15.3 17.5217 14.9344C17.5217 14.5687 17.2123 14.2875 16.8748 14.2875Z"
                        fill=""
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_130_9728">
                        <rect width="18" height="18" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  Users
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                      fill=""
                    ></path>
                  </svg>
                </div>
                <ul
                  className={`list-none ${
                    isOpenMenu === "user"
                      ? "block opacity-100"
                      : "hidden opacity-0"
                  } transition-all duration-300 ease-in-out mb-5.5 mt-4 flex flex-col gap-2.5 pl-6`}
                >
                  <li>
                    <Link
                      href="/admin/category"
                      className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-color-dark2 duration-300 ease-in-out hover:text-white"
                    >
                      Category
                    </Link>
                    <Link
                      href="/admin/category"
                      className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-color-dark2 duration-300 ease-in-out hover:text-white"
                    >
                      Course
                    </Link>
                  </li>
                </ul>
              </li>
              <li>Settings</li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Aside;
