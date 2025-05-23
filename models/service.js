import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String, // e.g., "30 minutes", "1 hour"
      required: true,
    },
    image: {
      type: String, // URL or path to image
    },
    category: {
      type: String, // e.g., "Makeup", "Skincare", "Nails"
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;