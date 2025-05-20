import User from "../models/user.js";
import mongoose from "mongoose";
import sendEmail from "../utils/sendEmail.js";
const signUp = async (req, res) => {
	try {
		const { firstName, lastName, email, phone, password, isAdmin } = req.body;

		if (!firstName || !lastName || !email || !phone || !password) {
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
	phone,
  password,
  isAdmin: isAdmin || false,
});
//welcome mail
try{
await sendEmail({
  to: newUser.email,
  subject: "✨ Welcome to [Achan's!] - Your Beauty Journey Begins!",
  html: `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #555;">
      <div style="background-color: #faf3f3; padding: 30px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #d4a1a7; font-size: 28px; margin-bottom: 5px;">Welcome to [Achan's]!</h1>
          <p style="font-size: 16px; color: #888;">Where beauty meets perfection</p>
        </div>
        
        <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
          <p style="font-size: 16px; line-height: 1.6;">Dear ${newUser.firstName},</p>
          
          <p style="font-size: 16px; line-height: 1.6;">🌸 We're absolutely <strong>thrilled</strong> to welcome you to our beauty family! Your account has been successfully created and you're now ready to book your pampering sessions with us.</p>
          
          <p style="font-size: 16px; line-height: 1.6;">💄 As a valued member, you can now:</p>
          <ul style="font-size: 15px; line-height: 1.8; padding-left: 20px;">
            <li>Book appointments with our top beauty experts</li>
            <li>Receive exclusive member-only offers</li>
            <li>Track your beauty history and preferences</li>
            <li>Get personalized beauty recommendations</li>
          </ul>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="[Your Booking URL]" style="background-color: #d4a1a7; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Book Your First Appointment</a>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">We can't wait to help you look and feel your most beautiful self!</p>
          
          <p style="font-size: 16px; line-height: 1.6;">With love,<br/>
          <strong>The [Your Beauty Shop Name] Team</strong> 💖</p>
        </div>
        
        <div style="text-align: center; font-size: 12px; color: #999; padding-top: 20px; border-top: 1px solid #eee;">
          <p>Follow us for beauty tips and promotions:</p>
          <p>
            <a href="[https://www.instagram.com/kellsonthebeat_/]" style="color: #d4a1a7; text-decoration: none; margin: 0 5px;">Instagram</a> | 
            <a href="[Facebook URL]" style="color: #d4a1a7; text-decoration: none; margin: 0 5px;">Facebook</a> | 
            <a href="[Website URL]" style="color: #d4a1a7; text-decoration: none; margin: 0 5px;">Website</a>
          </p>
          <p>[Available On Demand(Chicago only)] | [+1630943-3195]</p>
        </div>
      </div>
    </div>
  `
  });
} catch (emailError) {
  console.error("Failed to send welcome email:", emailError.message);
  // Optional: continue registration even if email fails
}
res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
				phone: newUser.phone,
      },
    });

   } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle Mongoose validation errors
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    console.error("Server Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default signUp;