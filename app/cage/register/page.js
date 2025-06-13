import RegisterForm from "@/components/RegisterUser";
import { auth } from "@/lib/auth"; // your NextAuth config
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();
  if(session?.user.role !== "admin"){
    redirect("/not-found");
  }
  
  return (
    <main>
      <h1 className="text-3xl font-bold m-4 text-center">Register New User</h1>
      <RegisterForm />
    </main>
  );
}
