"use server";

import { connectDB } from "@/lib/mongoose";
import Booking from "@/models/Booking";
import BookingRequest from "@/models/BookingRequest";

export async function handleDelete(id) {
  await connectDB();
  await BookingRequest.deleteOne({ _id: id });
}

export async function DeleteBooking(id) {
  await connectDB();
  await Booking.deleteOne({ _id: id });
}

export async function ConfirmBooking(id, newStatus) {
  try {
    await connectDB();
    await Booking.findByIdAndUpdate(id, { bookingStatus: newStatus });
  } catch (error) {
    console.error("Update booking status failed:", error);
    throw error;
  }
}