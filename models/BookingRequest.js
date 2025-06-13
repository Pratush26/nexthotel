// models/BookingRequest.js
import mongoose from "mongoose";

const BookingRequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: Number, required: true },
}, { timestamps: true });


export default mongoose.models.BookingRequest || mongoose.model("BookingRequest", BookingRequestSchema);
