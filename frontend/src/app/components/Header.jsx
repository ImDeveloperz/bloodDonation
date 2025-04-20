"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();

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

  return (
    <header
      ref={navRef}
      className="w-full fixed z-20 top-0"
    >
      {/* Outer box to hold the rounded header */}
      <div className="bg-white shadow-lg rounded-xl mx-4 mt-4 max-w-[1400px] px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-opacity-95 border border-gray-200 mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/logo.png"
            alt="LifeLinkAi Logo"
            className="h-14 w-auto ml-16 transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 font-medium text-sm lg:text-base">
          <a href="#about" className="text-red-500 hover:text-red-600 transition">
            About us
          </a>
          <a href="#services" className="text-gray-800 hover:text-red-500 transition">
            Services
          </a>
          <a href="#testimonials" className="text-gray-800 hover:text-red-500 transition">
            Testimonials
          </a>
          <a href="#how" className="text-gray-800 hover:text-red-500 transition">
            How it works
          </a>
          <a href="#contact" className="text-gray-800 hover:text-red-500 transition">
            Contact
          </a>
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <button
            onClick={() => router.push("/login")}
            className="bg-red-500 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-red-600 transition"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 mt-2 space-y-3 text-center pb-4">
          <a href="#about" className="block text-red-500">About us</a>
          <a href="#services" className="block text-gray-800 hover:text-red-500">Services</a>
          <a href="#testimonials" className="block text-gray-800 hover:text-red-500">Testimonials</a>
          <a href="#how" className="block text-gray-800 hover:text-red-500">How it works</a>
          <a href="#contact" className="block text-gray-800 hover:text-red-500">Contact</a>
          <button
            onClick={() => router.push('/login')}
            className="w-full mt-2 bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}
