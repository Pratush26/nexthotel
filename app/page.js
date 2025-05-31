import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Gallary from "@/components/Gallary";

export default function Home() {
  return (
    <main>
      <div className="w-full h-screen absolute top-0 left-0 -z-10">
        <Suspense fallback={<div className="w-full h-screen bg-emerald-950"></div>}>
        <Image src="https://images.pexels.com/photos/939715/pexels-photo-939715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Picture of the author" fill={true} className="object-cover grayscale-25 contrast-100 saturate-100 brightness-60" />
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
        <Link href="/booknow/identity" className="bg-emerald-400 animate-bounce text-emerald-950 px-10 py-5 rounded-2xl text-xl text-center font-bold shadow-black shadow-2xl hover:bg-emerald-600 hover:scale-110 hover:text-gray-300 transition-all duration-400">Your relaxing escape awaits | reserve today</Link>
        </div>
        <Gallary />
        <h1 className="text-4xl text-center font-bold underline">Notices</h1>
        <p className="text-center">
          &copy; 2025 Bandarban. All rights reserved.
        </p>
      </div>
    </main>
  );
}
