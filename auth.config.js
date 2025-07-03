// auth.config.ts
import NextAuth from "next-auth";

export const { auth } = NextAuth({
  providers: [],
  callbacks: {
    async jwt({ token }) {
      return token; // return whatever is already in the token
    },
    async session({ session, token }) {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = (token.role ?? "employee");
      return session;
    },
  },
});