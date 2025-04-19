"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function HeaderAfterAuth() {
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, navRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navLinkClass = (path) =>
    `font-medium transition ${
      pathname === path ? "text-red-600" : "text-gray-700"
    }`;

  return (
    <header
      ref={navRef}
      className="mx-auto bg-white justify-between py-4 z-10 backdrop-blur-sm fixed top-0 w-full px-6 shadow-md"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="LifeLinkAi Logo" className="h-16 w-56" />
        </div>

        {/* Navigation Links */}
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

          <button
            onClick={handleLogout}
            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Déconnexion
          </button>
        </nav>
      </div>
    </header>
  );
}
