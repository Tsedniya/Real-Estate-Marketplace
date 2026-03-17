import React, { useState } from "react";
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
  updateUserStart,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  // handle text input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // handle image upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file); // MUST match multer

    try {
      setUploading(true);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await res.json();

      if (result.message !== "Upload successful") {
        console.log("Upload failed");
        setUploading(false);
        return;
      }

      // save image path
      setFormData((prev) => ({
        ...prev,
        avatar: result.filePath,
      }));

      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  // update user
   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    dispatch(updateUserStart());

    // Merge currentUser with formData so nothing is lost
    const updatedData = { ...currentUser, ...formData };

    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
      credentials: "include",
    });

    const data = await res.json();

    if (data.success === false) {
      dispatch(updateUserFailure(data.message));
      return;
    }

    dispatch(updateUserSuccess(data));
    setFormData({}); // optional: reset local form
  } catch (err) {
    dispatch(updateUserFailure(err.message));
  }
};

  // delete user
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(
        `/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );

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

  // sign out
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
      setFormData({});
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl text-center font-semibold text-white">
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* PROFILE IMAGE */}
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center mt-2"
        />

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="border p-2 rounded-lg text-white"
        />

        {/* USERNAME */}
        <input
          className="border p-3 rounded-lg text-white w-full"
          id="username"
          type="text"
          value={formData.username ?? currentUser.username}
          placeholder="Username"
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          className="border p-3 rounded-lg text-white w-full"
          id="email"
          type="email"
          value={formData.email ?? currentUser.email}
          placeholder="Email"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          className="border p-3 rounded-lg text-white w-full"
          id="password"
          type="password"
          value={formData.password || ""}
          placeholder="New password"
          onChange={handleChange}
        />

        {/* UPDATE BUTTON */}
        <button
          disabled={loading || uploading}
          className="border p-3 rounded-lg w-full bg-[#022222] text-white uppercase"
        >
          {uploading
            ? "Uploading..."
            : loading
            ? "Loading..."
            : "Update"}
        </button>

        {/* CREATE LISTING */}
        <Link
          to={"create-listing"}
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center"
        >
          Create Listing
        </Link>
      </form>

      {/* ACTIONS */}
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-[#2bcebb] cursor-pointer"
        >
          Delete account
        </span>

        <span
          onClick={handleSignOut}
          className="text-[#2bcebb] cursor-pointer"
        >
          Sign out
        </span>
      </div>

      {/* ERROR */}
      <p className="text-red-500 mt-5">{error ? error : ""}</p>
    </div>
  );
};

export default Profile;