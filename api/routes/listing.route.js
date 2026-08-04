import express from 'express'
import { getListings, createListing, deleteListing, updateListing, getListing } from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post('/create', verifyToken, createListing)
router.get('/get', getListings)
router.get('/:id', getListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.post('/update/:id', verifyToken, updateListing)
router.get('/get/:id', getListing)

export default router;