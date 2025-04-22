import { useState, useEffect } from "react";

const DonorPredictionList = ({ donors }) => {
    const [donorList, setDonorList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const initial = Object.values(donors).map((donor) => ({
            ...donor,
            prediction: "Not defined",
        }));
        setDonorList(initial);
    }, [donors]);

    const computeFeatures = (donor) => {
        const now = new Date();
        const parseDate = (dateStr) => new Date(dateStr);

        const recency = Math.floor((now - parseDate(donor.last_donation_date)) / (1000 * 3600 * 24 * 30.44));
        const time = Math.floor((now - parseDate(donor.first_donation_date)) / (1000 * 3600 * 24 * 30.44));


        return {
            recency,
            frequency: donor.frequence || 0,
            time,
        };
    };

    const handlePredict = async () => {
        setLoading(true);

        const samples = donorList.map(computeFeatures);

        try {
            const res = await fetch("https://backprojectlifelinkai.fly.dev/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ samples }),
            });

            const contentType = res.headers.get("Content-Type") || "";

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error: ${res.status} - ${errorText}`);
            }

            if (!contentType.includes("application/json")) {
                const text = await res.text();
                throw new Error("Invalid JSON response:\n" + text);
            }

            const data = await res.json();

            const updated = donorList.map((donor, i) => ({
                ...donor,
                prediction: data.predictions[i] == 1 ? "Will Donate" : "Will Not Donate",
                predictionColor: data.predictions[i] == 1 ? "green" : "red",
            }));

            setDonorList(updated);
        } catch (error) {
            alert("Prediction failed");
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 mt-24">
            <button
                onClick={handlePredict}
                className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
                disabled={loading}
            >
                {loading ? "Predicting..." : "Predict"}
            </button>

            <table className="min-w-full border text-black border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">Full Name</th>
                        <th className="p-2">CIN</th>
                        <th className="p-2">Frequency</th>
                        <th className="p-2">Prediction</th>
                    </tr>
                </thead>
                <tbody>
                    {donorList.map((donor) => (
                        <tr key={donor.cin} className="text-center text-black border-t">
                            <td className="p-2">{donor.fullname}</td>
                            <td className="p-2">{donor.cin}</td>
                            <td className="p-2">{donor.frequence}</td>
                            <td className="p-2">
                                <span
                                    className={`font-semibold ${donor.predictionColor === "green"
                                            ? "text-green-600"
                                            : donor.predictionColor === "red"
                                                ? "text-red-600"
                                                : ""
                                        }`}
                                >
                                    {donor.prediction}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DonorPredictionList;
