
import React from 'react';
import { Flag } from 'lucide-react';

const FlaggedBuyerCard = ({ flag }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start gap-4">
        <Flag className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{flag.username}</h3>
          <p className="text-sm text-gray-600 mt-1">Email: {flag.email}</p>
          <p className="text-sm text-gray-600 mt-1">Phone: {flag.phone}</p>
          <p className="text-sm text-gray-600 mt-1">Location: {flag.location}</p>
        </div>
      </div>
    </div>
  );
};

export default FlaggedBuyerCard;

