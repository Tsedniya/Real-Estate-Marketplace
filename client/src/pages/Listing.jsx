import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Listing = () => {
	
	const { id } = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;
		const fetchListing = async () => {
			try {
				const res = await fetch(`/api/listing/${id}`, { credentials: "include" });
				if (!res.ok) {
					const err = await res.json().catch(() => ({}));
					throw new Error(err.message || `Failed to load listing (${res.status})`);
				}
				const data = await res.json();
				setListing(data);
			} catch (e) {
				setError(e.message);
			} finally {
				setLoading(false);
			}
		};
		fetchListing();
	}, [id]);

	if (loading) return <div className="p-8">Loading listing...</div>;
	if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
	if (!listing) return <div className="p-8">No listing found.</div>;

	return (
		<main className="min-h-screen bg-slate-50 py-8 px-4">
			<div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow">
				<h1 className="text-2xl font-semibold mb-4">{listing.name}</h1>
				<img src={listing.imageUrl || listing.image} alt={listing.name} className="w-full h-80 object-cover rounded-lg mb-4" />
				<p className="text-slate-700 mb-2">{listing.description}</p>
				<p className="text-sm text-slate-500 mb-1">Address: {listing.address}</p>
				<div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-700">
					<div>
						<strong>Type:</strong> <span className="ml-2">{listing.type}</span>
					</div>
					<div>
						<strong>Bedrooms:</strong> <span className="ml-2">{listing.bedrooms}</span>
					</div>
					<div>
						<strong>Bathrooms:</strong> <span className="ml-2">{listing.bathrooms}</span>
					</div>
					<div>
						<strong>Parking:</strong> <span className="ml-2">{listing.parking ? 'Yes' : 'No'}</span>
					</div>
					<div>
						<strong>Furnished:</strong> <span className="ml-2">{listing.furnished ? 'Yes' : 'No'}</span>
					</div>
					<div>
						<strong>Offer:</strong> <span className="ml-2">{listing.offer ? 'Yes' : 'No'}</span>
					</div>
				</div>
				<div className="mt-4 text-sm text-slate-700">
					<strong>Price:</strong>
					<span className="ml-2 font-semibold">{new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(listing.regularPrice)}</span>
					{listing.offer && listing.discountPrice ? (
						<span className="ml-3 text-green-600">Discount: {new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(listing.discountPrice)}</span>
					) : null}
				</div>
				{listing.createdAt && (
					<p className="mt-3 text-xs text-slate-400">Posted: {new Date(listing.createdAt).toLocaleString()}</p>
				)}
			</div>
		</main>
	);
};

export default Listing;
