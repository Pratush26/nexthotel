import { rooms } from "@/app/data/rooms";
import Image from "next/image";
import Link from "next/link";

export default function RoomDetail({ params }) {
  const room = rooms.find((room) => room.name === params.slug);

  if (!room) return <main className="min-h-screen flex justify-center items-center">Room not found</main>;

  return (
    <main className="p-4 min-h-[80vh] grid sm:grid-cols-2 grid-cols-1 items-center justify-items-center">
      <Image src={room.image} alt={room.name} width={400} height={100} className="rounded-lg" />
      <section className="mt-4 flex flex-col justify-center items-start">
        <h1 className="text-2xl font-bold">{room.name}</h1>
        <p className="text-lg font-medium">{room.type}</p>
        <p className="text-gray-600">{room.description}</p>
        <p className="text-sm text-gray-300 py-2">CheckIn Time : 12:00 PM | CheckOut Time : 11:00 AM</p>
        <ul className="flex gap-4 my-6">
          {room.icons.map((Icon, index) => (
            <li key={index}>
              <Icon className="w-6 h-6" />
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-6 sm:gap-10">
        <Link href="/booknow/identity" className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-800 hover:scale-105 transition-all duration-300">
          Book Now
        </Link>
          <p className="text-lg">BDT - {room.price}৳ / night</p>
        </div>
      </section>
    </main>
  );
}
