import React, { useEffect, useState } from "react";
import { Bell, BrainCircuit } from "lucide-react";
import dayjs from "dayjs";

const  DonorPredictionList = ({ donors }) => {
  const [donorList, setDonorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const initial = donors.map((donor) => ({
      ...donor,
      prediction: "Not defined",
      predictionColor: null,
    }));
    setDonorList(initial);
  }, [donors]);

  const computeFeatures = (donor) => {
    const now = new Date();
    const parseDate = (dateStr) => new Date(dateStr);
    const recency = Math.floor(
      (now - parseDate(donor.last_donation_date)) / (1000 * 3600 * 24 * 30.44)
    );
    const time = Math.floor(
      (now - parseDate(donor.first_donation_date)) / (1000 * 3600 * 24 * 30.44)
    );
    return { recency, frequency: donor.frequence || 0, time };
  };

  const handlePredict = async () => {
    setLoading(true);
    const samples = donorList.map(computeFeatures);
    try {
      const res = await fetch("https://backendblooddonation.fly.dev/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ samples }),
      });

      const data = await res.json();
      const updated = donorList.map((donor, i) => ({
        ...donor,
        prediction: data.predictions[i] === 1 ? "Will Donate" : "Will Not Donate",
        predictionValue: data.predictions[i],
        predictionColor: data.predictions[i] === 1 ? "green" : "red",
      }));

      setDonorList(updated);
    } catch (error) {
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const sendNotifications = async (predictedValue) => {
    setSending(true);
    const targets = donorList.filter(
      (d) => d.predictionValue === predictedValue
    );

    try {
      for (const donor of targets) {
        await fetch("https://backendblooddonation.fly.dev/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to_email: donor.email,
            fullname: donor.fullname,
            prediction: donor.predictionValue,
          }),
        });
      }
      alert("Notifications sent successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to send notifications.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="px-4 mt-24">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Donor Predictions</h2>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handlePredict}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            <BrainCircuit size={18} />
            {loading ? "Predicting..." : "Predict"}
          </button>

          <button
            onClick={() => sendNotifications(1)}
            disabled={sending}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Bell size={18} />
            Notify Who Will Donate
          </button>

          <button
            onClick={() => sendNotifications(0)}
            disabled={sending}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            <Bell size={18} />
            Notify Who Will Not Donate
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {donorList.map((donor, index) => {
          const lastDonation = dayjs(donor.last_donation_date);
          const firstDonation = donor.first_donation_date
            ? dayjs(donor.first_donation_date).format("YYYY-MM-DD")
            : "N/A";
          const recency = dayjs().diff(lastDonation, "month");

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {donor.fullname}
              </h2>
              <div className="text-sm text-gray-700 space-y-1 mb-4">
                <p><span className="font-medium">Blood Type:</span> {donor.blood_type}</p>
                <p><span className="font-medium">Recency:</span> {recency} months</p>
                <p><span className="font-medium">Frequency:</span> {donor.frequence || 0}</p>
                <p><span className="font-medium">First Donation:</span> {firstDonation}</p>
                <p><span className="font-medium">Last Donation:</span> {lastDonation.format("YYYY-MM-DD")}</p>
                <p>
                  <span className="font-medium">Prediction:</span>{" "}
                  <span className={`font-bold ${donor.predictionColor === "green" ? "text-green-600" : donor.predictionColor === "red" ? "text-red-600" : "text-gray-500"}`}>
                    {donor.prediction}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default  DonorPredictionList

