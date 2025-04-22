"use client"
import { useRef, useState } from "react";
import { Send, CheckCircle, User, Mail, MapPin, MessageSquare } from "lucide-react";

export default function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(form.current);

    const data = {
      name: formData.get("user_name"),
      email: formData.get("user_email"),
      city: formData.get("user_city"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("https://backendblooddonation.fly.dev/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        form.current.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.detail || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative px-4 sm:px-6 md:px-20 py-16 md:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-red-100 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-56 sm:w-80 h-56 sm:h-80 bg-blue-100 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/4"></div>
      
      {/* Heading with animated underline */}
      <div className="relative z-10 mb-8 md:mb-12 text-center md:text-left">
        <div className="inline-block relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Contact <span className="text-red-500">Us</span>
          </h2>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
        </div>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl mt-3 md:mt-4 max-w-2xl mx-auto md:mx-0">
          We're excited to hear from you! Share your thoughts and let's collaborate on your next project.
        </p>
      </div>

      <div className="relative z-10 bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden transform transition-all hover:shadow-red-100">
        <div className="md:flex items-center">
          {/* Left side - Form */}
          <div className="p-6 sm:p-8 md:p-12 lg:p-16 md:w-1/2">
            <form ref={form} onSubmit={sendEmail} className="space-y-4 md:space-y-6">
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1 transition-all group-focus-within:text-red-500">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500">
                    <User size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your name"
                    className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 rounded-lg md:rounded-xl border border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 focus:ring-opacity-50 outline-none transition-all text-sm md:text-base"
                    required
                  />
                </div>
              </div>
              
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1 transition-all group-focus-within:text-red-500">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500">
                    <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="email@example.com"
                    className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 rounded-lg md:rounded-xl border border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 focus:ring-opacity-50 outline-none transition-all text-sm md:text-base"
                    required
                  />
                </div>
              </div>
              
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1 transition-all group-focus-within:text-red-500">City</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500">
                    <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <select
                    name="user_city"
                    className="w-full pl-10 md:pl-12 pr-8 py-3 md:py-4 rounded-lg md:rounded-xl border border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 focus:ring-opacity-50 outline-none transition-all appearance-none cursor-pointer bg-white text-sm md:text-base"
                    required
                  >
                    <option value="">Select your city</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Fes">Fes</option>
                    <option value="Tangier">Tangier</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Oujda">Oujda</option>
                    <option value="Meknes">Meknes</option>
                    <option value="Tetouan">Tetouan</option>
                    <option value="Laayoune">Laayoune</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-1 transition-all group-focus-within:text-red-500">Message</label>
                <div className="relative">
                  <div className="absolute top-3 md:top-4 left-0 pl-3 md:pl-4 flex items-start pointer-events-none text-gray-400 group-focus-within:text-red-500">
                    <MessageSquare size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows="4"
                    className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 rounded-lg md:rounded-xl border border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 focus:ring-opacity-50 outline-none transition-all resize-none text-sm md:text-base"
                    required
                  ></textarea>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 md:mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl flex items-center justify-center font-medium text-base md:text-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] md:hover:scale-105 focus:ring focus:ring-red-200 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : isSuccess ? (
                  <CheckCircle className="mr-2" size={18} />
                ) : (
                  <Send className="mr-2" size={18} />
                )}
                {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>
          
          {/* Right side - Illustration */}
          <div className="hidden md:block md:w-1/2 p-6 lg:p-12 overflow-hidden relative">
            {/* Abstract decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-red-200 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-red-300 opacity-30"></div>
            
            {/* Main illustration */}
            <svg className="w-full h-auto relative z-10" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              {/* Envelope base */}
              <rect x="100" y="120" width="200" height="140" rx="10" fill="#F87171" />
              <path d="M100 140L200 220L300 140" stroke="white" strokeWidth="6" fill="none" />
              <path d="M100 260L170 200" stroke="white" strokeWidth="4" fill="none" />
              <path d="M300 260L230 200" stroke="white" strokeWidth="4" fill="none" />
              
              {/* Message bubbles floating */}
              <g transform="rotate(-15, 320, 180)">
                <rect x="270" y="160" width="80" height="50" rx="10" fill="white" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" />
                <circle cx="290" cy="185" r="4" fill="#EF4444" />
                <circle cx="310" cy="185" r="4" fill="#EF4444" />
                <circle cx="330" cy="185" r="4" fill="#EF4444" />
              </g>
              
              <g transform="rotate(10, 100, 180)">
                <rect x="50" y="140" width="70" height="45" rx="10" fill="white" filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.1))" />
                <line x1="65" y1="155" x2="105" y2="155" stroke="#EF4444" strokeWidth="2" />
                <line x1="65" y1="165" x2="95" y2="165" stroke="#EF4444" strokeWidth="2" />
                <line x1="65" y1="175" x2="85" y2="175" stroke="#EF4444" strokeWidth="2" />
              </g>
              
              {/* Send button effect */}
              <circle cx="200" cy="260" r="15" fill="#EF4444">
                <animate attributeName="r" values="15;18;15" dur="2s" repeatCount="indefinite" />
              </circle>
              <path d="M194 260L200 254L206 260L200 266Z" fill="white" transform="rotate(90, 200, 260)" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Success notification toast that appears after submit */}
      {isSuccess && (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white shadow-lg rounded-xl p-3 sm:p-4 flex items-center space-x-3 animate-fade-in-up z-50 max-w-[calc(100%-2rem)] sm:max-w-sm">
          <div className="bg-green-100 p-2 rounded-full">
            <CheckCircle size={16} className="text-green-500 sm:w-5 sm:h-5" />
          </div>
          <div>
            <p className="font-medium text-sm sm:text-base">Message sent successfully!</p>
            <p className="text-xs sm:text-sm text-gray-500">We'll get back to you soon.</p>
          </div>
        </div>
      )}
      
      {/* Shape decorations */}
      <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-red-100 rounded-full opacity-30 translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/2 left-0 w-12 sm:w-16 h-12 sm:h-16 bg-yellow-100 rounded-full opacity-20 -translate-x-1/2"></div>
    </section>
  );
}