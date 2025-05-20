import User from "../models/user.js";

const signUp = async (req, res) => {
	try {
		const { firstName, lastName, email, password, isAdmin } = req.body;

		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({ 
				message: "Please provide all required fields", 
			});
		}
		if (isAdmin && (!req.user || !req.user.isAdmin)) {
			return res.status(403).json({ message: "Only admins can create another admin" });
		}		
		
		// Check if the email already exists in the database
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "Email already exists" });
		}
		if (password.length < 8) {
			return res.status(400).json({ message: "Password must be at least 8 characters" });
		} 

		// Create a new user
		const newUser = await User.create({
  firstName,
  lastName,
  email,
  password, // No need to hash manually
  isAdmin: isAdmin || false,
});
res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default signUp;