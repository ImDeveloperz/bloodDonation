"use client";

import React, { useEffect, useState } from "react";
import HeaderAfterAuth from "../components/HeaderAfterAuth";
import DonorPredictionList from "../components/DonorPredictionList2";
import { fetchDonationsByHospital } from "../lib/fetchDonationsByHospital";
import useProtectedRoute from "../hooks/useProtectedRoute";
import { Droplet} from "lucide-react";
import dayjs from "dayjs";

const Page = () => {
  useProtectedRoute();
  const [donors, setDonors] = useState([]);
  const hospitalName = "CHU Ibn Rochd";

  useEffect(() => {
    fetchDonationsByHospital(hospitalName).then((data) => {
      const donorsArray = Object.values(data);

      const filtered = donorsArray.filter((donor) => {
        if (!donor.last_donation_date) return false;
        const diffMonths = dayjs().diff(dayjs(donor.last_donation_date), "month");
        return diffMonths > 3;
      });

      setDonors(filtered);
    });
  }, []);

  return (
    <div className="min-h-screen pt-10 bg-gray-50">
      <HeaderAfterAuth />
      <main className="max-w-6xl mx-auto px-4 py-10">
        {donors.length === 0 ? (
          <div className="flex items-center justify-center w-full mt-24 py-12 rounded-lg bg-red-50 border border-red-100">
          <div className="text-center ">
            <Droplet size={40} className="mx-auto text-red-300 mb-2" />
            <p className="text-red-500 font-medium">No donors to display.</p>
          </div>
      </div>
        ) : (
          <DonorPredictionList donors={donors} />
        )}
      </main>
    </div>
  );
};

export default Page;
