"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // You can install Lucide or use any icon lib
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
  const router = useRouter()
  return (
    <header ref={navRef} className="w-full fixed z-20 bg-white shadow-md px-4 sm:px-6 md:px-12 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="LifeLinkAi Logo" className="h-12 w-auto" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 text-md font-medium">
          <a href="#about" className="text-red-500">About us</a>
          <a href="#services" className="text-gray-800 hover:text-red-500">Services</a>
          <a href="#testimonials" className="text-gray-800 hover:text-red-500">Testimonials</a>
          <a href="#how" className="text-gray-800 hover:text-red-500">How it works</a>
          <a href="#contact" className="text-gray-800 hover:text-red-500">Contact</a>
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <button onClick={()=>{
            router.push('/login')
          }} className="bg-red-500 text-white px-5 py-2  rounded-md hover:bg-red-600 transition">
            Login
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-center">
          <a href="#about" className="block text-red-500">About us</a>
          <a href="#services" className="block text-gray-800 hover:text-red-500">Services</a>
          <a href="#testimonials" className="block text-gray-800 hover:text-red-500">Testimonials</a>
          <a href="#how" className="block text-gray-800 hover:text-red-500">How it works</a>
          <a href="#contact" className="block text-gray-800 hover:text-red-500">Contact</a>
          <button className="w-full mt-2 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition">
            Login
          </button>
        </div>
      )}
    </header>
  );
}
