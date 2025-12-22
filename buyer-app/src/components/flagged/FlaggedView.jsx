import React from 'react';
import FlaggedBuyerCard from './FlaggedBuyerCard';
import { Flag } from 'lucide-react';



const FlaggedView = ({FlaggedSellers}) => {
  // console.log(FlaggedSellers);
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Flagged Sellers</h2>
      {FlaggedSellers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Flag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No flagged sellers</p>
        </div>
      ) : (
        <div className="space-y-4">
          {FlaggedSellers.map((flag,index) => (
            <FlaggedBuyerCard key={index} flag={flag} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlaggedView;
