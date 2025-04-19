"use client";

import { useEffect, useState } from "react";
import { fetchDonationsByHospital } from "../lib/fetchDonationsByHospital";
import { Search } from "lucide-react";
export default function Hospital({ hospitalName }) {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchCIN, setSearchCIN] = useState("");

  useEffect(() => {
    fetchDonationsByHospital(hospitalName).then((data) => {
      setDonations(data);
      setFilteredDonations(data);
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
  }, [searchCIN, donations]);

  return (
    <div className="p-4 text-black mt-32">
      <h2 className="text-2xl font-bold mb-6 ">
        Donations for {hospitalName}
      </h2>

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

      {/* Slider Container */}
      <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-red-400">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donor) => (
            <div
              key={donor.id}
              className="min-w-[250px] my-6 flex-shrink-0 border p-4 rounded shadow-md bg-white"
            >
              <p>
                <strong>Name:</strong> {donor.fullname}
              </p>
              <p>
                <strong>Blood Type:</strong> {donor.blood_type}
              </p>
              <p>
                <strong>Phone:</strong> {donor.num_tel}
              </p>
              <p>
                <strong>Email:</strong> {donor.email}
              </p>
              <p>
                <strong>Number of donations:</strong> {donor.frequence}
              </p>
              <p>
                <strong>First Donation:</strong> {donor.first_donation_date}
              </p>
              <p>
                <strong>Last Donation:</strong> {donor.last_donation_date}
              </p>
              <p>
                <strong>CIN:</strong> {donor.cin}
              </p>
            </div>
          ))
        ) : (
          <p className="text-red-500 font-medium">Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
}
