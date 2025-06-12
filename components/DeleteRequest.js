"use client";

import { useRouter } from "next/navigation";
import { handleDelete } from "@/app/actions/HandleDeleteRequest";

export default function DeleteRequestBtn({ id }) {
  const router = useRouter();

  async function onDelete() {
    try {
      await handleDelete(id);
      router.refresh();  // refresh the page to update UI after deletion
    } catch (error) {
      console.error("Delete failed", error);
    }
  }

  return (
    <button onClick={onDelete} className="text-red-600 hover:underline">
      Delete
    </button>
  );
}
