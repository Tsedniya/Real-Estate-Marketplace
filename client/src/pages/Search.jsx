import React from "react";

const Search = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
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
                    />
                    Rent & Sale
                  </label>
                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                      id="rent"
                    />
                    Rent
                  </label>

                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                      id="sale"
                    />
                    Sale
                  </label>

                  <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600"
                    id="offer"
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
                    />
                    Parking
                  </label>

                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600"
                      id="furnished"
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

                <select id="sort_order" className="w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
                  <option value="created_desc">Newest</option>
                  <option value="regularPrice_desc">
                    Price (High → Low)
                  </option>
                  <option value="regularPrice_asc">
                    Price (Low → High)
                  </option>
                </select>
              </div>

              <button className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium transition hover:bg-blue-700">
                Search
              </button>
            </div>
          </aside>

          {/* Right Results */}
          <section className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Listing Results
              </h2>

              <span className="text-gray-500">
                12 properties found
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {/* Listing Card */}
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
                  alt="House"
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Modern Family House
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Addis Ababa, Ethiopia
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      Rent
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Furnished
                    </span>

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                      Parking
                    </span>
                  </div>

                  <div className="mt-5 text-2xl font-bold text-blue-600">
                    $850<span className="text-base font-medium">/month</span>
                  </div>
                </div>
              </div>

              {/* Duplicate the card here when mapping listings */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Search;