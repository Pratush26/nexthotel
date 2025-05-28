import Room from "@/components/room";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function Explore({ searchParams }) {
  const { type } = searchParams;
  
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
        <Link href='/booknow' className="bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-800 transition-all duration-300 hover:scale-105">Book Now</Link>
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
