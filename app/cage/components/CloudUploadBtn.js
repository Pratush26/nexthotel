"use client";
import { CldUploadButton } from "next-cloudinary";

export default function CloudUploadButton() {
  return (
    <CldUploadButton
      uploadPreset="ml_default"
      options={{
        folder: "next-hotel",
      }}
      className="px-4 py-2 rounded-xl bg-emerald-800 font-bold hover:bg-emerald-900 cursor-pointer"
    >
      Upload carousel Image
    </CldUploadButton>
  );
}
