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
      checkInDate: new Date(checkin),         // ✔ Correct field
      checkOutDate: new Date(checkout),       // ✔ Correct field
      couponCode: coupon,                     // ✔ Correct field
      paymentMethod,
      trxId,
      roomNo: rooms.map((r) => r.value),      // ✔ Correct field
    });

    await newBooking.save();
    console.log("✅ Booking submitted successfully");
  } catch (err) {
    console.error("❌ Error submitting Booking:", err);
  }
}

