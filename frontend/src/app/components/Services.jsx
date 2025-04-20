const services = [
  {
    title: 'Donor-Patient Matching',
    image: '/bdmatching.png',
    bg: 'bg-gray-100',
    tagBg: 'bg-[#FF5B5B]',
    textColor: 'text-black'
  },
  {
    title: 'Interactive Donor Map',
    image: '/bdmap.png',
    bg: 'bg-[#FF5B5B]',
    tagBg: 'bg-white',
    textColor: 'text-black'
  },
  {
    title: 'Automated Notifications',
    image: '/bdnotif.png',
    bg: 'bg-[#111111]',
    tagBg: 'bg-[#FF5B5B]',
    textColor: 'text-black'
  },
  {
    title: 'Hospital Blood Requests',
    image: '/bdreq.png',
    bg: 'bg-gray-100',
    tagBg: 'bg-[#FF5B5B]',
    textColor: 'text-black'
  },
  {
    title: 'Donation History Tracking',
    image: '/bdh.png',
    bg: 'bg-[#FF5B5B]',
    tagBg: 'bg-[#111111]',
    textColor: 'text-white'
  },
  {
    title: 'Availability Alerts',
    image: '/bdalert.png',
    bg: 'bg-[#111111]',
    tagBg: 'bg-[#FF5B5B]',
    textColor: 'text-black'
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#fefefe] px-6 md:px-20 py-16 md:mx-auto">
      <div className="flex justify-start mb-8">
        <h2 className="bg-[#FF5B5B] text-black text-lg font-semibold px-4 py-1 rounded-md">
          Services
        </h2>
      </div>
      <p className="text-gray-700 mb-8 max-w-2xl">
        At our digital blood donation platform, we offer a range of services to match donors and hospitals efficiently. These services include:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
  {services.map((service, index) => (
    <div
      key={index}
      className={`${service.bg} rounded-3xl overflow-hidden shadow-md p-6 flex flex-col justify-between relative border border-b-[5px]`}
      style={{ borderRadius: '24px' }}
    >
      <div className="mb-4">
        <span
          className={`${service.tagBg} ${service.textColor} text-sm font-medium px-3 py-2 rounded-md inline-block`}
        >
          {service.title}
        </span>
      </div>

      <div className="flex-grow flex items-center justify-center py-4">
        <img
          src={service.image}
          alt={service.title}
          className="h-40 md:h-36 object-contain"
        />
      </div>

      <div className="mt-4">
        <a href="#" className="flex items-center gap-2 text-sm font-medium">
          <div
            className={`w-8 h-8 rounded-full ${
              service.bg === 'bg-[#111111]'
                ? 'bg-white text-black'
                : 'bg-black text-white'
            } flex items-center justify-center`}
          >
            <span className="text-sm">→</span>
          </div>
          <span
            className={`${
              service.bg === 'bg-[#111111]' ? 'text-white' : 'text-black'
            }`}
          >
            Learn more
          </span>
        </a>
      </div>
    </div>
  ))}
</div>
``

    </section>
  );
}