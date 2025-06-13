// app/actions/registerUser.js
'use server';

import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(formData) {
  const { name, email, password, phone, nid, role, } = formData;

  try {
    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      nid,
      role,
    });

    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
