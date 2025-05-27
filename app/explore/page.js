"use client";
import Room from "@/components/room";
import Link from "next/link";
import { useState } from "react";
export default function Explore() {
  const [filter, setFilter] = useState("All");
   const rooms = [
    {
      name: "Donesh-01",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.uos.",  
    },
    {
      name: "Donesh-02",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.uos.",  
    },
    {
      name: "Donesh-03",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.s.",    
    },
    {
      name: "Donesh-04",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.s.",    
    },
    {
      name: "Koilash-01",
      image: "https://images.pexels.com/photos/20771843/pexels-photo-20771843/free-photo-of-bed-in-luxury-bedroom.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Duplex AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Koilash-02",
      image: "https://images.pexels.com/photos/20771843/pexels-photo-20771843/free-photo-of-bed-in-luxury-bedroom.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Duplex AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.s.",    
    },
    {
      name: "Koilash-03",
      image: "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "Duplex Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Koilash-04",
      image: "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "Duplex Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.s.",    
    },
    {
      name: "Mohesh-01",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Mohesh-02",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Mohesh-03",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Mohesh-04",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Romesh-01",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Romesh-02",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Romesh-03",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Romesh-04",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Shomesh-01",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Shomesh-02",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Shomesh-03",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Shomesh-04",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Kalpesh-01",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Kalpesh-02",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Kalpesh-03",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Kalpesh-04",
      image: "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      type: "Non-AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Jitesh-01",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Jitesh-02",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Jitesh-03",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
    {
      name: "Jitesh-04",
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      type: "AC Room",
      description: "Experience comfort and relaxation in our elegantly designed room, featuring modern amenities, cozy bedding, and a serene ambiance—perfect for both leisure and business travelers.",      
    },
  ];
const filteredRooms = rooms.filter((room) => {
    if (filter === "All") return true;
    if (filter === "AC") return room.type === "AC Room" || room.type === "Duplex AC Room";
    if (filter === "Non-AC") return room.type === "Non-AC Room" || room.type === "Duplex Non-AC Room";
    return true;
});

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-5xl m-6 font-bold">Explore Our Rooms collection</h1>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg font-bold ${filter === "All" ? "bg-emerald-800 text-white" : "bg-gray-900"}`}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-bold ${filter === "AC" ? "bg-emerald-800 text-white" : "bg-gray-900"}`}
          onClick={() => setFilter("AC")}
        >
          AC
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-bold ${filter === "Non-AC" ? "bg-emerald-800 text-white" : "bg-gray-900"}`}
          onClick={() => setFilter("Non-AC")}
        >
          Non-AC
        </button>
      </div>
      <Link
        href="/booknow"
        className="bg-emerald-700 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300 rounded-lg m-6"
      >
        Book Now
      </Link>
      <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredRooms.map((room) => (
          <Room key={room.name} room={room} />
        ))}
      </div>
    </main>
  );
}
