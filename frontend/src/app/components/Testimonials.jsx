"use client"
import React, { useEffect, useState } from 'react';

const testimonials = [
  {
    text: "We have been working with LifeLinkAi for the past year and have seen a significant improvement in the response time for critical donations. The platform is smart, responsive, and truly life-saving.",
    name: "Dr. Sarah Karim",
    role: "Chief Medical Officer at Hope Hospital"
  },
  {
    text: "The LifeLinkAi system helped us find a rare blood type donor within minutes. The map and alert features are extremely effective. Highly recommend to all hospitals.",
    name: "Nicolas Haddad",
    role: "Emergency Coordinator at City Clinic"
  },
  {
    text: "As a donor, I finally feel connected and useful. I get real-time alerts when my blood type is needed. The experience is smooth, respectful, and meaningful.",
    name: "Leila Mansour",
    role: "Regular Blood Donor"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="bg-[#0f0f11] px-6 md:px-20 py-16 text-white rounded-t-3xl overflow-hidden relative">
      <div className="flex justify-start mb-8">
        <h2 className="bg-[#FF5B5B] text-black text-lg font-semibold px-4 py-1 rounded-md">
          Testimonials
        </h2>
      </div>
      <p className="text-gray-300 mb-8 max-w-2xl">
        Hear from the people who rely on LifeLinkAi to save lives and optimize blood donations:
      </p>

      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-8 top-1/2 transform -translate-y-1/2 bg-[#FF5B5B] text-black w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10"
        >
          &lt;
        </button>

        {/* Card */}
        <div className="w-full max-w-3xl mx-auto bg-[#0f0f11] border border-[#FF5B5B] rounded-3xl px-6 py-6 relative">
          <div className="absolute -bottom-3 left-10 w-4 h-4 bg-[#0f0f11] border-l border-b border-[#FF5B5B] rotate-45"></div>
          <p className="text-sm text-white mb-4">“{testimonials[activeIndex].text}”</p>
          <p className="text-[#FF5B5B] font-semibold text-sm">{testimonials[activeIndex].name}</p>
          <p className="text-xs text-gray-400">{testimonials[activeIndex].role}</p>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-2 md:right-8 top-1/2 transform -translate-y-1/2 bg-[#FF5B5B] text-black w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10"
        >
          &gt;
        </button>
      </div>
    </section>
  );
}
