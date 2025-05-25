import express from express
import {protect, isAdmin} from "../../middleware/authMiddleware.js"
import { createBooking, getAllBookings, getUserBookings, getBookingById, updateBooking, deleteBooking } from "../../controller/bookingController/bookingController";
const router = express.Router();
router.post ("/", protect, createBooking);
router.get ("/", protect, isAdmin, getAllBookings);
router.get ("/:id", protect, getUserBookings);
router.get ("/:id", protect, isAdmin, getBookingById);
router.post ("/:id",  protect, isAdmin, updateBooking);
router.delete("/:id", protect, isAdmin, deleteBooking);
export default router;
