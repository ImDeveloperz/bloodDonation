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
      className="bg-gradient-to-b from-[#0f0f11] to-[#1a1a1d] px-6 md:px-20 py-24 text-white rounded-3xl overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-500 rounded-full opacity-5"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-500 rounded-full opacity-5"></div>
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-red-500 rounded-full opacity-30 blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-red-500 rounded-full opacity-20 blur-sm"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <div className="inline-block mb-6">
              <span className="bg-red-500 text-black text-lg font-bold px-6 py-2 rounded-lg shadow-lg transform -rotate-1 inline-block">
                Success Stories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by <span className="text-red-500">Medical Professionals</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl">
              Hear real stories from the hospitals, donors, and patients who rely on LifeLinkAi to make blood donation more efficient and life-saving:
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Main testimonial card */}
          <div 
            className={`w-full rounded-3xl bg-gradient-to-br from-black/80 to-black border border-red-500/30 backdrop-blur-sm p-8 md:p-12 shadow-2xl transition-all duration-500 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Quote icon */}
            <div className="absolute -left-3 -top-3 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg transform -rotate-6 z-10">
              <Quote className="w-8 h-8 text-black" />
            </div>

            <div className="md:flex gap-8 items-start">
              {/* Avatar section (left) */}
              <div className="hidden md:block md:w-1/4 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full mb-4 relative overflow-hidden border-2 border-red-500">
                  {/* Same image for all testimonials */}
                  <img 
                    src="https://randomuser.me/api/portraits/men/7.jpg" 
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
                <p className="text-xl text-white leading-relaxed mb-8 italic relative">
                  "{testimonials[activeIndex].text}"
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-red-500 font-bold text-lg">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-400">{testimonials[activeIndex].role}</p>
                  </div>
                  
                  <div className="bg-black/30 px-4 py-2 rounded-full flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" fill="#ff5b5b" />
                    <span className="text-white text-sm font-medium">{testimonials[activeIndex].impact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation controls - centered */}
          <div className="flex justify-between items-center mt-8">
            {/* Left arrow */}
            <button
              onClick={prev}
              className="bg-black hover:bg-gray-900 border border-red-500/30 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            {/* Center indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-12 h-1 rounded-full transition-all ${
                    index === activeIndex ? 'bg-red-500' : 'bg-gray-700'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Right arrow */}
            <button
              onClick={next}
              className="bg-red-500 hover:bg-red-600 text-black w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}