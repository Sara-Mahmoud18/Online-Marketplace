// buyer-app/src/components/auth/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from "../../../../backend/src/utils/auth";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token and user info
    
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;