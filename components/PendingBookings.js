"use client"
import { useForm } from "react-hook-form";
import { useState } from "react";
import DeleteBookBtn from "./DeleteBookBtn";
import ConfirmBookBtn from "./ConfirmBookBtn"
import { usePathname } from "next/navigation";

export default function BookingSidebar({ bookingDocs }) {
  const pathname = usePathname();
  const { register, watch } = useForm();
  const searchQuery = watch("search") || "";

  // Filter logic (by name, email, phone)
  const filteredDocs = bookingDocs.filter((it) =>
    [it.name, it.email, it.phone, it.trxId].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <section>
      <form className="flex items-center justify-center my-4 w-full">
        <input
          type="text"
          {...register("search")}
          placeholder="Search by name, email or phone"
          className="w-11/12 px-4 py-2 rounded-xl text-black bg-white placeholder:text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </form>
    <aside className={`grid gap-4 ${ pathname === "/cage/orders" ? "custom-scrollbar h-screen overflow-y-auto pr-4 grid-cols-1" : "grid-cols-2" }`}>

      {/* Search bar */}

      {/* Filtered list */}
      {filteredDocs.map((it) => (
        <span
          key={it._id.toString()}
          className="flex flex-col md:flex-row justify-between w-full rounded-2xl bg-emerald-950/70 sm:px-18 px-4 py-6"
        >
          <div className="flex flex-col gap-2 text-white">
            <p>{it.name}</p>
            <p>{it.email}</p>
            <p>{it.phone}</p>
            <p>&gt;In : {new Date(it.checkInDate).toLocaleDateString("en-GB", {
              month: "long",
              day: "numeric",
            })}</p>

            <p>Out: {new Date(it.checkOutDate).toLocaleDateString("en-GB", {
              month: "long",
              day: "numeric"
            })}</p>
            <p>Rooms: {it.roomNo.join(", ")}</p>
            <p>Coupon : {it.couponCode}</p>
            <p>TrxID : {it.trxId}</p>
            <p className="text-amber-200">{it.bookingStatus}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <DeleteBookBtn id={it._id.toString()} />
            <ConfirmBookBtn id={it._id} newStatus="Cancelled" />
            <ConfirmBookBtn id={it._id} newStatus="Completed" />
            <ConfirmBookBtn id={it._id} newStatus="Paid" />
          </div>
        </span>
      ))}
    </aside>
    </section>
  );
}
