"use client"
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Heart } from 'lucide-react';

const testimonials = [
  {
    text: "We have been working with LifeLinkAi for the past year and have seen a significant improvement in the response time for critical donations.",
    name: "Dr. Sarah Karim",
    role: "Chief Medical Officer at Hope Hospital",
    rating: 5,
    impact: "Response time reduced by 67%"
  },
  {
    text: "The LifeLinkAi system helped us find a rare blood type donor within minutes. The map and alert features are extremely effective. Highly recommend to all hospitals.",
    name: "Nicolas Haddad",
    role: "Emergency Coordinator at City Clinic",
    rating: 5,
    impact: "Found rare blood type in 8 minutes"
  },
  {
    text: "As a donor, I finally feel connected and useful. I get real-time alerts when my blood type is needed. The experience is smooth, respectful, and meaningful.",
    name: "Leila Mansour",
    role: "Regular Blood Donor",
    rating: 5,
    impact: "Donated 12 times in the past year"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setAnimating(false), 500);
  };

  const prev = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setAnimating(false), 500);
  };

  const goToIndex = (index) => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // For parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <section 
      id="testimonials" 
      className="bg-gradient-to-b from-red-900 to-indigo-950 px-4 sm:px-6 md:px-20 py-16 md:py-24 text-white rounded-3xl overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 md:w-96 h-72 md:h-96 bg-red-500 rounded-full opacity-5"></div>
        <div className="absolute -bottom-32 -right-32 w-72 md:w-96 h-72 md:h-96 bg-red-500 rounded-full opacity-5"></div>
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-red-400 rounded-full opacity-30 blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-red-400 rounded-full opacity-20 blur-sm"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-16">
          <div>
            <div className="inline-block mb-4 md:mb-6">
              <span className="bg-red-500 text-white text-base md:text-lg font-bold px-4 md:px-6 py-1 md:py-2 rounded-lg shadow-lg transform -rotate-1 inline-block">
                Success Stories
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Trusted by <span className="text-red-400">Medical Professionals</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl">
              Hear real stories from the hospitals, donors, and patients who rely on LifeLinkAi to make blood donation more efficient and life-saving:
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Main testimonial card */}
          <div 
            className={`w-full rounded-3xl bg-gradient-to-br from-black/80 to-black border border-red-500/30 backdrop-blur-sm p-6 md:p-12 shadow-2xl transition-all duration-500 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Quote icon */}
            <div className="absolute -left-3 -top-3 w-12 h-12 md:w-16 md:h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg transform -rotate-6 z-10">
              <Quote className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>

            <div className="md:flex gap-8 items-start">
              {/* Avatar section (left) - hidden on mobile, shown on md screens and up */}
              <div className="hidden md:block md:w-1/4 text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gray-700 rounded-full mb-4 relative overflow-hidden border-2 border-red-500">
                  {/* Same image for all testimonials */}
                  <img 
                    src="https://randomuser.me/api/portraits/men/42.jpg" 
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                  ))}
                </div>
              </div>

              {/* Content section (right) */}
              <div className="md:w-3/4">
                {/* Mobile avatar and rating - only shown on small screens */}
                <div className="flex items-center gap-3 mb-4 md:hidden">
                  <div className="w-12 h-12 bg-gray-700 rounded-full relative overflow-hidden border-2 border-red-500">
                    <img 
                      src="https://randomuser.me/api/portraits/men/42.jpg" 
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-red-400 font-bold text-sm">{testimonials[activeIndex].name}</h4>
                    <div className="flex gap-1">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-red-500 text-red-500" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-base md:text-xl text-white leading-relaxed mb-4 md:mb-8 italic relative">
                  "{testimonials[activeIndex].text}"
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* Hide on mobile as we've moved it to the top */}
                  <div className="hidden md:block">
                    <h4 className="text-red-400 font-bold text-lg">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-400">{testimonials[activeIndex].role}</p>
                  </div>
                  
                  {/* Show role on mobile */}
                  <p className="text-gray-400 text-sm md:hidden">{testimonials[activeIndex].role}</p>
                  
                  <div className="bg-black/30 px-3 py-1 md:px-4 md:py-2 rounded-full flex items-center gap-2">
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-500" fill="red" />
                    <span className="text-white text-xs md:text-sm font-medium">{testimonials[activeIndex].impact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation controls - centered */}
          <div className="flex justify-between items-center mt-6 md:mt-8">
            {/* Left arrow */}
            <button
              onClick={prev}
              className="bg-black hover:bg-gray-900 border border-red-500/30 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            {/* Center indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-8 md:w-12 h-1 rounded-full transition-all ${
                    index === activeIndex ? 'bg-red-500' : 'bg-gray-700'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Right arrow */}
            <button
              onClick={next}
              className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}