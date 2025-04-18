import Room from "@/components/room";
import Link from "next/link";
export default function Explore() {
  const rooms = [
    {
      name: "Donesh-01",
      image: "/window.svg",
      type: "AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",  
    },
    {
      name: "Donesh-02",
      image: "/window.svg",
      type: "AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",  
    },
    {
      name: "Donesh-03",
      image: "/window.svg",
      type: "AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",    
    },
    {
      name: "Donesh-04",
      image: "/window.svg",
      type: "AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",    
    },
    {
      name: "Koilash-01",
      image: "/window.svg",
      type: "Duplex AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",      
    },
    {
      name: "Koilash-02",
      image: "/window.svg",
      type: "Duplex AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",    
    },
    {
      name: "Koilash-03",
      image: "/window.svg",
      type: "Duplex Non-AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",      
    },
    {
      name: "Koilash-04",
      image: "/window.svg",
      type: "Duplex Non-AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",    
    },
    {
      name: "Mohesh-01",
      image: "/window.svg",
      type: "Non-AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",      
    },
    {
      name: "Mohesh-02",
      image: "/window.svg",
      type: "Non-AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",      
    },
    {
      name: "Mohesh-03",
      image: "/window.svg",
      type: "Non-AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",      
    },
    {
      name: "Mohesh-04",
      image: "/window.svg",
      type: "Non-AC Room",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",      
    },

  ];
  
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-5xl m-6 font-bold">Explore Our Rooms collection</h1>
      <Link href="/booknow" className="bg-blue-500 text-white font-bold px-9 py-3 cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all duration-300 rounded-lg m-6">Book Now</Link>
      <div className="flex flex-wrap justify-center items-center gap-6">
        {rooms.map((room) => (
          <Room key={room.name} room={room} />
        ))}
      </div>
    </main>
  );
}
