import { connectDB } from "@/lib/mongoose";
import BookingRequest from "@/models/BookingRequest";
import DeleteRequestBtn from "@/app/cage/components/DeleteRequest";
import PendingBookings from "@/app/cage/components/PendingBookings";
import Link from "next/link";
import Booking from "@/models/Booking";

export default async function Bookings() {
  let bookingDocs = [];
  let bookingReqDocs = [];

  try {
    await connectDB();

    // 🧹 Delete bookings older than 2 months
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    await Booking.deleteMany({
      updatedAt: { $lt: twoMonthsAgo }
    });

    // ✅ Now fetch fresh data
    const rawDocs = await BookingRequest.find().sort({ createdAt: -1 }).lean();
    const rowDocs = await Booking.find().sort({ createdAt: -1 }).lean();

    // 🔥 Convert _id and date fields to strings
    bookingReqDocs = rawDocs.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
    }));

    bookingDocs = rowDocs.map(doc => ({
      ...doc,
      _id: doc._id.toString(),
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.error("Error loading BookingRequests:", error);
  }

  return (
    <main className="flex justify-center items-center min-h-screen flex-col p-4">
      <h1 className="font-bold text-4xl text-center m-6 text-gray-700">All Booking Request</h1>
      <Link href={"/meghlokh"}>Home</Link>
      <div className="grid grid-cols-2 w-full gap-8">
        <h2 className="font-bold text-2xl text-center">Booking Requests</h2>
        <h2 className="font-bold text-2xl text-center">Pending Bookings</h2>

        {/* Booking Requests */}
        <aside className="flex flex-col gap-4 h-screen overflow-y-auto custom-scrollbar pr-4">
          {bookingReqDocs.map((it) => (
            <span
              key={it._id}
              className="flex flex-col md:flex-row justify-between w-full rounded-2xl border border-amber-50 sm:px-18 px-4 py-6"
            >
              <div className="flex flex-col gap-2">
                <p>{it.name}</p>
                <p>{it.email}</p>
                <p>{it.phone}</p>
              </div>
              <DeleteRequestBtn id={it._id} />
            </span>
          ))}
        </aside>

        {/* Pending Bookings */}
        <PendingBookings bookingDocs={bookingDocs} />
      </div>
    </main>
  );
}
