import React, { useState } from "react";
import { uploadToSupabase } from "../components/uploadToSupabase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
  });

  const primaryColor = "#022222";


  // Handle form input changes
  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [id]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    });
  };


  // Upload one image to Supabase
  const storeImage = async (file) => {
    const url = await uploadToSupabase(file);

    if (!url) {
      throw new Error("Upload failed");
    }

    return url;
  };


  // Upload selected images
   const handleImageSubmit = async () => {
  if (!file) {
    alert("Please select an image first");
    return;
  }

  try {
    setUploading(true);

    const url = await storeImage(file);

    setImageUrl(url);
    setFile(null);

  } catch (error) {
    console.error(error);
    alert("Failed to upload image");

  } finally {
    setUploading(false);
  }
};

  // Remove uploaded image
  const handleRemoveImage = () => {
  setImageUrl("");
};


  // Create listing
  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!currentUser) {
      alert("Please login first");
      return;
    }


    if (file && !imageUrl) {
    alert("Please upload selected image first");
    return;
  }


    if (!imageUrl) {
  alert("Please upload an image");
  return;
}

    try {

      const listingData = {
        ...formData,
        imageUrl,
        userRef: currentUser._id,
      };


      console.log(
        "Listing Data:",
        listingData
      );


      const res = await fetch(
        "/api/listing/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(listingData),
        }
      );


      const data = await res.json();


      if (!res.ok) {
        throw new Error(
          data.message || "Failed to create listing"
        );
      }


      console.log("Listing created:", data);

      alert("Listing created successfully!");

      navigate(`/listing/${data._id}`);


          } catch (error) {

            console.log(error);
            alert(error.message);

          }

  };

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ backgroundColor: primaryColor }}
          >
            <span className="text-white text-3xl">🏠</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
            Create a <span className="text-blue-600">Listing</span>
          </h1>
          <p className="mt-3 text-slate-600 max-w-md mx-auto">
            Fill in the details and showcase your property with beautiful images
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <form  onSubmit={handleSubmit} className="flex flex-col lg:flex-row">
            {/* LEFT - Details */}
            <div className="flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Property Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Modern Villa with Ocean View"
                    className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#022222] focus:ring-1 focus:ring-[#022222] transition-all text-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your property in detail..."
                    rows={6}
                    className="w-full px-5 py-4 border border-slate-200 rounded-3xl focus:outline-none focus:border-[#022222] focus:ring-1 focus:ring-[#022222] transition-all resize-y min-h-[140px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Sunset Boulevard, Malibu, CA"
                    className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#022222] focus:ring-1 focus:ring-[#022222] transition-all"
                    required
                  />
                </div>
                <div className="space-y-6"> <div className="flex flex-wrap gap-6"> <label className="flex items-center gap-2 cursor-pointer"> <input type="checkbox" checked={formData.type === "sell"} onChange={() => setFormData({ ...formData, type: "sell" }) } className="w-5 h-5" /> <span>Sell</span> </label> <label className="flex items-center gap-2 cursor-pointer"> <input type="checkbox" checked={formData.type === "rent"} onChange={() => setFormData({ ...formData, type: "rent" }) } className="w-5 h-5" /> <span>Rent</span> </label> <label className="flex items-center gap-2 cursor-pointer"> <input type="checkbox" id="parking" checked={formData.parking} onChange={handleChange} className="w-5 h-5" /> <span>Parking Spot</span> </label> <label className="flex items-center gap-2 cursor-pointer"> <input type="checkbox" id="furnished" checked={formData.furnished} onChange={handleChange} className="w-5 h-5" /> <span>Furnished</span> </label> <label className="flex items-center gap-2 cursor-pointer"> <input type="checkbox" id="offer" checked={formData.offer} onChange={handleChange} className="w-5 h-5" /> <span>Offer</span> </label> </div> {/* Beds and Baths */} <div className="grid grid-cols-2 gap-6"> <div> <label className="block text-sm font-medium text-slate-700 mb-2"> Bedrooms </label> <input type="number" id="bedrooms" min="1" max="10" value={formData.bedrooms} onChange={handleChange} className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#022222]" /> </div> <div> <label className="block text-sm font-medium text-slate-700 mb-2"> Bathrooms </label> <input type="number" id="bathrooms" min="1" max="10" value={formData.bathrooms} onChange={handleChange} className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#022222]" /> </div> </div> {/* Prices */} <div className="grid grid-cols-2 gap-6"> <div> <label className="block text-sm font-medium text-slate-700 mb-2"> Regular Price ($) </label> <input type="number" id="regularPrice" min="50" value={formData.regularPrice} onChange={handleChange} className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#022222]" /> </div> {formData.offer && ( <div> <label className="block text-sm font-medium text-slate-700 mb-2"> Discount Price ($) </label> <input type="number" id="discountPrice" min="0" value={formData.discountPrice} onChange={handleChange} className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#022222]" /> </div> )} </div> </div>
              </div>
            </div>

            {/* RIGHT - Images & Submit */}
            <div className="flex-1 p-8 lg:p-12 bg-slate-50">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-lg text-slate-900">
                    Property Images
                  </p>
                </div>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-slate-300 rounded-3xl p-8 hover:border-[#022222] transition-colors bg-white">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                      📸
                    </div>
                    <p className="font-medium text-slate-700">Drag images or click to upload</p>
                    <p className="text-sm text-slate-500 mt-1">JPG, PNG </p>
                    
                    <input
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="mt-6 px-8 py-3.5 border border-slate-300 hover:border-[#022222] hover:text-[#022222] rounded-2xl cursor-pointer transition-all text-sm font-medium"
                    >
                      Choose Images
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleImageSubmit}
                  disabled={uploading || !file}
                  className="mt-4 w-full py-4 rounded-2xl text-white font-semibold text-sm uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: primaryColor }}
                >
                  {uploading ? "Uploading Images..." : "Upload Selected Images"}
                </button>
              </div>

              {/* Uploaded Images Preview */}
              {imageUrl && (
              <div className="mb-10">
                <p className="text-sm font-medium text-slate-500 mb-4">
                  Uploaded Image
                </p>

                <div className="relative group">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full aspect-square object-cover rounded-2xl shadow-sm ring-1 ring-slate-200"
                  />

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>

                  <div className="absolute top-2 left-2 bg-[#022222] text-white text-[10px] px-2 py-1 rounded">
                    COVER
                  </div>
                </div>
              </div>
            )}

              {/* Create Button */}
              <button
                type="submit"
                className="w-full py-2 rounded-3xl text-white font-semibold text-Xl tracking-wide hover:brightness-110 active:scale-[0.985] transition-all shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                Create Listing
              </button>

              <p className="text-center text-xs text-slate-500 mt-6">
                Your listing will be reviewed before going live
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateListing;