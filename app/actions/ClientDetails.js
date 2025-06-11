"use server";
import BookingRequest from "@/models/BookingRequest";
import { connectDB } from "@/lib/mongoose";

export default async function ClientDetails(data) {
    const { name, email, phone } = data;
    try {
        await connectDB();
        const newBookingRequest = new BookingRequest({ name, email, phone });
        await newBookingRequest.save();
        console.log("BookingRequest submitted successfully");
    } catch (err) {
        console.error("Error submitting BookingRequest:", err);
    }
}