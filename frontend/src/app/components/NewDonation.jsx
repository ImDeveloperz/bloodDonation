"use client";

import { useEffect, useState } from "react";
import { fetchDonationsByHospital } from "../lib/fetchDonationsByHospital";
import { Search, PlusCircle, X } from "lucide-react";

export default function Hospital({ hospitalName = "Default Hospital" }) {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchCIN, setSearchCIN] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    cin: "",
    fullname: "",
    email: "",
    num_tel: "",
    first_donation_date: "",
    blood_type: "A+",
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const loadDonations = async () => {
    const data = await fetchDonationsByHospital(hospitalName);
    setDonations(data);
    setFilteredDonations(data);
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

  // Submit new donor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const donorPayload = {
      cin: form.cin,
      fullname: form.fullname,
      email: form.email,
      num_tel: form.num_tel,
      blood_type: form.blood_type,
      hospital_id: form.hospital_id, // ensure this is passed from the form or context
    };
  
    try {
      const res = await fetch("http://localhost:8000/donors/add-or-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorPayload),
      });
  
      if (!res.ok) throw new Error("Failed to save donation");
  
      await loadDonations();
      setShowModal(false);
      setForm({
        cin: "",
        fullname: "",
        email: "",
        num_tel: "",
        hospital_id: "", // reset hospital if included
        blood_type: "A+",
      });
    } catch (err) {
      alert("Error adding donation.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInstantDonation = async (donor) => {
    const newDonation = {
      ...donor,
      id: donor.cin,
      last_donation_date: new Date().toISOString().split("T")[0],
    };
  
    try {
      // Call the backend API on port 8000 to check and update the frequency
      const res = await fetch(`http://localhost:8000/donors/${donor.id}/check-donation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDonation),
      });
  
      if (!res.ok) {
        throw new Error("Error");
      }
  
      // Handle the response from the backend
      const responseData = await res.json();
      
      if (responseData.message === "Donation frequency updated") {
        await loadDonations();
        alert(`Donation added for ${donor.fullname}. Frequency updated to: ${responseData.frequence}`);
      } else {
        alert(responseData.message);
      }
    } catch (err) {
      alert("Error adding donation.");
      console.error(err);
    }
  };
  

  return (
    <div className="p-6 text-black mt-32">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Donations - {hospitalName}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition"
        >
          <PlusCircle size={20} /> Add Donor
        </button>
      </div>

      {/* Search by CIN */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-500" />
        <input
          type="text"
          placeholder="Search by CIN"
          value={searchCIN}
          onChange={(e) => setSearchCIN(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-500"
        />
      </div>

      {/* Donor Cards */}
      <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-neutral-400">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donor) => (
            <div
              key={donor.id}
              className="min-w-[250px] my-4 flex-shrink-0 border p-4 rounded shadow bg-white"
            >
              <p><strong>Name:</strong> {donor.fullname}</p>
              <p><strong>Blood Type:</strong> {donor.blood_type}</p>
              <p><strong>Phone:</strong> {donor.num_tel}</p>
              <p><strong>Email:</strong> {donor.email}</p>
              <p><strong>Frequency:</strong> {donor.frequence ?? 1}</p>
              <p><strong>First Donation:</strong> {donor.first_donation_date}</p>
              <p><strong>Last Donation:</strong> {donor.last_donation_date}</p>
              <p><strong>CIN:</strong> {donor.cin ?? "N/A"}</p>
              <button
                onClick={() => handleInstantDonation(donor)}
                className="mt-2 text-sm text-white bg-red-600 hover:bg-red-500 px-3 py-1 rounded"
              >
                Add Donation
              </button>
            </div>
          ))
        ) : (
          <p className="text-neutral-600 font-medium">No results found.</p>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-neutral-600 hover:text-red-500"
            >
              <X size={22} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Add Donation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="cin"
                placeholder="CIN"
                value={form.cin}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={form.fullname}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
              <input
                type="tel"
                name="num_tel"
                placeholder="Phone"
                value={form.num_tel}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
             
              <select
                name="blood_type"
                value={form.blood_type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-neutral-400"
              >
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded transition"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
