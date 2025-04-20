"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
    `px-4 py-2 transition rounded-md ${
      pathname === path
        ? "text-red-600 font-semibold"
        : "text-gray-800 hover:text-red-500"
    }`;

  return (
    <header ref={navRef} className="w-full fixed z-30 top-0">
      <div className="bg-white shadow-lg rounded-xl mx-4 mt-4 max-w-[1400px] px-6 py-4 flex items-center justify-between backdrop-blur-sm bg-opacity-95 border border-gray-200 mx-auto overflow-x-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3 shrink-0">
          <img
            src="/logo.png"
            alt="LifeLinkAi Logo"
            className="h-14 w-auto ml-4 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Desktop Nav + Logout (no wrap!) */}
        <div className="hidden md:flex items-center justify-end flex-nowrap gap-6 ml-auto">
          <nav className="flex items-center space-x-6">
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
            className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-red-600 transition"
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
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white rounded-xl mx-4 mt-2 py-4 px-4 shadow space-y-2">
          <Link href="/donations" className={navLinkClass("/donations")}>
            Donations
          </Link>
          <Link href="/new-donations" className={navLinkClass("/new-donations")}>
            Add Donation
          </Link>
          <Link href="/who-will-donate" className={navLinkClass("/who-will-donate")}>
            Who Will Donate
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
