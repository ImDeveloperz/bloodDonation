export default function HeroSection() {
  return (
    <section className="flex pt-28  flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:px-20 py-12 md:pt-36 bg-white">
      {/* Left Text Content (appears second on mobile) */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left mt-10 md:mt-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          Connecting Lives Through Blood Donation
        </h1>
        <p className="text-gray-700 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
          Our blood donation platform empowers communities to save liaves by simplifying the process of donating and receiving blood. Join us in making a difference—one drop at a time.
        </p>
        <div>
          <button className="bg-black text-white px-6 py-3 rounded-md text-base sm:text-lg font-medium">
            Become a Donor
          </button>
        </div>
      </div>

      {/* Right Image (appears first on mobile) */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/heroblood.png"
          alt="Blood donation illustration"
          className="w-[80%] sm:w-[70%] md:w-full max-w-sm sm:max-w-md md:max-w-full"
        />
      </div>
    </section>
  );
}
