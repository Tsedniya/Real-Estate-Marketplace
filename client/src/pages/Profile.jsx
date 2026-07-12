import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  signOutUserStart, 
  signOutUserSuccess, 
  signOutUserFailure, 
  deleteUserFailure, 
  deleteUserSuccess, 
  deleteUserStart, 
  updateUserFailure, 
  updateUserSuccess, 
  updateUserStart 
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const fileRef = useRef(null);

  const primaryColor = "#022222";

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle text input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setFormData((prev) => ({
      ...prev,
      avatar: URL.createObjectURL(selectedFile),
    }));
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      setProgress(0);
      setSuccessMessage("");

      const data = new FormData();
      if (formData.username) data.append("username", formData.username);
      if (formData.email) data.append("email", formData.email);
      if (formData.password) data.append("password", formData.password);
      if (file) data.append("image", file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 30;
        });
      }, 300);

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      clearInterval(progressInterval);
      setProgress(100);

      const result = await res.json();
      if (result.success === false) {
        dispatch(updateUserFailure(result.message));
        setProgress(0);
        return;
      }

      dispatch(updateUserSuccess(result));
      setFormData({});
      setFile(null);
      setPreview(null);
      setSuccessMessage("✓ Profile updated successfully!");
      setProgress(0);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
      setProgress(0);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, { method: "DELETE", credentials: "include" });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout", { credentials: "include" });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-2">
              My Profile
            </h1>
            <p className="text-slate-600">Manage your account information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Image */}
            <div className="flex flex-col items-center">
              <div 
                className="relative cursor-pointer group"
                onClick={() => fileRef.current.click()}
              >
                <img
                  src={preview || currentUser?.avatar}
                  alt="profile"
                  className="rounded-3xl h-32 w-32 object-cover ring-4 ring-slate-100 group-hover:ring-[#022222] transition-all"
                />
               
              </div>
              <p className="text-xs text-slate-500 mt-3">Click to change photo</p>

              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                <input
                  className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#022222] focus:ring-1 focus:ring-[#022222] transition-all"
                  id="username"
                  type="text"
                  value={formData.username ?? (currentUser?.username || "")}
                  placeholder="Username"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#022222] focus:ring-1 focus:ring-[#022222] transition-all"
                  id="email"
                  type="email"
                  value={formData.email ?? (currentUser?.email || "")}
                  placeholder="Email"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                <input
                  className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#022222] focus:ring-1 focus:ring-[#022222] transition-all"
                  id="password"
                  type="password"
                  value={formData.password || ""}
                  placeholder="New password (optional)"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Progress Bar */}
            {progress > 0 && (
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Updating...</span>
                  <span className="text-sm font-semibold text-slate-700">{Math.min(Math.round(progress), 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#022222] to-[#044444] h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Update Button */}
            <button
              disabled={loading || progress > 0}
              className="w-full py-4 rounded-2xl text-white font-semibold text-lg tracking-widest transition-all hover:brightness-110 active:scale-[0.985] shadow-lg disabled:opacity-70"
              style={{ backgroundColor: primaryColor }}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

            {/* Success Message */}
            {successMessage && (
              <div className="w-full p-4 bg-green-50 border border-green-200 rounded-2xl">
                <p className="text-green-700 font-medium text-center text-sm">{successMessage}</p>
              </div>
            )}

            {/* Create Listing Link */}
            <Link
              to="/create-listing"
              className="w-full py-4 border border-slate-300 hover:border-[#022222] hover:text-[#022222] rounded-2xl text-center font-semibold transition-all block"
            >
              Create New Listing
            </Link>
          </form>

          {/* Danger Zone */}
          <div className="flex justify-between mt-10 pt-6 border-t border-slate-100 text-sm">
            <span
              onClick={handleDeleteUser}
              className="text-red-600 hover:text-red-700 cursor-pointer font-medium transition"
            >
              Delete Account
            </span>

            <span
              onClick={handleSignOut}
              className="text-slate-600 hover:text-slate-900 cursor-pointer font-medium transition"
            >
              Sign Out
            </span>
          </div>

          {error && (
            <p className="text-red-500 text-center mt-6 text-sm font-medium">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;