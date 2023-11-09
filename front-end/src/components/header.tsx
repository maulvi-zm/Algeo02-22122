import Link from "next/link";
import React from "react";
import { Camera } from "lucide-react";

interface navItems {
  name: string;
  href: string;
}

const navItems: navItems[] = [
  { name: "Home", href: "/" },
  { name: "CBIR", href: "/cbir" },
  { name: "Camera", href: "/camera" },
  { name: "About Us", href: "/about" },
];

function NavBar() {
  return (
    <header className='w-full fixed top-5 z-50 text-[#292B48]'>
      <nav className='flex justify-between w-[70%] mx-auto py-[16px] rounded-xl bg-white/80 backdrop-blur-md shadow-md shadow-black/10'>
        <ul className='w-full flex justify-between px-[30px] font-medium'>
          <div className='flex gap-4 items-center text-[24px] font-bold'>
            <p>SmiLens.</p>
          </div>
          <div className='flex gap-8 items-center'>
            {navItems.map((item, idx) => (
              <Link
                href={item.href}
                className=' opacity-70 hover:opacity-100'
                key={idx}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
