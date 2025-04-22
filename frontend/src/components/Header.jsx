
"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import BlackLogo from "./utils/BlackLogo";
const sections = ['home', 'services', 'testimonials', 'how', 'contact'];


export default function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (window.scrollY >= offsetTop - 80 && window.scrollY < offsetTop + offsetHeight - 80) {
            current = section;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = (section) =>
    activeSection === section
      ? 'text-red-500 hover:text-red-600 transition'
      : 'text-gray-800 hover:text-red-500 transition';


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
      <div className="bg-white shadow-lg rounded-xl mt-4 max-w-[1400px] px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center backdrop-blur-sm bg-opacity-95 border border-gray-200 mx-auto">
        {/* Logo */}
        <BlackLogo/>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-10 font-medium text-sm lg:text-base">
          <a href="#home" className={linkClass('home')}>
            Home
          </a>
          <a href="#services" className={linkClass('services')}>
            Services
          </a>
          <a href="#testimonials" className={linkClass('testimonials')}>
            Testimonials
          </a>
          <a href="#how" className={linkClass('how')}>
            How it works
          </a>
          <a href="#contact" className={linkClass('contact')}>
            Contact
          </a>
        </nav>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <button
            onClick={() => router.push("/login")}
            className="bg-red-500 text-white px-4 lg:px-6 py-2 rounded-md font-semibold shadow hover:bg-red-600 transition"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-xl mx-4 mt-2 px-4 py-3 space-y-3 text-center">
          <a href="#about" className="block py-2 text-red-500">About us</a>
          <a href="#services" className="block py-2 text-gray-800 hover:text-red-500">Services</a>
          <a href="#testimonials" className="block py-2 text-gray-800 hover:text-red-500">Testimonials</a>
          <a href="#how" className="block py-2 text-gray-800 hover:text-red-500">How it works</a>
          <a href="#contact" className="block py-2 text-gray-800 hover:text-red-500">Contact</a>
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