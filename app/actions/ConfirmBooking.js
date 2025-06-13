'use server';

import { connectDB } from "@/lib/mongoose";
import Booking from "@/models/Booking";

export async function ConfirmBooking(id, newStatus) {
  try {
    await connectDB();
    await Booking.findByIdAndUpdate(id, { bookingStatus: newStatus });
  } catch (error) {
    console.error("Update booking status failed:", error);
    throw error;
  }
}
