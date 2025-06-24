import RoomForm from "../../components/ManangeRoom";
import { connectDB } from "@/lib/mongoose";
import Room from "@/models/Room";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function AddRoomPage() {
    const session = await auth();
    if (session?.user.role !== "admin") {
        notFound(); // ✅ Show 404 without redirecting
    }

    let roomdata = {};
    try {
        await connectDB();
        const found = await Room.findOne({ name: "Donesh-01" });
        roomdata = JSON.parse(JSON.stringify(found)); // ✅ convert to plain object
    } catch (error) {
        console.log(error);
    }

    return (
        <main>
            <h1 className="text-3xl font-bold m-4 text-center">Add New Room</h1>
            <RoomForm details={roomdata} />
        </main>
    );
}
