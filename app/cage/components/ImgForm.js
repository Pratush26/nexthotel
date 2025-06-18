"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { createImg } from "@/app/actions/AddImgNote"; // adjust path as needed

export default function AddImageForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      link: "",
      type: "carousel",
    },
  });

  const [result, setResult] = useState(null);

  const onSubmit = async (data) => {
    const res = await createImg(data);
    setResult(res);
    if (res.success) reset();
  };

  const renderError = (field) =>
    errors[field] && (
      <motion.p
        className="text-pink-700 text-sm mb-1"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 300,
        }}
      >
        {errors[field]?.message || `${field} is required`}
      </motion.p>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-6 bg-emerald-950 p-10 rounded-lg w-1/3 mx-auto text-black"
    >
      {result && (
        <p className={`text-center ${result.success ? "text-green-500" : "text-red-600"}`}>
          {result.success ? "Image uploaded successfully!" : result.message}
        </p>
      )}

      <div className="w-full">
        {renderError("link")}
        <input
          {...register("link", { required: "Image link is required" })}
          type="url"
          placeholder="Image Link"
          className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="w-full">
        {renderError("type")}
        <label className="block mb-2 text-white font-semibold">Image Type:</label>
        <div className="flex gap-6 text-white">
          <label>
            <input
              {...register("type", { required: true })}
              type="radio"
              value="carousel"
              className="mr-2"
            />
            Carousel
          </label>
          <label>
            <input
              {...register("type", { required: true })}
              type="radio"
              value="main"
              className="mr-2"
            />
            Main
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-3/4 font-bold disabled:bg-gray-700 bg-emerald-700 text-white py-2 rounded-lg cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300"
      >
        {isSubmitting ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
}
