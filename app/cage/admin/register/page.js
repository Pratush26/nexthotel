import RegisterForm from "@/app/cage/components/RegisterUser";
import { auth } from "@/lib/auth"; // your NextAuth config
import { notFound } from "next/navigation"; // for showing 404 without redirecting

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user.role !== "admin") {
      notFound(); // ✅ Show 404 without redirecting
    }
  
  return (
    <main>
      <h1 className="text-3xl font-bold m-4 text-center">Register New User</h1>
      <RegisterForm />
    </main>
  );
}
