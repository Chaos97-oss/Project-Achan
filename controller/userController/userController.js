import User from '../../models/user.js'
import Booking from '../../models/booking.js';
// Get all users with pagination
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 users per page
    const skip = (page - 1) * limit;

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Optional: show newest users first

    const totalUsers = await User.countDocuments(); // total for frontend pagination

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
// Get a single user
export const getUser = async (req, res) => {
  const { userId } = req.params; 

  try {
    const user = await User.findById(userId).populate({
      path: "bookings", 
      populate: {
      path: "service", // directly populate the referenced Service in each Booking
      select: "-__v"
  },
  select: "-__v"
});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Update a user
export const updateUser = async (req, res) => {
	const { userId } = req.params;
	const { firstName, lastName, password } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Only update if fields are provided in req.body
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
		
		// Do not allow email updates
		if (req.body.email && req.body.email !== user.email) {
      return res.status(400).json({ message: "Email cannot be updated" });
    }    res.status(201).json({ user });
    } catch (error) {
		console.error("Server Error:", error); // Log the full error object
		res.status(500).json({ message: "Server Error" });
	}
};


    // Delete a user
export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};