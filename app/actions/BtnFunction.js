"use server";

import { connectDB } from "@/lib/mongoose";
import Booking from "@/models/Booking";
import BookingRequest from "@/models/BookingRequest";
import { SuccessEmail } from "./Resend";

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

    const booking = await Booking.findByIdAndUpdate(id, { bookingStatus: newStatus }, { new: true });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if(newStatus === "Confirmed"){
      const info = {
        name: booking.name,
        email: booking.email,
        roomNo: booking.roomNo,
      };
      
      await SuccessEmail(info);
    }
  } catch (error) {
    console.error("Update booking status failed:", error);
    throw error;
  }
}

export async function UpdateRecieved(formData) {
  const id = formData.get("id");
  const recieved = parseFloat(formData.get("recieved"));

  if (isNaN(recieved)) throw new Error("Invalid value");

  await connectDB();
  await Booking.findByIdAndUpdate(id, { recieved }, { new: true });
}

