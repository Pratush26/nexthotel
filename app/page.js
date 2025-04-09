import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="w-full h-screen absolute top-0 left-0 -z-10">
      <Image src="https://images.pexels.com/photos/939715/pexels-photo-939715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Picture of the author" fill={true} className="object-cover grayscale-25 contrast-100 saturate-100 brightness-60" />
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center backdrop-blur-[16px] p-14 rounded-4xl hbox">
        <h1 className="text-3xl flex items-baseline gap-2 font-bold text-center">Welcome to <p className="text-4xl text-emerald-100 font-bold text-center">Bandarban</p></h1>
        <h1 className="text-8xl font-bold text-emerald-200 text-center p-6 animate-pulse hname">BANANIBASH</h1>
        <p className="text-xl font-extralight text-emerald-50 text-center">Enjoy the Natural Beauty of Bandarban with our services</p>
        </div>
      </div>
    </main>
  );
}
