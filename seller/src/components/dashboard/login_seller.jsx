import React, { useState } from "react";

const AuthPage = ({ setIsLoggedIn }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    location: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      if (isSignUp) {
        // Signup
        const payload = {
          username: formData.username,
          password: formData.password,
          ...(formData.location && { location: formData.location }),
          ...(formData.email && { email: formData.email }),
          ...(formData.phone && { phone: formData.phone }),
        };

        const signupRes = await fetch("http://localhost:5001/seller/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const signupData = await signupRes.json();

        if (!signupRes.ok) {
          setMessage({ type: "error", text: signupData.message || "Sign Up failed" });
          return;
        }

        // Auto-login after signup
        const loginRes = await fetch("http://localhost:5001/seller/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        const loginData = await loginRes.json();
        if (!loginRes.ok) {
          setMessage({ type: "error", text: loginData.message || "Login failed after Sign Up" });
          return;
        }

        localStorage.setItem("token", loginData.token);
        localStorage.setItem("sellerFlagsCount", loginData.flags || 0);

        setIsLoggedIn(true);

      } else {
        // Login
        if (!formData.username || !formData.password) {
          setMessage({ type: "error", text: "Username and password are required" });
          return;
        }

        const loginRes = await fetch("http://localhost:5001/seller/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: formData.username, password: formData.password }),
        });

        const loginData = await loginRes.json();

        if (!loginRes.ok) {
          setMessage({ type: "error", text: loginData.message || "Login failed" });
          return;
        }

        localStorage.setItem("token", loginData.token);
        localStorage.setItem("sellerFlagsCount", loginData.flags || 0);

        setIsLoggedIn(true);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error: " + err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {message.text && (
          <div
            className={`mb-4 p-2 text-center rounded ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="mb-4 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="mb-4 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-300"
            required
          />

          {isSignUp && (
            <>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="mb-4 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mb-4 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-300"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="mb-4 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-300"
              />
            </>
          )}

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage({ type: "", text: "" });
            }}
            className="text-indigo-600 hover:underline font-medium"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;