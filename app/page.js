import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connectDB } from "@/lib/mongoose";
import { cloudinary } from '@/lib/cloudinary';
import AnnouncementSchema from "@/models/Announcement";
import Gallary from "@/components/Gallary";
import Announcement from "@/components/Announcement";

export default async function Home() {
  let notices = [];

  try {
    await connectDB();
    const rowDocs = await AnnouncementSchema.find().sort({ _id: -1 }).lean();
    notices = rowDocs.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
      desc: doc.desc.map(d => ({
        text: d.text,
        bold: d.bold
      }))
    }));

  } catch (error) {
    console.log(error);
  }
  // Fetch images from Cloudinary folder "next-hotel"
  const result = await cloudinary.search
    .expression('folder:next-hotel')
    .sort_by('created_at', 'desc')
    .max_results(20)
    .execute();

  // Extract secure URLs (recommended for next/image)
  const imageUrls = result.resources.map(img => img.secure_url);

  return (
    <main>
      {notices.length > 0 && notices.map((notice, i) => (
        <Announcement key={i} data={notice} />
      ))}
      <div className="w-full h-screen absolute top-0 left-0 -z-10">
        <Suspense fallback={<div className="w-full h-screen bg-emerald-950"></div>}>
            <Image
              src="https://images.pexels.com/photos/939715/pexels-photo-939715.jpeg?"
              alt="Main background"
              fill={true}
              className="object-cover grayscale-25 contrast-100 saturate-100 brightness-60"
            />
        </Suspense>
        <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
          <div className="flex flex-col justify-center items-center mt-[10%] backdrop-blur-[16px] py-10 px-30 rounded-4xl hbox w-2/3">
            <span className="flex flex-col lg:flex-row justify-center items-center sm:text-3xl text-2xl sm:gap-2">
              <p className=" flex items-baseline gap-2 font-bold text-center">Welcome to</p>
              <h2 className="text-4xl text-emerald-200 font-bold text-center">Bandarban</h2>
            </span>
            <h1 className="sm:text-8xl text-5xl font-bold text-emerald-300 text-center p-6 animate-pulse hname">MEGHLOKH</h1>
            <p className="text-xl font-extralight text-emerald-50 text-center">Enjoy the Natural Beauty of Bandarban with our services</p>
          </div>
        </div>
      </div>
      <div className="absolute top-full w-full bg-emerald-900">
        <div className="flex justify-center items-center m-20">
          <Link href="/booknow" className="bg-emerald-400 animate-bounce text-emerald-950 px-10 py-5 rounded-2xl text-xl text-center font-bold shadow-black shadow-2xl hover:bg-emerald-600 hover:scale-110 hover:text-gray-300 transition-all duration-400">Your relaxing escape awaits | reserve today</Link>
        </div>
        <Gallary li={imageUrls} />
        <p className="text-center my-2">
          &copy; 2025 Bandarban. All rights reserved.
        </p>
        <p className="text-center my-2">
          This website is developed by - Pratush - <Link href={"https://pratushportfolio.vercel.app/"}>pratushportfolio.vercel.app</Link>
        </p>
      </div>
    </main>
  );
}
