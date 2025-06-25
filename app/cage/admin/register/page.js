import RegisterForm from "@/app/cage/components/RegisterUser";
import { auth } from "@/lib/auth"; // your NextAuth config
import Link from "next/link";
import { notFound } from "next/navigation"; // for showing 404 without redirecting

export default async function RegisterPage() {
  const session = await auth();
  if (session?.user.role !== "admin") {
      notFound(); // ✅ Show 404 without redirecting
    }
  
  return (
    <main className="flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold mt-2">Register New User</h1>
      <Link href='/cage/admin/rooms/edit/encodeURIComponentroomnam'>Add new room</Link>
      <RegisterForm />
    </main>
  );
}
