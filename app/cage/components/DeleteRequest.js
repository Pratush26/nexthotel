"use client";

import { useRouter } from "next/navigation";
import { handleDelete } from "@/app/actions/BtnFunction";

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
    <button onClick={onDelete} className="text-pink-700 hover:underline cursor-pointer">
      Delete
    </button>
  );
}
