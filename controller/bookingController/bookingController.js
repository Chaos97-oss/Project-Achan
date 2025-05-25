import Booking from "../../models/booking.js";
import Service from "../../models/service.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { service, date, timeSlot, notes } = req.body;

    if (!service || !date || !timeSlot) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    const existingService = await Service.findById(service);
    if (!existingService) {
      return res.status(404).json({ message: "Service not found" });
    }

    const newBooking = await Booking.create({
      user: req.user._id,
      service,
      date,
      timeSlot,
      notes,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all bookings (admin or for dashboard)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "firstName lastName email")
      .populate("service", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get bookings for the logged-in user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("service", "name price")
      .sort({ date: 1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single booking
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("user", "firstName lastName email")
      .populate("service", "name price");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a booking (admin or user)
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const { date, timeSlot, status, notes } = req.body;

    if (date) booking.date = date;
    if (timeSlot) booking.timeSlot = timeSlot;
    if (status) booking.status = status;
    if (notes) booking.notes = notes;

    const updated = await booking.save();
    res.status(200).json({ message: "Booking updated", booking: updated });
  } catch (error) {
    console.error("Error updating booking:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
