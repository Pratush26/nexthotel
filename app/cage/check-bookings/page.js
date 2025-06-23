import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongoose";
import RoomModel from "@/models/Room";
import generateDateRange from "@/app/actions/DateArr";
import FilterRoomBookings from "@/app/cage/components/Filter";

export default async function Explore({ searchParams = {} }) {
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
  console.log(error);
}


  const { type, checkIn, checkOut } = searchParams;

  let filteredRooms = type
    ? rooms.filter((room) => room.type.toLowerCase() === type.toLowerCase())
    : rooms;

  if (checkIn && checkOut) {
    const range = generateDateRange(checkIn, checkOut);

    filteredRooms = filteredRooms.filter((room) => {
      const booked = room.bookedDate.map((d) =>
        new Date(d).toISOString().split("T")[0]
      );

      return !range.some((date) => booked.includes(date));
    });
  }

  if ((type || (checkIn && checkOut)) && filteredRooms.length === 0) {
    return notFound();
  }

  const filters = [
    { label: "All", value: undefined },
    { label: "AC", value: "AC Room" },
    { label: "Non-AC", value: "Non-AC Room" },
    { label: "Duplex AC", value: "Duplex AC Room" },
    { label: "Duplex Non-AC", value: "Duplex Non-AC Room" },
  ];

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl m-6 font-bold">Check bookings</h1>
      <FilterRoomBookings
        filters={filters}
        filteredRooms={filteredRooms}
        currentType={type}
      />
    </main>
  );
}
