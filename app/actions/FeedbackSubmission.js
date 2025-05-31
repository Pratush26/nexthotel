"use server";
import Feedback from "@/models/Feedback";
import { connectDB } from "@/lib/mongoose";

export default async function FeedbackSub(data, rating) {
    const { email, feedback } = data;
    const rate  = rating;
    try {
        await connectDB();
        console.log(data);
        const newFeedback = new Feedback({ email, rating: rate, feedback });
        await newFeedback.save();
        console.log("Feedback submitted successfully");
    } catch (err) {
        console.error("Error submitting feedback:", err);
    }
}