
import Image from "next/image";
import Link from "next/link";
import HamburgerButton from "./HamburgerButton";

import Authmenu from "../Authmenu";

export default function Header() {
  
  return (
    <div className="w-full flex justify-center border-b">
      <div className="w-full sm:w-4/5 px-10 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo-1.png" alt="logo"
            className="object-contain"
            width={180}
            height={90}
            />
        </Link>
        
        <div className="invisible sm:visible">          
          <Authmenu />
        </div>                
        {/* hamburger */}
        <div className="sm:hidden flex items-center">
            <HamburgerButton />
        </div>        
      </div>
    </div>
  );
};
// export default Header;
