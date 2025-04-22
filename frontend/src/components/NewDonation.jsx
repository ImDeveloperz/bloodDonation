import { useEffect, useState, useRef, useCallback } from "react";
import { fetchDonationsByHospital } from "../lib/fetchDonationsByHospital";
import { Search, Droplet, Phone, Mail, Calendar, User, CreditCard, Repeat, PlusCircle, X, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

export default function Hospital({ hospitalName, hospitalId }) {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchCIN, setSearchCIN] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    cin: "",
    fullname: "",
    email: "",
    num_tel: "",
    blood_type: "A+"
  });

  // Notification states
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success" // success or error
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    setLoading(true);
    fetchDonationsByHospital(hospitalName).then((data) => {
      // Sort by first_donation_date (oldest to newest)
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.first_donation_date);
        const dateB = new Date(b.first_donation_date);
        return dateB - dateA;
      });
      setDonations(sortedData);
      setFilteredDonations(sortedData);
      setLoading(false);
    });
  }, [hospitalName]);

  useEffect(() => {
    // Sort by first_donation_date (oldest to newest)
    const sortedData = donations.sort((a, b) => {
      const dateA = new Date(a.first_donation_date);
      const dateB = new Date(b.first_donation_date);
      return dateB - dateA;
    });
    if (searchCIN.trim() === "") {
      setFilteredDonations(sortedData);
    } else {
      setFilteredDonations(
        sortedData.filter((donor) =>
          donor.cin.toLowerCase().includes(searchCIN.toLowerCase())
        )
      );
    }
  }, [searchCIN, donations]);

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Blood type styling
  const bloodTypeColors = {
    "A+": { bg: "bg-red-100", text: "text-red-800", gradient: "from-red-600 to-red-400" },
    "A-": { bg: "bg-red-50", text: "text-red-700", gradient: "from-red-500 to-red-300" },
    "B+": { bg: "bg-blue-100", text: "text-blue-800", gradient: "from-blue-600 to-blue-400" },
    "B-": { bg: "bg-blue-50", text: "text-blue-700", gradient: "from-blue-500 to-blue-300" },
    "AB+": { bg: "bg-purple-100", text: "text-purple-800", gradient: "from-purple-600 to-purple-400" },
    "AB-": { bg: "bg-purple-50", text: "text-purple-700", gradient: "from-purple-500 to-purple-300" },
    "O+": { bg: "bg-green-100", text: "text-green-800", gradient: "from-green-600 to-green-400" },
    "O-": { bg: "bg-green-50", text: "text-green-700", gradient: "from-green-500 to-green-300" },
  };

  const loadDonations = async () => {
    const data = await fetchDonationsByHospital(hospitalName);
    // Sort by first_donation_date (oldest to newest)
    const sortedData = data.sort((a, b) => {
      const dateA = new Date(a.first_donation_date);
      const dateB = new Date(b.first_donation_date);
      return dateB - dateA;
    });
    setDonations(sortedData);
    setFilteredDonations(sortedData);
  };

  useEffect(() => {
    loadDonations();
  }, [hospitalName]);


  // Filter by CIN
  useEffect(() => {
    if (searchCIN.trim() === "") {
      setFilteredDonations(donations);
    } else {
      setFilteredDonations(
        donations.filter((donor) =>
          donor.cin?.toLowerCase().includes(searchCIN.toLowerCase())
        )
      );
    }
  }, [searchCIN, donations]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Show notification function
  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  // Submit new donor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Update your handleSubmit function to include the hospital_id
    const donorPayload = {
      cin: form.cin,
      fullname: form.fullname,
      email: form.email,
      num_tel: form.num_tel,
      blood_type: form.blood_type,
      hospital_id: hospitalId,  // Use the hospitalName prop
    };

    try {
      const res = await fetch("https://backprojectlifelinkai.fly.dev/donors/add-or-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error response:", errorData);
        throw new Error(`Failed to save donation: ${errorData.detail || "Unknown error"}`);
      }

      await loadDonations();
      setShowModal(false);
      setForm({
        cin: "",
        fullname: "",
        email: "",
        num_tel: "",
        blood_type: "A+",
      });

      // Show success notification
      showNotification(`Donor ${donorPayload.fullname} added successfully!`);
    } catch (err) {
      // Show error notification
      showNotification(`Error adding donor: ${err.message}`, "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInstantDonation = async (donor) => {
    const newDonation = {
      ...donor,
      id: donor.cin,
      hospital_id: "user1",
      last_donation_date: new Date().toISOString().split("T")[0],
    };

    try {
      // Call the backend API on port 8000 to check and update the frequency
      const res = await fetch(`https://backprojectlifelinkai.fly.dev/donors/${donor.id}/check-donation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDonation),
      });

      if (!res.ok) {
        throw new Error("Error processing donation");
      }

      // Handle the response from the backend
      const responseData = await res.json();

      if (responseData.message === "Donation frequency updated") {
        await loadDonations();
        // Show success notification
        showNotification(`Donation added for ${donor.fullname}.`);
      } else {
        // Show info notification
        showNotification(responseData.message, "info");
      }
    } catch (err) {
      // Show error notification
      showNotification(`Error adding donation: ${err.message}`, "error");
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-red-50 pb-16">
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

      {/* Notification Toast */}
      {notification.show && (
        <div
          className={`fixed bottom-4 right-6 z-50 p-4 rounded-lg shadow-lg max-w-md animate-slide-in-right flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-50 border-l-4 border-green-500' :
              notification.type === 'error' ? 'bg-red-50 border-l-4 border-red-500' :
                'bg-blue-50 border-l-4 border-blue-500'
            }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
          ) : notification.type === 'error' ? (
            <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
          ) : (
            <Droplet className="text-blue-500 flex-shrink-0" size={20} />
          )}
          <div className="flex-1">
            <p className={`text-sm font-medium ${notification.type === 'success' ? 'text-green-800' :
                notification.type === 'error' ? 'text-red-800' :
                  'text-blue-800'
              }`}>
              {notification.message}
            </p>
          </div>
          <button
            onClick={() => setNotification({ ...notification, show: false })}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Header with animated gradient */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 shadow-xl mb-8 mt-24">
          <div className="absolute inset-0 bg-[url('/api/placeholder/400/200')] opacity-10 mix-blend-overlay"></div>
          <div className="relative px-8 py-10 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {hospitalName}
              </h1>
              <p className="text-red-100 max-w-xl">
                Blood Donation Management System
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 md:mt-0 group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-red-500/20"
            >
              <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              Add New Donor
            </button>
          </div>
          <div className="absolute -bottom-6 right-10">
            <Droplet size={120} className="text-red-100 opacity-20" />
          </div>
        </div>

        {/* Search and Stats Bar */}
        <div className="relative mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
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
          </div>

          <div className="flex gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-red-100">
              <div className="text-xs text-gray-500">Total Donors</div>
              <div className="text-2xl font-bold text-gray-800">{donations.length}</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-red-100">
              <div className="text-xs text-gray-500">Search Results</div>
              <div className="text-2xl font-bold text-gray-800">{filteredDonations.length}</div>
            </div>
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
          {filteredDonations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {filteredDonations.map((donor, index) => (
                <div
                  key={donor.id}
                  className="rounded-xl shadow-lg bg-white border border-red-100 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in h-full"
                >
                  {/* Blood type header */}
                  <div className={`px-4 py-3 bg-gradient-to-r ${bloodTypeColors[donor.blood_type]?.gradient || "from-gray-700 to-gray-600"} text-white flex items-center justify-between`}>
                    <div className="flex items-center">
                      <Droplet size={20} className="mr-2" />
                      <span className="font-bold">{donor.blood_type}</span>
                    </div>
                    <div className="flex items-center">
                      <Repeat size={16} className="mr-1" />
                      <span className="font-medium">{donor.frequence || 1} donations</span>
                    </div>
                  </div>

                  {/* Donor information */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{donor.fullname}</h3>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <CreditCard size={16} className="mr-2 text-red-500" />
                        <span>{donor.cin || "N/A"}</span>
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
                      <div className="grid grid-cols-2 gap-3 text-xs mb-4">
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

                      {/* Add donation button */}
                      <button
                        onClick={() => handleInstantDonation(donor)}
                        className="w-full mt-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Droplet size={16} />
                        Add Donation
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
        </div>
      </div>

      {/* Modal Form with Glassmorphism */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl w-full max-w-md relative shadow-2xl border border-white/50 animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-colors"
            >
              <X size={22} />
            </button>
            <div className="text-center mb-6">
              <Droplet size={40} className="mx-auto text-red-500 mb-2" />
              <h2 className="text-2xl font-semibold text-gray-800">Add New Donor</h2>
              <p className="text-gray-500">Enter the donor's information below</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-700 font-medium">CIN</label>
                <input
                  type="text"
                  name="cin"
                  placeholder="Enter CIN"
                  value={form.cin}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Enter full name"
                  value={form.fullname}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-700 font-medium">Phone</label>
                <input
                  type="tel"
                  name="num_tel"
                  placeholder="Enter phone number"
                  value={form.num_tel}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-700 font-medium">Blood Type</label>
                <select
                  name="blood_type"
                  value={form.blood_type}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/50 appearance-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
                >
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30 mt-4 font-medium"
              >
                {loading ? "Saving..." : "Add Donor"}
              </button>
            </form>
          </div>
        </div>
      )}

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
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-in {
          animation: modal-in 0.3s ease-out forwards;
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
