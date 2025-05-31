// models/Complaint.js
import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  email: String,
  complaint: String,
}, { timestamps: true });

export default mongoose.models.Complaint || mongoose.model("Complaint", ComplaintSchema);
