"use server";

import Booking from "@/models/Booking";
import Room from "@/models/Room";
import { connectDB } from "@/lib/mongoose";
import generateDateRange from "./DateArr";

export default async function submitBooking(data) {
  const {
    name,
    email,
    phone,
    checkin,
    checkout,
    coupon,
    totalAmount,
    couponDiscount,
    finalAmount,
    rooms,
    trxId,
    recieved,
    bookedBy,
    paymentMethod,
    bookingStatus
  } = data;

  try {
    await connectDB();

    // Generate date array
    const dateArr = generateDateRange(checkin, checkout);

    // Create new booking
    const newBooking = new Booking({
      name,
      email,
      phone,
      checkInDate: new Date(checkin),
      checkOutDate: new Date(checkout),
      couponCode: coupon || null,
      totalAmount,
      couponDiscount,
      finalAmount,
      roomNo: rooms.map((r) => r.value),
      trxId,
      recieved,
      bookedBy,
      paymentMethod,
      bookingStatus
    });

    // Save booking first
    await newBooking.save();

    // Update each room’s bookedDate field (append new dates)
    await Promise.all(
      rooms.map(async (r) => {
        await Room.findByIdAndUpdate(
          r.id,
          { $addToSet: { bookedDate: { $each: dateArr } } }, // Prevent duplicates
          { new: true }
        );
      })
    );

    console.log("✅ Booking submitted successfully");
  } catch (err) {
    console.error("❌ Error submitting Booking:", err);
    throw err;
  }
}
