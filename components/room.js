import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

export default function Room({ room }) {
  return (
    <div className="flex flex-col justify-center items-center hover:border-1 hover:shadow-none border-gray-300 rounded-lg p-4 w-full shadow-gray-50/60 shadow-[0_1px_8px_rgba(0,0,0,0.3)] transition-all duration-300">
      <span className="w-full">
        <h5 className="text-sm text-right font-bold">{room.type}</h5>
      </span>
      <Image src={room.image} alt="Room" width={800} height={100} className="rounded-lg shadow-amber-50 shadow-xl/20 m-2" />
      <h1 className="text-2xl font-bold text-shadow-lg text-shadow-black">{room.name}</h1>
      <p className="text-sm text-gray-500 text-center">
        {room.description}
      </p>
      <div className="flex justify-center items-center mt-2">
        <Link href={`/rooms/${room.name}`} className="italic underline flex">
          View Details
          <ChevronsRight className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
