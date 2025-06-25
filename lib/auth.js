// lib/auth.js
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { connectDB } = await import("@/lib/mongoose");
        const User = (await import("@/models/User")).default;

        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password)
          throw new Error("No user found or password not set");

        const isValid = bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
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
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image || null;
        session.user.role = token.role || "employee";
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
