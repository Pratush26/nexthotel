"use server";

import { connectDB } from "@/lib/mongoose";
import Booking from "@/models/Booking";

export async function DeleteBooking(id) {
  await connectDB();
  await Booking.deleteOne({ _id: id });
}
