import React, { useState } from "react";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  // upload all selected images
  const handleImageSubmit = async () => {
    if (files.length === 0) return;

    if (files.length > 6) {
      alert("You can upload max 6 images");
      return;
    }

    try {
      setUploading(true);

      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      const urls = await Promise.all(promises);

      setImageUrls((prev) => [...prev, ...urls]);

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  // upload single image
  const storeImage = async (file) => {
    const data = new FormData();
    data.append("image", file); // must match multer

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    const result = await res.json();

    if (result.message !== "Upload successful") {
      throw new Error("Upload failed");
    }

    return result.filePath;
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="md:text-5xl text-3xl font-semibold text-center my-7 py-5">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-12">
        {/* LEFT */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg border-black"
            id="name"
            required
          />

          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg border-black"
            id="description"
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg border-black"
            id="address"
            required
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col flex-1">
          <p className="font-semibold text-lg">
            Images:
            <span className="font-normal ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4 mb-4 mt-3">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-black rounded w-full"
              type="file"
              accept="image/*"
              multiple
            />

            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 bg-[#022222] text-white rounded-lg uppercase"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {/* SHOW UPLOADED IMAGES */}
          {imageUrls.length > 0 &&
            imageUrls.map((url, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <img
                  src={url}
                  alt="listing"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <span className="text-sm">{url}</span>
              </div>
            ))}

          <button className="p-3 bg-[#022222] text-white rounded-lg uppercase">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;