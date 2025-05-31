// models/Feedback.js
import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  email: String,
  feedback: String,
  rating: Number,
},{ timestamps: true });

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
