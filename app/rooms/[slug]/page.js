import { connectDB } from "@/lib/mongoose";
import Room from "@/models/Room";
import Image from "next/image";
import Link from "next/link";
import { Wifi, AirVent, Utensils, TvIcon, WavesLadder, Music } from "lucide-react";

const ICON_MAP = {
  Wifi,
  AirVent,
  Utensils,
  TvIcon,
  WavesLadder,
  Music
};
export default async function RoomDetail({ params }) {
  let rooms = [];

  try {
    await connectDB();
    rooms = await Room.find().sort({ _id: 1 }).lean();
  } catch (error) {
    console.log(error);
  }

  const roomdata = rooms.find((room) => room.name === params.slug);

  if (!roomdata) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        Room not found
      </main>
    );
  }

  return (
    <main className="p-4 min-h-[80vh] grid sm:grid-cols-2 grid-cols-1 items-center justify-items-center">
      <Image
        src={roomdata.image}
        alt={roomdata.name}
        width={400}
        height={100}
        className="rounded-lg"
      />
      <section className="mt-4 flex flex-col justify-center items-start">
        <h1 className="text-2xl font-bold">{roomdata.name}</h1>
        <p className="text-lg font-medium">{roomdata.type}</p>
        <p className="text-gray-600">{roomdata.description}</p>
        <p className="text-sm text-gray-300 py-2">
          CheckIn Time : 12:00 PM | CheckOut Time : 11:00 AM
        </p>
        <ul className="flex gap-4 my-6">
          {roomdata.icons.map((iconName, index) => {
            const IconComponent = ICON_MAP[iconName];
            return IconComponent ? (
              <li key={index}>
                <IconComponent className="w-6 h-6" />
              </li>
            ) : null;
          })}
        </ul>

        <div className="flex items-center justify-between gap-10">
          <Link
            href="/booknow/identity"
            className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-800 hover:scale-105 transition-all duration-300"
          >
            Book Now
          </Link>
          <p className={`text-lg ${roomdata.offprice && "line-through"}`}>{roomdata.price}৳ / night</p>
          {roomdata.offprice && <p className="text-lg">{roomdata.offprice}৳ / night</p>}
        </div>
      </section>
    </main>
  );
}
