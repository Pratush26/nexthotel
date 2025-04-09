import Image from "next/image";

export default function Room() {
  return (
    <div className="flex flex-col justify-center items-center border-2 border-gray-300 rounded-lg p-4 w-1/5">
        <h1 className="text-2xl font-bold">Donesh-04</h1>
      <Image src="/window.svg" alt="Room" width={100} height={100} />
      <h5 className="text-md font-bold">AC Room</h5>
      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
    </div>
  );
}
