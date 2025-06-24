// lib/auth.js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) throw new Error("Invalid credentials");

        const isValid = bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        // ✅ Return plain object
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
          role: user.role || "employee",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // ✅ Required for middleware token access
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image || null;
        token.role = user.role || "employee";
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image || null,
          role: token.role || "employee",
        };
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET, // ✅ Must be set in production
});
