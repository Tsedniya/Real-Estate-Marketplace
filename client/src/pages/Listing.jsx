import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Listing = () => {
	const { currentUser } = useSelector((state) => state.user);
	const { id } = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showContact, setShowContact] = useState(false);
	const [message, setMessage] = useState("");
	const [sending, setSending] = useState(false);
	const [contactResult, setContactResult] = useState(null);

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

				{/* Contact landlord - only if NOT the owner */}
				{currentUser && listing.userRef === currentUser._id && (
				<div className="mt-6">
					<button
						className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
						onClick={() => { setShowContact((s) => !s); setContactResult(null); }}
					>
						{showContact ? 'Close' : 'Contact Landlord'}
					</button>
					{showContact && (
						<div className="mt-4">
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								rows={5}
								placeholder="Write your message to the landlord..."
								className="w-full p-3 border border-slate-200 rounded-lg resize-y"
							/>
							<div className="flex items-center gap-3 mt-3">
							<button
								onClick={() => {
									if (!message.trim()) {
									return setContactResult({
										ok: false,
										message: "Please enter a message.",
									});
									}

									const landlordEmail = listing.userRef?.email;

									if (!landlordEmail) {
									return setContactResult({
										ok: false,
										message: "Landlord email not found.",
									});
									}

									const subject = `Regarding your listing: ${listing.name}`;

									const body = `
								Hello,

								${message}

								Listing: ${listing.name}
								Address: ${listing.address}

								From:
								${currentUser?.username}
								`;

									window.location.href = `mailto:${landlordEmail}?subject=${encodeURIComponent(
									subject
									)}&body=${encodeURIComponent(body)}`;
								}}
								className="px-4 py-2 rounded-lg bg-green-600 text-white"
								>
								Send Message
								</button>
								<button type="button" className="px-3 py-2 rounded-lg bg-slate-200" onClick={() => setMessage('')}>
									Clear
								</button>
							</div>
							{contactResult && (
								<p className={`mt-3 text-sm ${contactResult.ok ? 'text-green-600' : 'text-red-600'}`}>{contactResult.message}</p>
							)}
						</div>
					)}
				</div>
				)}
			</div>
		</main>
	);
};

export default Listing;
