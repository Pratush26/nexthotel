"use client";

import { useRouter } from "next/navigation";
import { CencelBooking } from "@/app/actions/CencelBooking";

export default function CencelBookBtn({ id }) {
  const router = useRouter();

  async function onDelete() {
    try {
      await CencelBooking(id);
      router.refresh();  // refresh the page to update UI after deletion
    } catch (error) {
      console.error("Delete failed", error);
    }
  }

  return (
    <button onClick={onDelete} className="text-pink-800 cursor-pointer hover:underline text-wrap text-center">
      Delete Booking
    </button>
  );
}
