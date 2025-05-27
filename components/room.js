import Image from "next/image";

export default function Room({ room }) {
  return (
    <div className="flex flex-col justify-center items-center border-1 border-gray-300 rounded-lg p-4 w-full">
      <span className="w-full">
      <h5 className="text-sm text-right font-bold">{room.type}</h5>
      </span>
      <span className="relative m-2 w-full h-34">
      <Image src={room.image} alt="Room" fill={true} className="rounded-lg shadow-amber-50 shadow-xl/20" />
      </span>
        <h1 className="text-2xl font-bold text-shadow-lg text-shadow-black">{room.name}</h1>
      <p className="text-sm text-gray-500 text-center">
        {room.description}
      </p>
      <div className="flex justify-center items-center mt-2">
        <button className="text-gray-300 underline italic px-3 py-1">See Details &gt;</button>
      </div>
    </div>
  );
}
