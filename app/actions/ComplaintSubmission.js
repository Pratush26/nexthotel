"use server";
import Complaint from "@/models/Complaint";
import { connectDB } from "@/lib/mongoose";

export default async function ComplaintSub(data) {
    const { email, complaint } = data;
    try {
        await connectDB();
        const newComplaint = new Complaint({ email, complaint });
        await newComplaint.save();
        console.log("Complaint submitted successfully");
    } catch (err) {
        console.error("Error submitting complaint:", err);
    }
}