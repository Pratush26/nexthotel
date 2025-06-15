'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "@/app/actions/RegisterUser";

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm();
  const [result, setResult] = useState(null);

  const onSubmit = async (data) => {
    const res = await registerUser(data);
    setResult(res);
    console.log(data)
    if (res.success) reset();
  };

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

      <input
        {...register("name")}
        placeholder="Name"
        className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
      />
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
      />
      <input
        {...register("phone")}
        type="number"
        placeholder="Phone Number"
        className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
      />
      <input
        {...register("nid")}
        type="number"
        placeholder="NID Number"
        className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
      />

      <div className="w-full">
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
        className="w-3/4 font-bold bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 hover:scale-105 transition-all duration-300"
      >
        Register
      </button>
    </form>
  );
}
