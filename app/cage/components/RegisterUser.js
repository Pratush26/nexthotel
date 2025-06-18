"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "@/app/actions/RegisterUser";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [result, setResult] = useState(null);

  const onSubmit = async (data) => {
    const res = await registerUser(data);
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
        <p
          className={`mt-4 text-center ${result.success ? "text-green-600" : "text-red-600"
            }`}
        >
          {result.success ? "Registration successful!" : result.message}
        </p>
      )}

      <div className="w-full">
        {renderError("name")}
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="w-full">
        {renderError("email")}
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="w-full">
        {renderError("password")}
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
          className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="w-full">
        {renderError("phone")}
        <input
          {...register("phone", { required: "Phone number is required" })}
          type="number"
          placeholder="Phone Number"
          className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="w-full">
        {renderError("nid")}
        <input
          {...register("nid", { required: "NID number is required" })}
          type="number"
          placeholder="NID Number"
          className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="w-full">
        {renderError("role")}
        <label className="block mb-2 text-white font-semibold">Select Role:</label>
        <div className="flex gap-6 text-white">
          <label>
            <input
              {...register("role", { required: true })}
              type="radio"
              value="editor"
              className="mr-2"
            />
            Editor
          </label>
          <label>
            <input
              {...register("role", { required: true })}
              type="radio"
              value="admin"
              className="mr-2"
            />
            Admin
          </label>
          <label>
            <input
              {...register("role", { required: true })}
              type="radio"
              value="employee"
              className="mr-2"
            />
            Employee
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-3/4 font-bold disabled:bg-gray-700 bg-emerald-700 text-white py-2 rounded-lg cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
