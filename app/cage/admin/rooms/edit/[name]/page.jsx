import RoomForm from "@/app/cage/components/ManangeRoom";
import { connectDB } from "@/lib/mongoose";
import Room from "@/models/Room";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function EditRoomPage({ params }) {
  const session = await auth();
  if (session?.user.role !== "admin") {
    notFound();
  }

  const roomName = decodeURIComponent(params.name); // URL-safe decode
  let roomdata = {};

  try {
    await connectDB();
    const found = await Room.findOne({ name: roomName });
    if (!found) return notFound();

    roomdata = JSON.parse(JSON.stringify(found)); // ✅ make it serializable
  } catch (error) {
    console.log(error);
  }

  return (
    <main>
      <h1 className="text-3xl font-bold m-4 text-center">Edit Room</h1>
      <RoomForm details={roomdata} />
    </main>
  );
}
