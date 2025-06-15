import { auth } from "@/lib/auth"; // your NextAuth config
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function FeaturePage() {
  const session = await auth();
  if(session?.user.role !== "admin"){
    redirect("/not-found");
  }
  
  return (
    <main>
      <Link href={"/meghlokh"} className="flex items-center justify-center">Home</Link>
      <h1 className="text-3xl font-bold m-4 text-center">Add notice & images</h1>
    </main>
  );
}
