"use client";

import React, { useEffect, useState } from "react";
import HeaderAfterAuth from "../components/HeaderAfterAuth";
import DonorPredictionList from "../components/DonorPredictionList2";
import { fetchDonationsByHospital } from "../lib/fetchDonationsByHospital";
import useProtectedRoute from "../hooks/useProtectedRoute";
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
          <div className="text-center text-gray-600 text-lg">No donors to display.</div>
        ) : (
          <DonorPredictionList donors={donors} />
        )}
      </main>
    </div>
  );
};

export default Page;
