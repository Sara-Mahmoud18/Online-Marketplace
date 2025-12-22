
import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Edit2, Save, LogOut, CheckCircle, XCircle } from "lucide-react";

const ProfilePage = ({ setIsLoggedIn }) => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5001/seller/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data);
        setFormData({
          username: data.username,
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5001/seller/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      setProfile(updated);
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Update failed: " + err.message });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (!profile)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
              <p className="text-indigo-100">Manage your account settings and preferences</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 -mt-20">
        {/* Message Alert */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top duration-300 ${
              message.type === "error"
                ? "bg-red-50 border border-red-200 text-red-800"
                : "bg-green-50 border border-green-200 text-green-800"
            }`}
          >
            {message.type === "error" ? (
              <XCircle size={24} className="flex-shrink-0" />
            ) : (
              <CheckCircle size={24} className="flex-shrink-0" />
            )}
            <p className="font-medium">{message.text}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 overflow-hidden">
          {/* Avatar Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 border-b border-slate-200">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {profile.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-1">
                  {profile.username}
                </h2>
                <p className="text-slate-500">Seller Account</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-auto flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-200"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  <User size={16} className="text-indigo-600" />
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter username"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-800 font-medium">
                    {profile.username}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  <Mail size={16} className="text-indigo-600" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter email address"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-800 font-medium">
                    {profile.email || "-"}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  <Phone size={16} className="text-indigo-600" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-800 font-medium">
                    {profile.phone || "-"}
                  </div>
                )}
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                  <MapPin size={16} className="text-indigo-600" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter location"
                  />
                ) : (
                  <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-800 font-medium">
                    {profile.location || "-"}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="mt-8 flex gap-4 justify-end">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      username: profile.username,
                      email: profile.email || "",
                      phone: profile.phone || "",
                      location: profile.location || "",
                    });
                  }}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-200 font-medium"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <User size={24} className="text-indigo-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Account Type</h3>
            <p className="text-slate-600">Seller Account</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Status</h3>
            <p className="text-slate-600">Active</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg shadow-slate-100">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Mail size={24} className="text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Verified</h3>
            <p className="text-slate-600">{profile.email ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
