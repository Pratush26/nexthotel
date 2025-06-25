// lib/auth.js
import NextAuth from "next-auth";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongoose";

import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password)
          throw new Error("No user found or password not set");
        const isValid = bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");
        if (!user) throw new Error("Invalid credentials.");
        return user;
      },
    }),
  ],callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image || null;
        token.role = user.role || "employee"; // Include role in token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image || null;
        session.user.role = token.role || "employee"; // Add role to session
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});