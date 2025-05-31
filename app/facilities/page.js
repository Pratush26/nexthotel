import {
  CircleParking,
  GlassWaterIcon,
  Utensils,
  WavesLadder,
  TvIcon,
  Music,
  Wifi,
  AirVent,
} from "lucide-react";
import { connectDB } from "@/lib/mongoose";
import Feedback from "@/models/Feedback";

export default async function Facilities() {
   await connectDB();

  const reviews = await Feedback.find();
  const totalReviews = reviews.length;

  const average =
    totalReviews === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const data = [
    { name: "Free Wifi", icon: Wifi },
    { name: "Free Parking", icon: CircleParking },
    { name: "Free water and juices", icon: GlassWaterIcon },
    { name: "LED TV and restaurant", icon: TvIcon },
    { name: "Free Breakfast and meal", icon: Utensils },
    { name: "Sound system and BAR-BQ party facility", icon: Music },
    { name: "Medium size, clean, rounded Swimming pool", icon: WavesLadder },
    { name: "Both AC and Non-AC room at affordable price", icon: AirVent },
  ];

  return (
    <main className="flex flex-col justify-center items-center min-h-screen w-full">
      <h1 className="text-5xl my-10 font-bold">Facilities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-baseline justify-items-center w-full md:w-11/12">
       <section className="flex flex-col justify-center items-center gap-6 my-10 w-full">
      <h2 className="text-3xl font-bold">Customer Satisfaction</h2>
      <section className="flex justify-center items-center gap-6 w-full">
        <p className="font-medium text-6xl sm:text-9xl">{average.toFixed(1)}</p>
        <div className="space-y-4 w-full">
          {ratingCounts.map(({ star, count }) => {
            const percentage =
              totalReviews === 0 ? 0 : (count / totalReviews) * 100;
            return (
              <div key={star} className="flex items-center gap-3">
                <p className="w-5 text-sm">{star}</p>
                <div className="relative bg-gray-800 h-1 rounded-full w-full">
                  <div
                    className="absolute inset-0 bg-emerald-600 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm w-6 text-right">{count}</p>
              </div>
            );
          })}
        </div>
      </section>
    </section>
        <ul className="flex flex-col justify-center items-start gap-6 bg-emerald-800/30 p-12 rounded-2xl text-lg font-semibold text-gray-200">
          {data.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index} className="flex items-center gap-4">
                <Icon className="w-6 h-6" />
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
export const dynamic = "force-dynamic";