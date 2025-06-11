"use server";

import Booking from "@/models/Booking";
import { connectDB } from "@/lib/mongoose";

export default async function submitBooking(data) {
  const {
    name,
    email,
    phone,
    checkin,
    checkout,
    coupon,
    paymentMethod,
    trxId,
    rooms,
  } = data;

  try {
    await connectDB();

    const newBooking = new Booking({
      name,
      email,
      phone,
      checkin: new Date(checkin),
      checkout: new Date(checkout),
      coupon,
      paymentMethod,
      trxId,
      roomNo: rooms.map((r) => r.value),
    });

    await newBooking.save();
    console.log("✅ Booking submitted successfully");
  } catch (err) {
    console.error("❌ Error submitting Booking:", err);
  }
}
