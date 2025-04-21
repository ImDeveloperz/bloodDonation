"use client"
import { useState } from 'react';
import { ArrowRight, Droplet, MapPin, Bell, Hospital, Clock, AlertCircle } from 'lucide-react';

export default function Services() {
  const [activeCard, setActiveCard] = useState(null);
  
  const services = [
    {
      title: 'Donor-Patient Matching',
      description: 'Our AI-powered matching system connects donors with patients in need based on blood type, location, and urgency.',
      icon: <Droplet className="w-6 h-6" />,
      image: '/bdmatching.png',
      bg: 'bg-gradient-to-br from-gray-100 to-gray-200',
      tagBg: 'bg-red-500',
      textColor: 'text-white'
    },
    {
      title: 'Interactive Donor Map',
      description: 'Visualize donation centers and blood needs in your area with our real-time interactive map.',
      icon: <MapPin className="w-6 h-6" />,
      image: '/bdmap.png',
      bg: 'bg-gradient-to-br from-red-500 to-red-600',
      tagBg: 'bg-white',
      textColor: 'text-red-500'
    },
    {
      title: 'Automated Notifications',
      description: 'Stay informed with timely alerts about donation opportunities, appointment reminders, and thank-you messages.',
      icon: <Bell className="w-6 h-6" />,
      image: '/bdnotif.png',
      bg: 'bg-gradient-to-br from-gray-900 to-black',
      tagBg: 'bg-red-500',
      textColor: 'text-white'
    },
    {
      title: 'Hospital Blood Requests',
      description: 'Hospitals can submit urgent blood requests directly through our platform to reach nearby eligible donors.',
      icon: <Hospital className="w-6 h-6" />,
      image: '/bdreq.png',
      bg: 'bg-gradient-to-br from-gray-100 to-gray-200',
      tagBg: 'bg-red-500',
      textColor: 'text-white'
    },
    {
      title: 'Donation History Tracking',
      description: 'Donors can view their complete donation history, impact statistics, and eligibility status for future donations.',
      icon: <Clock className="w-6 h-6" />,
      image: '/bdh.png',
      bg: 'bg-gradient-to-br from-red-500 to-red-600',
      tagBg: 'bg-black',
      textColor: 'text-white'
    },
    {
      title: 'Availability Alerts',
      description: 'Get instant notifications when your blood type is urgently needed in your area or at specific hospitals.',
      icon: <AlertCircle className="w-6 h-6" />,
      image: '/bdalert.png',
      bg: 'bg-gradient-to-br from-gray-900 to-black',
      tagBg: 'bg-red-500',
      textColor: 'text-white'
    },
  ];

  return (
    <section id="services" className=" px-6 md:px-20 py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="max-w-xl">
            <div className="inline-block mb-6">
              <span className="bg-red-500 text-white text-lg font-bold px-6 py-2 rounded-lg shadow-lg transform -rotate-1 inline-block">
                Our Services
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Revolutionizing <span className="text-red-500">Blood Donation</span>
            </h2>
            <p className="text-gray-700 text-lg">
              Our digital platform connects donors with patients in need through innovative technology and streamlined processes. These life-saving services include:
            </p>
          </div>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bg} rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer h-full`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="p-8 h-full flex flex-col">
                {/* Icon and title area */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`${service.tagBg} p-3 rounded-xl shadow-md`}>
                    <div className={service.textColor}>
                      {service.icon}
                    </div>
                  </div>
                  <h3 className={`text-xl font-bold ${service.bg.includes('black') ? 'text-white' : 'text-gray-900'}`}>
                    {service.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className={`${service.bg.includes('black') ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                  {service.description}
                </p>
                
                {/* Image */}
                <div className="flex-grow flex items-center justify-center py-4 mb-6 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className={`h-40 object-contain transition-all duration-500 ${activeCard === index ? 'scale-110' : 'scale-100'}`}
                  />
                </div>
                
                {/* Learn more button */}
                <div className="mt-auto">
                  <a 
                    href="#" 
                    className={`flex items-center gap-3 ${service.bg.includes('black') ? 'text-white' : 'text-gray-900'} font-medium group`}
                  >
                    <div className={`w-10 h-10 rounded-full ${
                      service.bg.includes('black') ? 'bg-white text-black' : 'bg-black text-white'
                    } flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg`}>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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