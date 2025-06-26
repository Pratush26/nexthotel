import { connectDB } from "@/lib/mongoose";
import { auth } from "@/lib/auth";
import RoomModel from "@/models/Room";
import FilterRoomBookings from "@/app/cage/components/Filter";

export default async function CheckBooking() {
  const session = await auth();
  let rooms = [];

  try {
    await connectDB();
    const rawDocs = await RoomModel.find().sort({ _id: -1 }).lean();

    rooms = rawDocs.map(room => ({
      ...room,
      _id: room._id.toString(),
      bookedDate: room.bookedDate.map(d => new Date(d).toISOString()),
    }));
  } catch (error) {
    console.log("Error fetching rooms:", error);
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl m-6 font-bold">Check bookings</h1>
      <FilterRoomBookings
        roomDocs={rooms}
        option={session?.user.role === "admin"}
      />
    </main>
  );
}
