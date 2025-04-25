
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  volunteerContent: { type: String }, // Add this field
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer" },
  image: {
    public_id: { type: String },
    url: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Blog", blogSchema);