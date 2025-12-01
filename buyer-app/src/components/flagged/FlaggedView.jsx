import React from 'react';
import FlaggedBuyerCard from './FlaggedBuyerCard';
import { Flag } from 'lucide-react';

const flaggedBuyers = [
  {
    "username": "a_smith",
    "location": "Los Angeles, CA",
    "email": "asmith@webmail.org",
    "phone": "555-987-6543"
  },
  {
    "username": "tech_guru",
    "password": "hashed_password_789",
    "location": "Austin, TX",
    "email": "techguru@corp.net",
    "phone": "555-555-1212"
  },
  {
    "username": "user_2024",
    "password": "hashed_password_101",
    "location": "Miami, FL",
    "email": "user2024@mail.co",
    "phone": "555-222-3333"
  },
  {
    "username": "beta_boss",
    "password": "hashed_password_202",
    "location": "Seattle, WA",
    "email": "betaboss@test.dev",
    "phone": "555-444-5555"
  }
]

const FlaggedView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Flagged Sellers</h2>
      {flaggedBuyers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Flag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No flagged sellers</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flaggedBuyers.map(flag => (
            <FlaggedBuyerCard key={flag.id} flag={flag} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlaggedView;
