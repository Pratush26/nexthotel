"use client";

import { useRouter } from "next/navigation";
import { deleteItem } from "@/app/actions/AddImgNote";

export default function DeleteButton({ id, type }) {
  const router = useRouter();

  async function onDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    try {
      await deleteItem(id, type);
      router.refresh(); // refresh UI without full reload
    } catch (error) {
      console.error("Delete failed", error);
    }
  }

  return (
    <button
      onClick={onDelete}
      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800 transition-all duration-300 cursor-pointer"
    >
      Delete
    </button>
  );
}
