"use client"
import { useForm } from "react-hook-form";
import { useState } from "react";
import CencelBookBtn from "./CencelBookBtn";
import ConfirmBookBtn from "./ConfirmBookBtn"

export default function BookingSidebar({ bookingDocs }) {
  const { register, watch } = useForm();
  const searchQuery = watch("search") || "";

  // Filter logic (by name, email, phone)
  const filteredDocs = bookingDocs.filter((it) =>
    [it.name, it.email, it.phone, it.trxId].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <aside className="flex flex-col gap-4 h-screen overflow-y-auto custom-scrollbar pr-4">

      {/* Search bar */}
      <form className="flex items-center justify-center my-2 w-full">
        <input
          type="text"
          {...register("search")}
          placeholder="Search by name, email or phone"
          className="w-11/12 px-4 py-2 rounded-xl text-black bg-white placeholder:text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </form>

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
            <ConfirmBookBtn id={it._id} newStatus="completed" />
            <CencelBookBtn id={it._id.toString()} />
            <ConfirmBookBtn id={it._id} newStatus="cancelled" />
          </div>
        </span>
      ))}
    </aside>
  );
}
