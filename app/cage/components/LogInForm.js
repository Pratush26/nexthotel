'use client';

import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (data) => {
  const res = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  if (res.error) {
    setError("Something went wrong"); // <-- This now works reliably
  } else {
    reset();
    router.push("/meghlokh");
  }
};


  return (
    <main>
      <h1 className="text-3xl font-bold m-4 text-center">Login</h1>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-6 bg-emerald-950 p-10 rounded-lg w-1/3 mx-auto text-black"
      >
        <div className="w-full">
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full">
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-3/4 disabled:bg-gray-800 font-bold bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 hover:scale-105 transition-all duration-300"
        >
          Login
        </button>
      </form>
    </main>
  );
}
