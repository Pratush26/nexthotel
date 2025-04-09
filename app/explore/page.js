import Room from "@/components/room";
export default function Explore() {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-5xl m-14 font-bold">Explore Our Rooms collection</h1>
      <div className="flex flex-wrap justify-center items-center gap-6">
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
      </div>
    </main>
  );
}
