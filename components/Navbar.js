"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center py-4 px-10 font-semibold">
      <Link href="/" className="flex justify-center items-center">
        <Image src="/hotel.svg" alt="Logo" width={40} height={40} className="dark:invert hover:invert-75" />
      </Link>
      <div className="flex justify-center gap-10 items-center">
        <Link 
          className={`hover:text-emerald-400 transition-all duration-150 ${pathname === '/explore' ? 'text-emerald-300' : 'text-white'}`} 
          href="/explore"
        >
          Explore us
        </Link>
        <Link 
          className={`hover:text-emerald-400 transition-all duration-150 ${pathname === '/contact' ? 'text-emerald-300' : 'text-white'}`} 
          href="/contact"
        >
          Contact
        </Link>
        <Link 
          className={`hover:text-emerald-400 transition-all duration-150 ${pathname === '/facilities' ? 'text-emerald-300' : 'text-white'}`} 
          href="/facilities"
        >
          Facilities
        </Link>
      </div>
    </nav>
  );
}