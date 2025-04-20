import { useEffect, useState, useRef, useCallback } from "react";
import { fetchDonationsByHospital } from "../lib/fetchDonationsByHospital";
import { Search, Droplet, Phone, Mail, Calendar, User, CreditCard, Repeat, Loader2 } from "lucide-react";

export default function Hospital({ hospitalName }) {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchCIN, setSearchCIN] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [visibleDonations, setVisibleDonations] = useState([]);
  const ITEMS_PER_PAGE = 9; // Load 9 items per page (3 rows of 3)

  const observer = useRef();
  const lastDonationElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreDonations();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setLoading(true);
    fetchDonationsByHospital(hospitalName).then((data) => {
      setDonations(data);
      setFilteredDonations(data);
      setLoading(false);
    });
  }, [hospitalName]);

  useEffect(() => {
    console.log(donations);
  }, [donations]);

  useEffect(() => {
    if (searchCIN.trim() === "") {
      setFilteredDonations(donations);
    } else {
      setFilteredDonations(
        donations.filter((donor) =>
          donor.cin.toLowerCase().includes(searchCIN.toLowerCase())
        )
      );
    }
    setPage(1);
    setHasMore(true);
  }, [searchCIN, donations]);

  useEffect(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    setVisibleDonations(filteredDonations.slice(0, endIndex));
    setHasMore(endIndex < filteredDonations.length);
  }, [filteredDonations, page]);

  const loadMoreDonations = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Blood type pill color mapping
  const bloodTypeColors = {
    "A+": "bg-red-100 text-red-800",
    "A-": "bg-red-50 text-red-700",
    "B+": "bg-blue-100 text-blue-800",
    "B-": "bg-blue-50 text-blue-700",
    "AB+": "bg-purple-100 text-purple-800",
    "AB-": "bg-purple-50 text-purple-700",
    "O+": "bg-green-100 text-green-800",
    "O-": "bg-green-50 text-green-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-red-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute opacity-20 bg-red-400 rounded-full blur-xl"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Header with animated gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 shadow-xl mb-8 mt-32">
          <div className="absolute inset-0 bg-[url('/api/placeholder/400/200')] opacity-10 mix-blend-overlay"></div>
          <div className="relative px-8 py-12">
            <h1 className="text-4xl font-bold text-white mb-2">
              {hospitalName} Blood Donations
            </h1>
            <p className="text-red-100 max-w-xl">
              Track and manage blood donations for your hospital. Search for donors by their identification number.
            </p>
          </div>
          <div className="absolute -bottom-6 right-10">
            <Droplet size={120} className="text-red-100 opacity-20" />
          </div>
        </div>
        
        {/* Search Component */}
        <div className="relative max-w-md mx-auto mb-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-red-500" />
          </div>
          <input
            type="text"
            placeholder="Search by CIN"
            value={searchCIN}
            onChange={(e) => setSearchCIN(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border-0 ring-1 ring-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none shadow-sm bg-white text-gray-900"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="text-sm text-red-400">
              {filteredDonations.length} result{filteredDonations.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        
        {/* Grid Layout - 3 per row on laptop, 1 on mobile */}
        <div className="relative">
          {/* Results header */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Available Donors</h2>
            <div className="h-1 flex-grow mx-4 bg-gradient-to-r from-transparent via-red-200 to-transparent"></div>
          </div>
          
          {/* Grid container */}
          {visibleDonations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
              {visibleDonations.map((donor, index) => {
                const isLastElement = index === visibleDonations.length - 1;
                return (
                  <div
                    key={donor.id}
                    ref={isLastElement ? lastDonationElementRef : null}
                    className="rounded-xl shadow-lg bg-white border border-red-100 overflow-hidden h-full transform transition hover:scale-105 hover:shadow-xl animate-fade-in"
                  >
                    {/* Blood type header */}
                    <div className={`px-4 py-3 ${bloodTypeColors[donor.blood_type] || "bg-gray-100 text-gray-800"} flex items-center justify-between`}>
                      <div className="flex items-center">
                        <Droplet size={20} className="mr-2" />
                        <span className="font-bold">{donor.blood_type}</span>
                      </div>
                      <div className="flex items-center">
                        <Repeat size={16} className="mr-1" />
                        <span className="font-medium">{donor.frequence} donations</span>
                      </div>
                    </div>
                    
                    {/* Donor information */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{donor.fullname}</h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <CreditCard size={16} className="mr-2 text-red-500" />
                          <span>{donor.cin}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone size={16} className="mr-2 text-red-500" />
                          <span>{donor.num_tel}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail size={16} className="mr-2 text-red-500" />
                          <span className="truncate">{donor.email}</span>
                        </div>
                      </div>
                      
                      {/* Donation dates */}
                      <div className="pt-3 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <div className="text-gray-500 mb-1">First Donation</div>
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1 text-red-500" />
                              <span>{donor.first_donation_date}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">Last Donation</div>
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1 text-red-500" />
                              <span>{donor.last_donation_date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full py-12 rounded-lg bg-red-50 border border-red-100">
              <div className="text-center">
                <Droplet size={40} className="mx-auto text-red-300 mb-2" />
                <p className="text-red-500 font-medium">No results found.</p>
                <p className="text-red-400 text-sm mt-1">Try adjusting your search criteria.</p>
              </div>
            </div>
          )}
          
          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 size={30} className="text-red-400 animate-spin" />
            </div>
          )}
          
          {/* End of results indicator */}
          {!loading && !hasMore && visibleDonations.length > 0 && (
            <div className="text-center py-8 text-red-400">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-3" />
              End of results
            </div>
          )}
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, -15px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}