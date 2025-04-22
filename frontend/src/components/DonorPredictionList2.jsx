import React, { useEffect, useState } from "react";
import { Bell, BrainCircuit, Droplet, User, Calendar, Activity, Search, ChevronDown, Clock, AlertCircle } from "lucide-react";
import dayjs from "dayjs";

const DonorPredictionList = ({ donors }) => {
  const [donorList, setDonorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [bloodStats, setBloodStats] = useState({
    total: 0,
    byType: {},
    potentialDonors: 0
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Add a filter function for the donors
  const filteredDonors = donorList.filter(donor => 
    donor.cin && donor.cin.toLowerCase().includes(searchQuery.toLowerCase())
  );



  useEffect(() => {
    const initial = donors.map((donor) => ({
      ...donor,
      prediction: "Not defined",
      predictionColor: null,
    }));
    setDonorList(initial);
  }, [donors]);

  useEffect(() => {
    // Calculate blood statistics whenever donor list or predictions change
    updateBloodStats();
  }, [donorList]);

  const updateBloodStats = () => {
    const BLOOD_PER_DONOR = 250; // ml per donor
    const stats = {
      total: 0,
      byType: {},
      potentialDonors: 0
    };
  
    // Use the filtered list instead of the complete list
    const donorsToCount = searchQuery ? filteredDonors : donorList;
  
    donorsToCount.forEach(donor => {
      const willDonate = donor.predictionValue === 1;
      
      // Count potential donors
      if (willDonate) {
        stats.potentialDonors++;
        stats.total += BLOOD_PER_DONOR;
        
        // Group by blood type
        if (!stats.byType[donor.blood_type]) {
          stats.byType[donor.blood_type] = {
            count: 0,
            volume: 0
          };
        }
        
        stats.byType[donor.blood_type].count++;
        stats.byType[donor.blood_type].volume += BLOOD_PER_DONOR;
      }
    });
  
    setBloodStats(stats);
  };

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


  const [notification, setNotification] = useState({
    show: false, 
    message: '', 
    type: 'success' // or 'error'
  });

  
  const handlePredict = async () => {
    setLoading(true);
    const samples = donorList.map(computeFeatures);
    try {
      const res = await fetch("https://backprojectlifelinkai.fly.dev/predict", {
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
        await fetch("https://backprojectlifelinkai.fly.dev/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to_email: donor.email,
            fullname: donor.fullname,
            prediction: donor.predictionValue,
          }),
        });
      }
      // Replace alert with this:
      setNotification({
        show: true,
        message: "Notifications sent successfully.",
        type: "success"
      });
    } catch (error) {
      console.error(error);
      // Replace alert with this:
      setNotification({
        show: true,
        message: "Failed to send notifications.",
        type: "error"
      });
    } finally {
      setSending(false);
    }
  };

  const getBloodTypeColor = (bloodType) => {
    const types = {
      'A+': 'bg-red-500',
      'A-': 'bg-red-400',
      'B+': 'bg-blue-500',
      'B-': 'bg-blue-400',
      'AB+': 'bg-purple-500',
      'AB-': 'bg-purple-400',
      'O+': 'bg-green-500',
      'O-': 'bg-green-400'
    };
    return types[bloodType] || 'bg-gray-500';
  };

  const getPredictionBadge = (prediction, color) => {
    if (color === "green") {
      return (
        <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
          <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>
          {prediction}
        </span>
      );
    } else if (color === "red") {
      return (
        <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-800">
          <span className="mr-1.5 h-2 w-2 rounded-full bg-red-500"></span>
          {prediction}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-800">
          <span className="mr-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
          {prediction}
        </span>
      );
    }
  };

  

  // Format milliliters for display, converting to liters when appropriate
  const formatBloodVolume = (ml) => {
    if (ml >= 1000) {
      return `${(ml / 1000).toFixed(1)}L`;
    }
    return `${ml}ml`;
  };

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({...notification, show: false});
      }, 5000); // Hide after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [notification.show]);


  useEffect(() => {
    updateBloodStats();
  }, [searchQuery, donorList]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg mt-16 rounded-xl">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-white flex items-center">
                <Droplet className="mr-2" size={32} strokeWidth={2.5} />
                CHU Ibn Rochd Blood Donations
              </h1>
              <p className="mt-1 text-red-100">
                Smart donor management and prediction system
              </p>
            </div>
            <div className="relative w-full md:w-64 mt-3 md:mt-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-red-300" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-full leading-5 bg-red-500 bg-opacity-25 text-white placeholder-red-200 focus:outline-none focus:bg-white focus:placeholder-gray-400 focus:text-gray-900 transition duration-150 ease-in-out"
                placeholder="Search by CIN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blood Stats Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Droplet className="mr-2 text-red-600" size={22} />
              Predicted Blood Collection
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total predicted volume */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
                <div className="text-red-600 font-semibold mb-1">Total Volume</div>
                <div className="text-3xl font-bold text-gray-800">
                  {formatBloodVolume(bloodStats.total)}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  From {bloodStats.potentialDonors} potential donors
                </div>
              </div>
              
              {/* Blood type breakdown */}
              <div className="col-span-1 md:col-span-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {Object.entries(bloodStats.byType).map(([type, data]) => (
                    <div key={type} className="text-center">
                      <div className={`${getBloodTypeColor(type)} inline-flex items-center justify-center text-white font-bold rounded-full h-10 w-10 mb-1`}>
                        {type}
                      </div>
                      <div className="text-lg font-bold">{formatBloodVolume(data.volume)}</div>
                      <div className="text-xs text-gray-500">{data.count} donors</div>
                    </div>
                  ))}
                  
                  {Object.keys(bloodStats.byType).length === 0 && (
                    <div className="col-span-full flex items-center justify-center py-4 text-gray-500 text-sm">
                      <AlertCircle size={16} className="mr-2" />
                      Run prediction to see blood volume by type
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <BrainCircuit className="mr-2 text-blue-600" size={24} />
            Donor Predictions
          </h2>
          <div className="flex gap-3 flex-wrap mt-4 md:mt-0">
            <button
              onClick={handlePredict}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 transform hover:-translate-y-0.5"
              disabled={loading}
            >
              <BrainCircuit size={18} />
              {loading ? "Predicting..." : "Predict"}
            </button>

            <button
              onClick={() => sendNotifications(1)}
              disabled={sending}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 transform hover:-translate-y-0.5"
            >
              <Bell size={18} />
              Notify Who Will Donate
            </button>

            <button
              onClick={() => sendNotifications(0)}
              disabled={sending}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 transform hover:-translate-y-0.5"
            >
              <Bell size={18} />
              Notify Who Will Not Donate
            </button>
          </div>
        </div>


        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {filteredDonors.length > 0 ? (
    filteredDonors.map((donor, index) => {
      const lastDonation = dayjs(donor.last_donation_date);
            const firstDonation = donor.first_donation_date
              ? dayjs(donor.first_donation_date).format("YYYY-MM-DD")
              : "N/A";
            const recency = dayjs().diff(lastDonation, "month");

            return (
              <div
                key={index}
                className="bg-white overflow-hidden rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <User className="mr-2 text-gray-500" size={18} />
                      {donor.fullname}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">CIN: {donor.cin || 'N/A'}</p>
                  </div>
                  <span className={`${getBloodTypeColor(donor.blood_type)} text-white font-bold py-1 px-3 rounded-full text-sm`}>
                    {donor.blood_type}
                  </span>
                </div>
                
                {/* Card Body */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="mr-2 text-gray-400" size={16} />
                      <span>Recency:</span>
                    </div>
                    <div className="font-medium text-right">{recency} months</div>
                    
                    <div className="flex items-center">
                      <Activity className="mr-2 text-gray-400" size={16} />
                      <span>Frequency:</span>
                    </div>
                    <div className="font-medium text-right">{donor.frequence || 0}</div>
                    
                    <div className="flex items-center">
                      <Calendar className="mr-2 text-gray-400" size={16} />
                      <span>First:</span>
                    </div>
                    <div className="font-medium text-right">{firstDonation}</div>
                    
                    <div className="flex items-center">
                      <Calendar className="mr-2 text-gray-400" size={16} />
                      <span>Last:</span>
                    </div>
                    <div className="font-medium text-right">{lastDonation.format("YYYY-MM-DD")}</div>
                  </div>
                </div>
                
                {/* Card Footer */}
                <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Prediction:</span>
                  {getPredictionBadge(donor.prediction, donor.predictionColor)}
                </div>
              </div>
            );
    })
  ) : (
    <div className="flex items-center justify-center w-full py-12 rounded-lg bg-red-50 border border-red-100">
        <div className="text-center">
          <Droplet size={40} className="mx-auto text-red-300 mb-2" />
          <p className="text-red-500 font-medium">No results found.</p>
        </div>
    </div>
  )}
</div>

      </div>
      {/* Notification Popup */}
{notification.show && (
  <div className="fixed bottom-4 right-4 max-w-md">
    <div className={`rounded-lg shadow-lg p-4 flex items-center justify-between ${
      notification.type === 'success' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'
    }`}>
      <div className="flex items-center">
        <div className={`rounded-full p-1 mr-3 ${
          notification.type === 'success' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
        }`}>
          {notification.type === 'success' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
        <p className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>
          {notification.message}
        </p>
      </div>
      <button 
        onClick={() => setNotification({...notification, show: false})}
        className="ml-4 text-gray-400 hover:text-gray-500"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default DonorPredictionList;