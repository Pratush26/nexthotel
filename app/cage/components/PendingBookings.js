"use client"
import { useForm } from "react-hook-form";
import { useState } from "react";
import DeleteBookBtn from "./DeleteBookBtn";
import ConfirmBookBtn from "./ConfirmBookBtn"
import { usePathname } from "next/navigation";
import { UpdateRecieved } from "@/app/actions/BtnFunction";

export default function BookingSidebar({ bookingDocs }) {
  const pathname = usePathname();
  const { register, watch } = useForm();
  const searchQuery = watch("search") || "";

  // Filter logic (by name, email, phone)
  const filteredDocs = bookingDocs.filter((it) =>
    [it.name, it.email, it.phone, it.trxId].some((field) =>
      String(field || "").toLowerCase().includes(searchQuery.toLowerCase())
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
      <aside className={`grid gap-4 ${pathname === "/cage/orders" ? "custom-scrollbar h-screen overflow-y-auto pr-4 grid-cols-1" : "grid-cols-2"}`}>

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
              <form action={UpdateRecieved} className="flex gap-2">
                <input type="hidden" name="id" value={it._id} />
                <label htmlFor={`recieved-${it._id}`} className="flex items-center gap-2 text-white">Recieved:</label>
                <input
                  type="number"
                  name="recieved"
                  id={`recieved-${it._id}`}
                  defaultValue={it.recieved}
                  className="border w-1/3 bg-amber-50 rounded p-1 text-black"
                />
                <button type="submit" className="bg-emerald-700 text-white px-2 py-1 rounded">
                  Update
                </button>
              </form>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <DeleteBookBtn id={it._id.toString()} />
              <ConfirmBookBtn id={it._id} newStatus="Cancelled" />
              <ConfirmBookBtn id={it._id} newStatus="Confirmed" />
              <ConfirmBookBtn id={it._id} newStatus="Paid" />
            </div>
          </span>
        ))}
      </aside>
    </section>
  );
}
