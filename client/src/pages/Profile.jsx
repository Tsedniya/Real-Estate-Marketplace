import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadToSupabase } from "../components/uploadToSupabase";
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
  const [userListings, setUserListings] = useState([]);
  const fileRef = useRef(null);

  const primaryColor = "#022222";

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

  
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  dispatch(updateUserStart());

  try {
    let avatarUrl = currentUser.avatar;

    if (file) {
      avatarUrl = await uploadToSupabase(file);

      console.log("New avatar URL:", avatarUrl);

      if (!avatarUrl) {
        throw new Error("Image upload failed");
      }
    }

    const data = {
      avatar: avatarUrl,
    };

    if (formData.username)
      data.username = formData.username;

    if (formData.email)
      data.email = formData.email;

    if (formData.password)
      data.password = formData.password;

    console.log("Sending data:", data);

    const res = await fetch(
      `/api/user/update/${currentUser._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();

    console.log("Response:", result);

    if (!res.ok) {
      throw new Error(result.message);
    }

    dispatch(updateUserSuccess(result));

    setSuccessMessage(
      "✓ Profile updated successfully!"
    );

  } catch (err) {
    console.log(err);
    dispatch(updateUserFailure(err.message));
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

  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`, 
      { method: "GET", credentials: "include" });
      const data = await res.json();
      setUserListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setUserListings(userListings.filter(listing => listing._id !== listingId));
        setSuccessMessage("✓ Listing deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleEditListing = (listingId) => {
    window.location.href = `/edit-listing/${listingId}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="w-full bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100">
          <div className="text-center mb-10 px-8 pt-8">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-2">
              My <span className="text-blue-500">Profile</span>
            </h1>
            <p className="text-sm text-slate-500">Manage your account information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 px-8 pb-8">
            <div className="flex flex-col items-center">
              <div 
                className="relative cursor-pointer group"
                onClick={() => fileRef.current.click()}
              >
                <img
                  src={preview || currentUser?.avatar}
                  alt="profile"
                  className="rounded-3xl h-32 w-32 object-cover ring-4 ring-slate-100 group-hover:ring-blue-500 transition-all"
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

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                <input
                  className="h-10 text-sm border border-slate-200 focus:border-blue-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 w-full rounded-2xl px-3"
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
                  className="h-10 text-sm border border-slate-200 focus:border-blue-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 w-full rounded-2xl px-3"
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
                    className="h-10 text-smborder border-slate-200 focus:border-blue-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 w-full rounded-2xl px-3"
                    id="password"
                    type="password"
                    value={formData.password || ""}
                    placeholder="New password (optional)"
                    onChange={handleChange}
                  />
              </div>
            </div>

            {progress > 0 && (
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Updating...</span>
                  <span className="text-sm font-semibold text-slate-700">{Math.min(Math.round(progress), 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button
              disabled={loading || progress > 0}
              className="w-full h-10 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>

            {successMessage && (
              <div className="w-full p-4 bg-green-50 border border-green-200 rounded-2xl">
                <p className="text-green-700 font-medium text-center text-sm">{successMessage}</p>
              </div>
            )}

            <Link
            to="/create-listing"
            className="w-full h-10 flex items-center justify-center border border-slate-300 hover:border-blue-600 hover:text-blue-600 rounded-lg text-center text-sm font-medium transition-all block text-slate-700"
          >
            Create New Listing
          </Link>
          </form>

          <div className="flex justify-between mt-3 pt-3 px-8 border-t border-slate-100 text-sm">
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
            <p className="text-red-500 text-center mt-6 text-sm font-medium px-8">{error}</p>
          )}
          <button onClick={handleShowListings} className="text-blue-600 w-full mt-4 mb-4 font-medium">
            Show Listing
          </button>
             {userListings && userListings.length > 0 && (
                <div className="flex flex-col gap-4 px-8 pb-8">
                  <h1 className="text-center mt-7 text-2xl font-semibold text-slate-900">
                    Your Listings
                  </h1>

                  {userListings.map((listing) => (
                    <div
                      key={listing._id}
                      className="flex items-center justify-between rounded-lg p-3 shadow-sm border border-slate-100"
                    >
                      <Link
                        to={`/listing/${listing._id}`}
                        className="flex items-center gap-4 flex-1"
                      >
                        <img
                          src={listing.imageUrl}
                          alt={listing.name}
                          className="h-20 w-20 object-cover rounded"
                        />

                        <p className="font-semibold text-slate-700 hover:underline">
                          {listing.name}
                        </p>
                      </Link>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteListing(listing._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => handleEditListing(listing._id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
        </div>
      </div>
    </main>
  );
};

export default Profile;