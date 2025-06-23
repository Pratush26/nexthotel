'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import { addCoupon } from "@/app/actions/AddImgNote";

export default function AddCouponCode() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (data) => {
    try {
      await addCoupon(data); // now expects { coupon: "xyz", discount: "100" or "10%" }
      setSuccess("Coupon added successfully!");
      setError(null);
      reset();
    } catch (err) {
      setError("Something went wrong.");
      setSuccess(null);
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-6 bg-emerald-900 p-10 rounded-lg w-2/3 mx-auto text-black"
    >
      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">{success}</p>}

      {/* Coupon Input */}
      <div className="w-full">
        <input
          {...register("coupon", { required: "Coupon is required" })}
          type="text"
          placeholder="Enter Coupon Code"
          className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
        />
        {errors.coupon && (
          <p className="text-red-500 text-sm mt-1">{errors.coupon.message}</p>
        )}
      </div>

      {/* Discount Input */}
      <div className="w-full">
        <input
          {...register("discount", { required: "Discount is required" })}
          type="text"
          placeholder="Enter Discount (e.g. 100 or 10%)"
          className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
        />
        {errors.discount && (
          <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-3/4 disabled:bg-gray-800 font-bold bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 hover:scale-105 transition-all duration-300"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
