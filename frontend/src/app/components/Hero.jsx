"use client"
import { useState, useEffect } from 'react';
import { Heart, Droplet, Users } from 'lucide-react';

export default function HeroSection() {
  const [animateCount, setAnimateCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateCount(prev => prev < 3 ? prev + 1 : 0);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [animateCount]);
  
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 px-4 sm:px-6 md:px-20 py-12">
      {/* Animated Circles */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full">
        <div className={`absolute top-20 left-20 w-64 h-64 rounded-full bg-red-100 opacity-20 blur-3xl transition-all duration-1000 ${animateCount === 0 ? 'scale-110' : 'scale-100'}`}></div>
        <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full bg-red-200 opacity-20 blur-3xl transition-all duration-1000 ${animateCount === 1 ? 'scale-110' : 'scale-100'}`}></div>
        <div className={`absolute top-40 right-40 w-56 h-56 rounded-full bg-red-300 opacity-10 blur-3xl transition-all duration-1000 ${animateCount === 2 ? 'scale-110' : 'scale-100'}`}></div>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left Text Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left mt-10 md:mt-0">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-red-600 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span>Life-saving connections</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Connecting <span className="relative">
              Lives
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-500 opacity-80"></span>
            </span> Through Blood Donation
          </h1>
          
          <p className="text-gray-700 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
            Our blood donation platform empowers communities to save lives by simplifying the process of donating and receiving blood. Join us in making a difference—one drop at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-red-600 hover:bg-red-700 transition-colors text-white px-6 py-3 rounded-md text-base sm:text-lg font-medium shadow-lg flex items-center gap-2 group w-full sm:w-auto">
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Become a Donor</span>
            </button>
            
            <button className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 transition-colors px-6 py-3 rounded-md text-base sm:text-lg font-medium flex items-center gap-2 w-full sm:w-auto">
              Learn More
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 pt-4">
            <div className="flex items-center gap-2">
              <Droplet className="text-red-600 w-6 h-6" />
              <span className="text-gray-700">10,000+ donations</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-red-600 w-6 h-6" />
              <span className="text-gray-700">5,000+ lives saved</span>
            </div>
          </div>
        </div>
        
        {/* Right Image with original heroblood.png and transparency preserved */}
        <div className="relative flex justify-center md:block w-full md:w-auto">
          <div className="absolute -inset-4 bg-red-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <img
            src="/heropic.png"
            alt="Blood donation illustration"
            className="w-[80%] sm:w-[72%] md:w-[94%] max-w-sm sm:max-w-md md:max-w-xl relative z-10 drop-shadow-2xl"
          />
          {/* Blood Drop Animation */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full animate-bounce">
            <div className="absolute top-0 left-0 w-full h-full bg-red-600 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="hidden lg:flex justify-between items-center mt-12 bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
        <div className="text-center px-4">
          <p className="text-2xl font-bold text-red-600">24/7</p>
          <p className="text-gray-600">Support</p>
        </div>
        <div className="h-12 w-px bg-gray-200"></div>
        <div className="text-center px-4">
          <p className="text-2xl font-bold text-red-600">100+</p>
          <p className="text-gray-600">Partner Hospitals</p>
        </div>
        <div className="h-12 w-px bg-gray-200"></div>
        <div className="text-center px-4">
          <p className="text-2xl font-bold text-red-600">15 min</p>
          <p className="text-gray-600">Average Response</p>
        </div>
        <div className="h-12 w-px bg-gray-200"></div>
        <div className="text-center px-4">
          <p className="text-2xl font-bold text-red-600">98%</p>
          <p className="text-gray-600">Satisfaction Rate</p>
        </div>
      </div>
      
      {/* Mobile-only Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:hidden mt-8 bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-xl shadow-sm">
        <div className="text-center px-2">
          <p className="text-xl font-bold text-red-600">24/7</p>
          <p className="text-sm text-gray-600">Support</p>
        </div>
        <div className="text-center px-2">
          <p className="text-xl font-bold text-red-600">100+</p>
          <p className="text-sm text-gray-600">Partner Hospitals</p>
        </div>
        <div className="text-center px-2">
          <p className="text-xl font-bold text-red-600">15 min</p>
          <p className="text-sm text-gray-600">Average Response</p>
        </div>
        <div className="text-center px-2">
          <p className="text-xl font-bold text-red-600">98%</p>
          <p className="text-sm text-gray-600">Satisfaction Rate</p>
        </div>
      </div>
    </section>
  );
}