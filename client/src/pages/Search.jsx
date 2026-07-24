import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from "../components/ListingItem";

const Search = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [listings, setListings] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [sidebardata, setSidebardata] = React.useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created",
    order: "desc",
  });

  const handleChange = (e) => {
    if (e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale") {
      setSidebardata((prev) => ({
        ...prev,
        type: e.target.id,
      }));
    }

    if (e.target.id === "searchTerm") {
      setSidebardata((prev) => ({
        ...prev,
        searchTerm: e.target.value,
      }));
    }

    if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
      setSidebardata((prev) => ({
        ...prev,
        [e.target.id]: e.target.checked,
      }));
    }

    if (e.target.id === "sort_order") {
      const [sort, order] = e.target.value.split("_");
      setSidebardata((prev) => ({
        ...prev,
        sort,
        order,
      }));
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get("search");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking") === "true";
    const furnishedFromUrl = urlParams.get("furnished") === "true";
    const offerFromUrl = urlParams.get("offer") === "true";
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    setSidebardata({
      searchTerm: searchTermFromUrl || "",
      type: typeFromUrl || "all",
      parking: parkingFromUrl || false,
      furnished: furnishedFromUrl || false,
      offer: offerFromUrl || false,
      sort: sortFromUrl || "created",
      order: orderFromUrl || "desc",
    });

  }, []);
  console.log(listings);
  useEffect(() => {
    const fetchListings = async () => {
        setLoading(true);
        setShowMore(false);
        const urlParams = new URLSearchParams(location.search);

        const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
        const data = await res.json();
        if (data.length > 8) {
          setShowMore(true);
        }else{
          setShowMore(false);
        }

        setListings(data);
        setLoading(false);
    };

    fetchListings();
    }, [location.search]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("search", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    const searchQuery = urlParams.toString();
    window.location.href = `/search?${searchQuery}`;

  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("showMore", true);
    const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Filters */}
          <aside className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Search Filters
              </h2>

              {/* Search */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Term
                </label>
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="City, address..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  value={sidebardata.searchTerm}
                  onChange={handleChange}
                />
              </div>

              {/* Type */}
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </p>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                      id="all"
                      checked={sidebardata.type === "all"}
                      onChange={handleChange}
                    />
                    Rent &amp; Sale
                  </label>

                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                      id="rent"
                      checked={sidebardata.type === "rent"}
                      onChange={handleChange}
                    />
                    Rent
                  </label>

                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                      id="sale"
                      checked={sidebardata.type === "sale"}
                      onChange={handleChange}
                    />
                    Sale
                  </label>

                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                      id="offer"
                      checked={sidebardata.offer}
                      onChange={handleChange}
                    />
                    Offer
                  </label>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-5">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </p>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                      id="parking"
                      checked={sidebardata.parking}
                      onChange={handleChange}
                    />
                    Parking
                  </label>

                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                      id="furnished"
                      checked={sidebardata.furnished}
                      onChange={handleChange}
                    />
                    Furnished
                  </label>
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>

                <select
                  defaultValue="created_desc"
                  onChange={handleChange}
                  id="sort_order"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="created_desc">Newest</option>
                  <option value="regularPrice_desc">Price (High → Low)</option>
                  <option value="regularPrice_asc">Price (Low → High)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium transition hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </aside>

          {/* Right Results */}
          <section className="lg:col-span-3">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Listing Results
                </h2>

                {loading ? (
                    <span className="text-gray-500">Loading...</span>
                ) : (
                    <span className="text-gray-500">
                    {listings.length} {listings.length === 1 ? "property" : "properties"} found
                    </span>
                )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {loading && (
                    <p className="col-span-full text-center text-lg text-gray-500">
                    Loading...
                    </p>
                )}

                {!loading && listings.length === 0 && (
                    <p className="col-span-full text-center text-lg text-gray-500">
                    No listings found.
                    </p>
                )}

                {!loading &&
                    listings.length > 0 &&
                    listings.map((listing) => (
                    <ListingItem
                        key={listing._id}
                        listing={listing}
                    />
                    ))}
                </div>
                {showMore && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={onShowMoreClick}
                      className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium transition hover:bg-blue-700"
                    >
                      Show More
                    </button>
                  </div>
                )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Search;