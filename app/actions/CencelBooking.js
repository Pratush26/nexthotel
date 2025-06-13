"use server";

import { connectDB } from "@/lib/mongoose";
import Booking from "@/models/Booking";

export async function CencelBooking(id) {
  await connectDB();
  await Booking.deleteOne({ _id: id });
}
