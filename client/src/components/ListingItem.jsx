import React from "react";
import { Link } from "react-router-dom";

const ListingItem = ({ listing }) => {
  console.log(listing);
  return (
    <Link
      to={`/listing/${listing._id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
    >
      {/* Listing Image */}
      <img
        src={listing.imageUrl || listing.imageUrls?.[0]}
        alt={listing.name}
        className="h-56 w-full object-cover"
      />
    
      {/* Listing Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-slate-800 truncate">
          {listing.name}
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          📍 {listing.address}
        </p>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {listing.description}
        </p>

        <p className="text-lg font-bold text-green-600 mt-3">
          Birr{" "}
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-US")
            : listing.regularPrice.toLocaleString("en-US")}
          {listing.type === "rent" && " / month"}
        </p>

        {/* Bedrooms */}
        <p className="text-sm text-gray-700 mt-2">
          🛏 {listing.bedrooms}{" "}
          {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
        </p>
      </div>
    </Link>
  );
};

export default ListingItem;