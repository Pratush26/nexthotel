"use server";
import BookingRequest from "@/models/BookingRequest";
import { connectDB } from "@/lib/mongoose";

export default async function ClientDetails(data) {
    const { name, email, phone } = data;

    try {
        await connectDB();

        const existingUser = await BookingRequest.findOne({ phone });

        if (existingUser) {
            const needsUpdate = existingUser.name !== name || existingUser.email !== email;

            if (needsUpdate) {
                existingUser.name = name;
                existingUser.email = email;
                await existingUser.save();
                return { message: "User updated successfully" };
            } else {
                return { message: "User already exists with same data" };
            }
        }

        const newBookingRequest = new BookingRequest({ name, email, phone });
        await newBookingRequest.save();
        return { message: "BookingRequest submitted successfully" };

    } catch (err) {
        console.error("Error submitting BookingRequest:", err);
        return { error: "Server error" };
    }
}
