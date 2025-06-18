'use client';

import { useRouter } from "next/navigation";
import { ConfirmBooking } from "@/app/actions/BtnFunction"

export default function UpdateStatusBtn({ id, newStatus = "Confirmed" }) {
  const router = useRouter();

  async function handleUpdate() {
    try {
      await ConfirmBooking(id, newStatus);
      router.refresh(); // Refresh the page to show updated status
    } catch (error) {
      console.error("Update failed", error);
    }
  }

  return (
    <button
      onClick={handleUpdate}
      className="bg-emerald-800 hover:bg-emerald-900 rounded-xl px-2 py-1 transition-all duration-300 cursor-pointer"
    >
      Update to {newStatus}
    </button>
  );
}
