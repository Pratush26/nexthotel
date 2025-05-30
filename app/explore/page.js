import Room from "@/components/room";
import Link from "next/link";
import { notFound } from "next/navigation";
import { rooms } from "@/app/data/rooms"; // Assuming you have a JSON file with room data

export default function Explore({ searchParams }) {
  const { type } = searchParams;
  const filteredRooms = type
    ? rooms.filter(room => room.type.toLowerCase() === type.toLowerCase())
    : rooms;

  if (type && filteredRooms.length === 0) {
    return notFound();
  }

  // 1. Define your filter “options”
  const filters = [
    { label: "All",      value: undefined },
    { label: "AC",       value: "AC Room" },
    { label: "Non-AC",   value: "Non-AC Room" },
    { label: "Duplex AC",     value: "Duplex AC Room" },
    { label: "Duplex Non-AC", value: "Duplex Non-AC Room" },
  ];
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-5xl m-6 font-bold">Explore Our Room collection</h1>
      <div className="flex flex-wrap justify-evenly w-full gap-3">
        <Link href='/booknow/identity' className="bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-800 transition-all duration-300 hover:scale-105">Book Now</Link>
        <span className="flex flex-wrap justify-center items-center gap-2">
        {filters.map(({ label, value }) => {
          const href = value ? `/explore?type=${encodeURIComponent(value)}` : `/explore`;
          const isActive =
            (!value && !type) || (value?.toLowerCase() === type?.toLowerCase());

          return (
            <Link
              key={label}
              href={href}
              className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105 ${
                isActive
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

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
        {filteredRooms.map((room, index) => (
          <Room key={index} room={room} />
        ))}
      </div>
    </main>
  );
}
