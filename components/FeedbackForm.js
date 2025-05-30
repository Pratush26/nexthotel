"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react"

export default function FeedbackForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const [activeForm, setActiveForm] = useState("rating");
  const [rating, setRating] = useState(0);

  const handleComplaintSubmit = (data) => {
    console.log("Complaint submitted:", data);
    reset();
  };

  const handleRatingSubmit = (data) => {
    if (rating === 0) {
      setError("rating", {
        type: "manual",
        message: "Please submit your rating",
      });
      return;
    }

    console.log("Rating submitted:", { ...data, rating });
    reset();
    setRating(0);
  };


  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className="bg-emerald-800/30 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Share Your {activeForm === "complaint" ? "Allegation" : "Feedback"}</h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-6 mb-6 text-white relative">
        {["complaint", "rating"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveForm(type)}
            className={`relative pb-1 px-2 transition duration-200 ${activeForm === type ? "font-bold" : "opacity-70 hover:opacity-100"
              }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
            {activeForm === type && (
              <motion.span
                layoutId="underline"
                className="absolute left-0 -bottom-0.5 h-0.5 bg-white w-full"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Complaint Form */}
      {activeForm === "complaint" && (
        <form
          onSubmit={handleSubmit(handleComplaintSubmit)}
          className="space-y-4 text-white"
        >
          <input type="email" placeholder="Email" {...register("email", { required: true })} className="w-full px-4 py-2 rounded-lg bg-white text-black" />
          <div>
            <label htmlFor="complaint" className="block text-sm font-medium mb-1">
              Your Complaint
            </label>
            <textarea
              id="complaint"
              {...register("complaint", { required: true })}
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-white text-black"
              placeholder="Write your complaint..."
            ></textarea>
            {errors.complaint && (
              <p className="text-red-300 text-sm mt-1">Complaint is required</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Submit Complaint
          </button>
        </form>
      )}
      {/* Rating Form */}
      {activeForm === "rating" && (
        <form
          onSubmit={handleSubmit(handleRatingSubmit)}
          className="space-y-4 text-white"
        >
          <input type="email" placeholder="Email" {...register("email", { required: true })} className="w-full px-4 py-2 rounded-lg bg-white text-black" />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.svg
                key={star}
                onClick={() => handleStarClick(star)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={star <= rating ? "gold" : "gray"}
                className="w-8 h-8 cursor-pointer"
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                whileTap={{ scale: 1.2 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  delay: star * 0.05, // Staggered animation
                }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </motion.svg>
            ))}
            {errors.rating && (
              <p className="text-red-300 text-sm mt-1">{errors.rating.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium mb-1">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              {...register("feedback", { required: true })}
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-white text-black"
              placeholder="Share your experience with us..."
            ></textarea>
            {errors.feedback && (
              <p className="text-red-300 text-sm mt-1">Feedback is required</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Submit Rating
          </button>
        </form>
      )}

    </div>
  );
}
