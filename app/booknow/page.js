import { connectDB } from "@/lib/mongoose";
import Room from "@/models/Room";
import Steps from "./components/Steps";
import BookingForm from "./components/BookingForm";
import { StepProvider } from './StepContext';

export default async function BookNow() {
  let rooms = [];
  try {
    await connectDB();
    const roomsFromDb = await Room.find().sort({ _id: 1 }).lean();

    // Convert _id to string
    rooms = roomsFromDb.map(room => ({
      ...room,
      _id: room._id.toString(),
    }));
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 items-center justify-items-center min-h-[80vh]">
      <StepProvider>
        <Steps />
        <BookingForm roomdata={rooms} />
      </StepProvider>
    </main>
  );
}
