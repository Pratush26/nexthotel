import { connectDB } from "@/lib/mongoose";
import BookingRequest from "@/models/BookingRequest";
import DeleteRequestBtn from "@/components/DeleteRequest";

export default async function Bookings() {
  let bookingDocs = [];

  try {
    await connectDB();
    bookingDocs = await BookingRequest.find().sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error("Error loading BookingRequests:", error);
  }

  return (
    <main className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="font-bold text-2xl">All Booking Request</h1>
      {bookingDocs.map((it) => (
        <section
          key={it._id.toString()}
          className="flex justify-between items-center w-full rounded-2xl border-1 border-amber-50 m-6 sm:px-18 px-4 py-6"
        >
          <div className="flex flex-col sm:flex-row sm:gap-6 gap-2">
            <p>{it.name}</p>
            <p>{it.email}</p>
            <p>{it.phone}</p>
          </div>
          <div>
            <DeleteRequestBtn id={it._id.toString()} />
          </div>
        </section>
      ))}
    </main>
  );
}

export const dynamic = "force-dynamic";
