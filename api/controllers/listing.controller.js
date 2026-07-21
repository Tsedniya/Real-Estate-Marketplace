import Listing from '../models/listing.model.js' 

export const createListing = async(req, res, next)=>{

try{

console.log("USER FROM TOKEN:", req.user);
console.log("BODY:", req.body);

const listing = await Listing.create(req.body);

return res.status(201).json(listing);

}catch(error){
next(error)
}

}

export const deleteListing = async(req, res, next)=>{
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Check if the user is the owner of the listing
    if (listing.userRef.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'You can delete only your own listings' });
    }

    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    next(error);
  }
}  

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.userRef.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'You can view only your own listing' });
    }

    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async(req, res, next)=>{
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.userRef.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'You can update only your own listings' });
    }

    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
}

export const getListings = async (req, res, next) => {

  try {
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided
    const startIndex = parseInt(req.query.startIndex) || 0; // Default startIndex to 0 if not 
    let offer = req.query.offer;

    if (offer === 'undefined' || offer ==='false') {
      offer = {$in: [false, true]};
    }
    let parking = req.query.parking;

    if (parking === 'undefined' || parking === 'false'){
      parking = {$in: [false, true]};
    }
    let type = req.query.type;

    if (type === 'undefined' || type === 'false'){
      type = {$in: ['sale', 'rent']};
    }

    const searchTearm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt'; // Default sort by createdAt

    const order = req.query.order === 'desc' ? -1 : 1; // Default order to ascending

    const listings = await Listing.find({
      name: { $regex: searchTearm, $options: 'i' },
      offer: offer,
      parking: parking,
      type: type
    })
    .sort({ [sort]: order })
    .skip(startIndex)
    .limit(limit);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};  