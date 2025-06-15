import { connectDB } from "@/lib/mongoose";
import Room from "@/models/Room";
import Link from "next/link";
import BookingForm from "../components/BookingForm";

export default async function BookNow() {
  let rooms = [];
  try {
    await connectDB();
    const roomsFromDb = await Room.find().sort({ _id: 1 }).lean();

    // Convert _id to string
    rooms = roomsFromDb.map(room => ({
      ...room,
      _id: room._id.toString(),
    }));
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="w-11/12 md:w-3/4 lg:w-1/2 mx-auto">
      <Link href={"/meghlokh"} className="flex items-center justify-center">Home</Link>
      <h1 className="text-3xl font-bold text-center text-white my-6">Booking Form</h1>
        <BookingForm roomdata={rooms} />
    </main>
  );
}
