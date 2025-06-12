"use server";

import { connectDB } from "@/lib/mongoose";
import BookingRequest from "@/models/BookingRequest";

export async function handleDelete(id) {
  await connectDB();
  await BookingRequest.deleteOne({ _id: id });
}
