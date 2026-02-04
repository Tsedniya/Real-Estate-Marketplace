import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(
        `/api/user/update/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="my-7 text-3xl text-center font-semibold text-white">
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Avatar (read-only) */}
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center mt-2"
        />

        <input
          className="border p-3 rounded-lg text-white w-full"
          id="username"
          type="text"
          defaultValue={currentUser.username}
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          className="border p-3 rounded-lg text-white w-full"
          id="email"
          type="email"
          defaultValue={currentUser.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="border p-3 rounded-lg text-white w-full"
          id="password"
          type="password"
          placeholder="New password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="border p-3 rounded-lg w-full bg-white text-[#022222] hover:bg-[#022222] hover:text-white uppercase"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
         <span className='text-[#2bcebb] cursor-pointer'>Delete account</span>
         <span className='text-[#2bcebb] cursor-pointer'>Sign out</span>
      </div>

      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default Profile;

     
    