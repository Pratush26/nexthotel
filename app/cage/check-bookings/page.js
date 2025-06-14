import RoomCard from "@/components/room"; // ✅ Renamed to avoid conflict
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongoose";
import RoomModel from "@/models/Room";

export default async function Explore({ searchParams }) {
  let rooms = [];
  try {
    await connectDB();
    const rawDocs = await RoomModel.find().sort({ _id: 1 }).lean();
    rooms = rawDocs;
  } catch (error) {
    console.log(error);
  }

  const { type } = searchParams;
  const filteredRooms = type
    ? rooms.filter((room) => room.type.toLowerCase() === type.toLowerCase())
    : rooms;

  if (type && filteredRooms.length === 0) {
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
      <div className="flex flex-wrap justify-evenly w-full gap-3">
        <span className="flex flex-wrap justify-center items-center gap-2">
          {filters.map(({ label, value }) => {
            const href = value ? `/cage/check-bookings?type=${encodeURIComponent(value)}` : `/cage/check-bookings`;
            const isActive =
              (!value && !type) || (value?.toLowerCase() === type?.toLowerCase());
            return (
              <Link
                key={label}
                href={href}
                className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105 ${isActive
                    ? "bg-emerald-800 text-white border-emerald-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-400"
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </span>
      </div>
      <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
        {filteredRooms.map((room, index) => (
          <div className="flex flex-col justify-center items-center gap-2 hover:border-1 hover:shadow-none border-gray-300 rounded-lg p-4 w-full shadow-gray-50/60 shadow-[0_1px_8px_rgba(0,0,0,0.3)] transition-all duration-300">
            <h1 className="text-xl text-shadow-lg text-shadow-black">{room.name}</h1>
            <h5 className="text-sm font-bold">{room.type}</h5>
            <h5 className="text-sm text-emerald-200 font-bold">{room.price}/=</h5>
          </div>
        ))}
      </div>
    </main>
  );
}
