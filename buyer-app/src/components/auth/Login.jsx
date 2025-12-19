import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ onLoginHandler }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ... inside Login component
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await onLoginHandler(formData);

      if (result.success) {
        navigate('/dashboard');
      } else {
        // FIX: result.error already contains the message string from onLoginHandler
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      // FIX: Ensure we save a string, not an object
      setError(err.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Buyer Login
        </h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">username</label>
            <input
              type="username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
