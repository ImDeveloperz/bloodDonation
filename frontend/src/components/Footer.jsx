import { FaLinkedinIn, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Droplet, Phone, Mail, MapPin } from 'lucide-react';
import WhiteLogo from './utils/WhiteLogo';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br rounded-t-3xl from-neutral-900 to-red-950 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-red-500 opacity-5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-red-500 opacity-5 blur-3xl"></div>
      
      {/* Content section */}
      <div className="relative px-4 sm:px-6 md:px-12 lg:px-20 pt-12 pb-8 md:pt-16 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Column 1 - Logo and About */}
          <div className="space-y-6">
            <div className="relative inline-block">
              <div className="relative inline-block">
                <WhiteLogo/>
            </div>
            </div>
            
            <p className="text-gray-300 text-sm">
              Connecting donors and hospitals through AI-powered blood donation management. 
              Our platform optimizes the blood donation process, ensuring every drop counts.
            </p>
            
            {/* Navigation */}
            <nav className="flex flex-wrap gap-x-6 gap-y-3">
              {["Hospitals", "Donors", "About", "Contact"].map((item, index) => (
                <a 
                  key={index} 
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  className="group relative text-sm font-medium overflow-hidden"
                >
                  <span className="relative z-10 transition-colors group-hover:text-red-400">{item}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>
          </div>
          
          {/* Column 2 - Contact info */}
          <div className="space-y-6">
            <div className="inline-block bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg">
              <h4 className="text-sm">Get in Touch</h4>
            </div>
            
            <div className="space-y-4 pl-1">
              <div className="flex items-center gap-3">
                <Mail className="text-red-400 w-5 h-5" />
                <span className="text-gray-300 text-sm">support@linklifeai.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-red-400 w-5 h-5" />
                <span className="text-gray-300 text-sm">+1 (800) DONATE-NOW</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-red-400 w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">1100 Medical Center Blvd, Healthcare City, CA 90210</span>
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              {[
                {icon: <FaLinkedinIn />, color: "hover:bg-blue-600", label: "LinkedIn"},
                {icon: <FaFacebookF />, color: "hover:bg-blue-800", label: "Facebook"},
                {icon: <FaTwitter />, color: "hover:bg-blue-400", label: "Twitter"},
                {icon: <FaInstagram />, color: "hover:bg-pink-600", label: "Instagram"}
              ].map((item, index) => (
                <a 
                  key={index} 
                  href="#" 
                  aria-label={item.label}
                  className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 text-gray-300 ${item.color} hover:text-white transition-all transform hover:scale-110`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 3 - subscription */}
          <div className="lg:col-span-1 md:col-span-2">
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-800 shadow-xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500 opacity-10 rounded-full blur-xl"></div>
              
              <h3 className="font-bold text-lg mb-4 text-white">Never Miss a Donation Drive</h3>
              <p className="text-gray-300 text-sm mb-5">Subscribe to our newsletter for alerts about urgent donation needs and upcoming blood drives in your area.</p>
              
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 text-sm rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
                <button className=" w-full sm:w-auto sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg shadow-lg font-medium hover:from-red-700 hover:to-red-600 transition-all text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="mt-12 mb-6 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        
        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-gray-400 text-xs">© {new Date().getFullYear()} LinkLifeAI. All Rights Reserved.</p>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <a href="#" className="text-gray-400 hover:text-white hover:underline transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white hover:underline transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white hover:underline transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}