import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {signOutUserStart,signOutUserSuccess,signOutUserFailure,deleteUserFailure,deleteUserSuccess,deleteUserStart,updateUserFailure,updateUserSuccess,updateUserStart,} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  // handle text input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFile(file);
    setPreview(URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      avatar: URL.createObjectURL(file), // for preview
    }));
  };

  // update profile (text fields + optional image)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const data = new FormData();
      data.append("username", formData.username || currentUser.username);
      data.append("email", formData.email || currentUser.email);
      data.append("password", formData.password || "");
      if (file) data.append("image", file);

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      const result = await res.json();
      if (result.success === false) {
        dispatch(updateUserFailure(result.message));
        return;
      }

      dispatch(updateUserSuccess(result));
      setFormData({});
      setFile(null);
      setPreview(null);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  // delete user
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

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
      setFile(null);
      setPreview(null);
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="my-3 text-3xl text-center font-semibold">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* PROFILE IMAGE */}
        <img
          src={preview || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center mb-2 border cursor-pointer"
          onClick={() => fileRef.current.click()}
        />

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* USERNAME */}
        <input
          className="border p-3 rounded-lg w-full"
          id="username"
          type="text"
          value={formData.username ?? currentUser.username}
          placeholder="Username"
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          className="border p-3 rounded-lg w-full"
          id="email"
          type="email"
          value={formData.email ?? currentUser.email}
          placeholder="Email"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          className="border p-3 rounded-lg w-full"
          id="password"
          type="password"
          value={formData.password || ""}
          placeholder="New password"
          onChange={handleChange}
        />

        {/* UPDATE BUTTON */}
        <button
          disabled={loading}
          className="border p-3 rounded-lg w-full bg-white hover:bg-[#191970] hover:text-white uppercase"
        >
          {loading ? "Loading..." : "Update"}
        </button>

        {/* CREATE LISTING */}
        <Link
          to={"create-listing"}
          className="bg-white border p-3 rounded-lg uppercase text-center hover:bg-[#191970] hover:text-white"
        >
          Create Listing
        </Link>
      </form>

      {/* ACTIONS */}
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-[#191970] cursor-pointer"
        >
          Delete account
        </span>

        <span
          onClick={handleSignOut}
          className="text-[#191970] cursor-pointer"
        >
          Sign out
        </span>
      </div>

      {/* ERROR */}
      <p className="text-red-500 mt-5">{error || ""}</p>
    </div>
  );
};

export default Profile;