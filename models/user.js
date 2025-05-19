import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import crypto from "crypto"
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a last name"],
    trim: true,
  },
   lastName: {
    type: String,
    required: [true, "Please provide a last name"],
    trim: true,
  },
  email: {
    type: String,
    required:[true, "Please provide a an email"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required:  [true, "Please provide a phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  minlength: [8, "Password must be at least 8 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  passwordResetToken: String,
  passwordResetExpire: Date,
  
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// 🔐 Generate password reset token
userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpire = Date.now() + 60 * 60 * 1000; // 1 hour

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;