// models/Booking.js
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: Number, required: true },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    couponCode: { type: String },
    totalAmount: { type: Number },
    finalAmount: { type: Number },
    roomNo: [{ type: String }, { required: true }],
    trxId: { type: String, required: true }, // Add if you're expecting this field
    bookedBy: { type: String, default: "user"},
    paymentMethod: { type: String, enum: ["bkash", "nagad", "rocket"], required: true },
    bookingStatus: { type: String, enum: ["Pending", "Confirmed", "Cancelled", "Paid"], default: "Pending" },
}, { timestamps: true });


export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
