import { FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa';
export default function Footer() {
    return (
      <footer className="bg-[#0f0f11] text-white p-6 md:px-20 py-10 rounded-t-3xl">
        <div className="md:flex justify-between items-start space-y-8 md:space-y-0">
          <div className="space-y-4">
            <img src="/logoDark.png" alt="LifeLinkAi logo" className="h-16 w-56" />
            <nav className="flex space-x-6 text-sm underline underline-offset-4">
              <a href="#about">About us</a>
              <a href="#services">Services</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </nav>
            <div>
              <h4 className="inline-block bg-[#FF5B5B] text-black font-semibold px-3 py-1 rounded-md text-sm mb-2">
                Contact us:
              </h4>
              <p className="text-sm">Email: info@positivus.com</p>
              <p className="text-sm">Phone: 555-567-8901</p>
              <p className="text-sm">Address: 1234 Main St<br />Moonstone City, Stardust State 12345</p>
            </div>
          </div>
  
          <div className="bg-[#1f1f25] rounded-lg p-6 space-y-4 w-full md:w-1/2">
            <p className="text-sm font-medium">Subscribe to news</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 p-3 rounded-l-md border border-white bg-transparent text-white placeholder-gray-400 outline-none"
              />
              <button className="bg-[#FF5B5B] text-white px-4 rounded-r-md text-sm font-semibold">
                Subscribe to news
              </button>
            </div>
          </div>
        </div>
  
        <div className="mt-10 flex justify-between items-center text-xs text-gray-400">
          <p>© 2025 Positivus. All Rights Reserved.</p>
          <a href="#" className="underline">Privacy Policy</a>
          <div className="flex space-x-4 text-white text-base">
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </footer>
    );
  }