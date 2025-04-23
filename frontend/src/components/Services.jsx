"use client"
import { useState, useEffect } from 'react';
import { ArrowRight, MessageCircle, MapPin, LineChart, Hospital, BarChart, Activity } from 'lucide-react';

export default function Services() {
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const services = [
    {
      title: 'AI Chatbot Assistance',
      description: 'Get immediate answers to all your blood donation questions through our intelligent ML-powered chatbot.',
      icon: <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />,
      image: '/bot.png',
      bg: 'bg-gradient-to-br from-gray-100 to-gray-200',
      tagBg: 'bg-red-500',
      textColor: 'text-white'
    },
    {
      title: 'Nearest Hospital Finder',
      description: 'Locate the closest blood donation centers based on your current location with our smart mapping system.',
      icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
      image: '/bdmap.png',
      bg: 'bg-gradient-to-br from-red-500 to-red-600',
      tagBg: 'bg-white',
      textColor: 'text-red-500'
    },
    {
      title: 'Donor Return Prediction',
      description: 'Hospitals can forecast donor return likelihood using our XGBoost-based predictive analytics model.',
      icon: <BarChart className="w-5 h-5 md:w-6 md:h-6" />,
      image: '/bdreq.png',
      bg: 'bg-gradient-to-br from-gray-900 to-black',
      tagBg: 'bg-red-500',
      textColor: 'text-white'
    },
    {
      title: 'Hospital Donor Management',
      description: 'Secure portal for hospitals to log in, add new donor information, and manage existing donor records.',
      icon: <Hospital className="w-5 h-5 md:w-6 md:h-6" />,
      image: '/bdmatching.png',
      bg: 'bg-gradient-to-br from-gray-100 to-gray-200',
      tagBg: 'bg-red-500',
      textColor: 'text-white'
    },
    {
      title: 'Blood Stock Forecasting',
      description: 'Advanced analytics to help donation centers predict and manage their blood supply levels efficiently.',
      icon: <LineChart className="w-5 h-5 md:w-6 md:h-6" />,
      image: '/bdfor.png',
      bg: 'bg-gradient-to-br from-red-500 to-red-600',
      tagBg: 'bg-black',
      textColor: 'text-white'
    },
    {
      title: 'Donor Engagement Analytics',
      description: 'Track donor recency, frequency, and engagement time to optimize blood donation campaigns and outreach.',
      icon: <Activity className="w-5 h-5 md:w-6 md:h-6" />,
      image: '/bdana.png',
      bg: 'bg-gradient-to-br from-gray-900 to-black',
      tagBg: 'bg-red-500',
      textColor: 'text-white'
    },
  ];

  return (
    <section id="services" className="px-4 sm:px-6 md:px-20 py-16 md:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-16">
          <div className="max-w-xl">
            <div className="inline-block mb-4 md:mb-6">
              <span className="bg-red-500 text-white text-base md:text-lg font-bold px-4 md:px-6 py-1 md:py-2 rounded-lg shadow-lg transform -rotate-1 inline-block">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Revolutionizing <span className="text-red-500">Blood Donation</span>
            </h2>
            <p className="text-gray-700 text-base md:text-lg">
              Our digital platform connects donors with patients in need through innovative technology and streamlined processes. These life-saving services include:
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bg} rounded-xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer h-full`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => isMobile && setActiveCard(activeCard === index ? null : index)}
            >
              <div className="p-5 sm:p-6 md:p-8 h-full flex flex-col">
                {/* Icon and title area */}
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className={`${service.tagBg} p-2 md:p-3 rounded-lg md:rounded-xl shadow-md`}>
                    <div className={service.textColor}>
                      {service.icon}
                    </div>
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold ${service.bg.includes('black') ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className={`${service.bg.includes('black') ? 'text-gray-300' : 'text-gray-700'} text-sm md:text-base mb-4 md:mb-6`}>
                  {service.description}
                </p>
                
                {/* Image - Only shown on larger screens or when card is tapped on mobile */}
                {(!isMobile || activeCard === index) && (
                  <div className="flex-grow flex items-center justify-center py-2 md:py-4 mb-4 md:mb-6 relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className={`h-32 md:h-40 object-contain transition-all duration-500 ${activeCard === index ? 'scale-110' : 'scale-100'}`}
                    />
                  </div>
                )}
                
                {/* Learn more button */}
                <div className="mt-auto">
                  <a 
                    href="#" 
                    className={`flex items-center gap-2 md:gap-3 ${service.bg.includes('black') ? 'text-white' : 'text-gray-900'} text-sm md:text-base font-medium group`}
                  >
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${
                      service.bg.includes('black') ? 'bg-white text-black' : 'bg-black text-white'
                    } flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg`}>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <span>Learn more</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}