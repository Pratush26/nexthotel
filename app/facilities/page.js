import { Camera, Heart, Search, Wifi } from "lucide-react";
export default function Facilities() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-5xl m-6 font-bold">Facilities</h1>
        <div className="flex justify-center items-center bg-emerald-800/30 p-12 rounded-2xl text-lg font-semibold text-gray-200 list-disc">
        <ul className="flex flex-col justify-center items-baseline gap-1 p-12 text-lg font-semibold text-gray-200 list-disc">
            <li>Free Wifi</li>
            <li>Free Parking</li>
            <li>Free water and juice</li>
            <li>LED TV and restaurant</li>
        </ul>
        <Camera />
      <Heart />
      <Search />
      <Wifi />
        <ul className="flex flex-col justify-center items-baseline gap-1 p-12 text-lg font-semibold text-gray-200 list-disc">
            <li>Free Breakfast and meal</li>
            <li>Sound system and BAR-BQ party facility</li>
            <li>Medium size clean rounded Swimming pool</li>
            <li>Both AC and Non-AC room at affordable price</li>
        </ul>
        </div>
      </div>
    </main>
  );
}
