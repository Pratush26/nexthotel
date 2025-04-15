import Image from "next/image";

export default function Room({ room }) {
  return (
    <div className="flex flex-col justify-center items-center border-2 border-gray-300 rounded-lg p-4 w-1/5">
        <h1 className="text-2xl font-bold">{room.name}</h1>
      <Image src={room.image} alt="Room" width={100} height={100} />
      <h5 className="text-md font-bold">{room.type}</h5>
      <p className="text-sm text-gray-500 text-center">
        {room.description}
      </p>
      <div className="flex justify-center items-center mt-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">Book Now</button>
        <button className="text-gray-300 underline italic px-3 py-1">See Details &gt;</button>
      </div>
    </div>
  );
}
