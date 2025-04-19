
const services = [
  {
    title: 'Donor-Patient Matching',
    image: '/bdmatching.png',
    bg: 'bg-[#ffffff]',
    text: 'text-[#111111]', 
    titltbg: 'bg-[#FF5B5B]' 
  },
  {
    title: 'Interactive Donor Map',
    image: '/bdmap.png',
    bg: 'bg-[#FF5B5B]', 
    text: 'text-white',
    titltbg: 'bg-black'
  },
  {
    title: 'Automated Notifications',
    image: '/bdnotif.png',
    bg: 'bg-[#111111]', 
    text: 'text-white',
    titltbg: 'bg-[#FF5B5B]'
  },
  {
    title: 'Hospital Blood Requests',
    image: '/bdreq.png',
    bg: 'bg-[#fefefe]', 
    text: 'text-[#111111]',
    titltbg: 'bg-[#FF5B5B]'
  },
  {
    title: 'Donation History Tracking',
    image: '/bdh.png',
    bg: 'bg-[#E11D48]', 
    text: 'text-white',
    titltbg: 'bg-[#111111]' 
  },
  {
    title: 'Availability Alerts',
    image: '/bdalert.png',
    bg: 'bg-[#111111]',
    text: 'text-white',
    titltbg: 'bg-[#FF5B5B]'
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
              className={`rounded-2xl ${service.bg} ${service.text} overflow-hidden shadow-md transition p-6 flex flex-col justify-between relative`}
            >
              <div className="absolute top-8 left-4">
                <span className={` ${service.titltbg} text-white text-xl font-semibold px-2 py-1 ml-8 mt-16 rounded-md`}>
                  {service.title}
                </span>
              </div>
              <div className="flex-grow flex items-center justify-center pt-12 pb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-50 md:h-48 object-contain"
                />
              </div>

              <a href="#" className="flex items-center gap-2 text-sm font-medium px-2 pt-2">
                <div className="w-6 h-6 rounded-full bg-black text-[#FF5B5B] flex items-center justify-center">
                  <span className="text-sm">→</span>
                </div>
                <span className="text-black">Learn more</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  }