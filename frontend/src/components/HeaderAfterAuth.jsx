
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import BlackLogo from "./utils/BlackLogo";

export default function HeaderAfterAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navLinkClass = (path) =>
    `px-3 sm:px-4 py-2 transition rounded-md ${
      pathname === path
        ? "text-red-600 font-semibold"
        : "text-gray-800 hover:text-red-500"
    }`;

  return (
    <header ref={navRef} className="w-full fixed z-30 top-0">
      <div className="bg-white shadow-lg rounded-xl mt-4 max-w-[1400px] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between backdrop-blur-sm bg-opacity-95 border border-gray-200 mx-auto">
        {/* Logo */}
        <BlackLogo   />

        {/* Desktop Nav + Logout */}
        <div className="hidden md:flex items-center justify-end flex-nowrap gap-2 lg:gap-6 ml-auto">
          <nav className="flex items-center space-x-2 lg:space-x-6">
            <Link href="/donations" className={navLinkClass("/donations")}>
              Donations
            </Link>
            <Link href="/new-donations" className={navLinkClass("/new-donations")}>
              Add Donation
            </Link>
            <Link href="/who-will-donate" className={navLinkClass("/who-will-donate")}>
              Who Will Donate
            </Link>
          </nav>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 lg:px-6 py-2 rounded-md font-semibold shadow hover:bg-red-600 transition whitespace-nowrap"
          >
            Déconnexion
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle menu"
          className="md:hidden text-gray-800 ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white rounded-xl mx-4 mt-2 py-4 px-4 shadow space-y-2">
          <Link href="/donations" className="block py-2 text-center">
            <span className={navLinkClass("/donations")}>Donations</span>
          </Link>
          <Link href="/new-donations" className="block py-2 text-center">
            <span className={navLinkClass("/new-donations")}>Add Donation</span>
          </Link>
          <Link href="/who-will-donate" className="block py-2 text-center">
            <span className={navLinkClass("/who-will-donate")}>Who Will Donate</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full mt-2 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
          >
            Déconnexion
          </button>
        </div>
      )}
    </header>
  );
}