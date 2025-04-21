import { FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br rounded-t-3xl from-gray-900 to-black text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-red-500 opacity-5 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-red-500 opacity-5 blur-3xl"></div>
      
      {/* Content section with clip path */}
      <div className="relative px-6 md:px-20 pt-16 pb-10">
        <div className="md:flex justify-between items-start space-y-12 md:space-y-0">
          {/* Left column */}
          <div className="space-y-8 md:w-1/2">
            <div className="relative inline-block">
              <img src="/logoDark.png" alt="LifeLinkAi logo" className="h-16 w-56 relative z-10" />
              <div className="absolute -bottom-2 -left-4 w-16 h-1 bg-red-500 rounded-full"></div>
            </div>
            
            {/* Navigation */}
            <nav className="flex flex-wrap gap-x-8 gap-y-4">
              {["About us", "Services", "Testimonials", "Contact"].map((item, index) => (
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
            
            {/* Contact info */}
            <div className="space-y-4">
              <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
                <h4 className="text-sm">Contact us:</h4>
              </div>
              
              <div className="space-y-2 pl-1">
                {[
                  {label: "Email", value: "info@positivus.com"},
                  {label: "Phone", value: "555-567-8901"},
                  {label: "Address", value: "1234 Main St, Moonstone City, Stardust State 12345"}
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-red-400 font-medium">{item.label}:</span>
                    <span className="text-gray-300 text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - subscription */}
          <div className="md:w-2/5">
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500 opacity-10 rounded-full blur-xl"></div>
              
              <h3 className="font-bold text-xl mb-6 text-white">Stay Connected</h3>
              <p className="text-gray-300 mb-6">Subscribe to our newsletter for updates, news, and exclusive offers.</p>
              
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg shadow-lg font-medium hover:from-red-600 hover:to-red-700 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="mt-16 mb-8 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2025 Positivus. All Rights Reserved.</p>
          
          <a href="#" className="text-sm text-gray-400 hover:text-white hover:underline transition-colors">
            Privacy Policy
          </a>
          
          <div className="flex gap-4">
            {[
              {icon: <FaLinkedinIn />, color: "hover:bg-blue-600"},
              {icon: <FaFacebookF />, color: "hover:bg-blue-800"},
              {icon: <FaTwitter />, color: "hover:bg-blue-400"}
            ].map((item, index) => (
              <a 
                key={index} 
                href="#" 
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-gray-300 ${item.color} hover:text-white transition-all transform hover:scale-110`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}