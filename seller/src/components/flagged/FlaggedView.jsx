import React, { useEffect, useState } from "react";
import FlaggedBuyerCard from "./FlaggedBuyerCard";
import { Flag } from "lucide-react";

const FlaggedView = () => {
  const [flaggedBuyers, setFlaggedBuyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlaggedBuyers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5001/seller/flags", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch flagged buyers");
        }

        const data = await res.json();
        console.log("FLAGGED BUYERS:", data);

        setFlaggedBuyers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlaggedBuyers();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Flagged Buyers
      </h2>

      {flaggedBuyers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Flag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No flagged buyers</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flaggedBuyers.map((flag, index) => (
            <FlaggedBuyerCard key={flag._id || index} flag={flag} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlaggedView;