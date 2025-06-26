"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react"; // ✅ FIXED: added useEffect
import Link from "next/link";
import { deleteRoom } from "@/app/actions/CreateRoom";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import generateDateRange from "@/app/actions/DateArr";

export default function ExploreClient({ roomDocs, option }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filteredRooms, setFilteredRooms] = useState(roomDocs); // ✅ fallback to full list initially

  // ✅ Move searchParams usage after it's defined
  useEffect(() => {
  const type = searchParams.get("type");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  let result = [...roomDocs];

  if (type) {
    result = result.filter((room) =>
      room.type.toLowerCase() === type.toLowerCase()
    );
  }

  if (checkIn && checkOut) {
    // ✅ Pass date strings directly
    console.log("Check-in:", checkIn, "Check-out:", checkOut);
    const range = generateDateRange(checkIn, checkOut);

    result = result.filter((room) => {
      const booked = room.bookedDate.map((d) =>
        new Date(d).toISOString().split("T")[0]
      );
      return !range.some((date) => booked.includes(date));
    });
  }

  setFilteredRooms(result);
}, [searchParams, roomDocs]);


  const filters = [
    { label: "All", value: undefined },
    { label: "AC", value: "AC Room" },
    { label: "Non-AC", value: "Non-AC Room" },
    { label: "Duplex AC", value: "Duplex AC Room" },
    { label: "Duplex Non-AC", value: "Duplex Non-AC Room" },
  ];

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      type: searchParams.get("type") || "",
      checkIn: searchParams.get("checkIn")
        ? new Date(searchParams.get("checkIn"))
        : null,
      checkOut: searchParams.get("checkOut")
        ? new Date(searchParams.get("checkOut"))
        : null,
    },
  });

  const currentTypes = searchParams.get("type") || "";

  const onSubmit = (data) => {
    const params = new URLSearchParams();
    if (data.type) params.set("type", data.type);
    if (data.checkIn)
      params.set("checkIn", data.checkIn);
    if (data.checkOut)
      params.set("checkOut", data.checkOut);

    router.push(`/cage/check-bookings?${params.toString()}`);
  };

  return (
    <>
      {/* Filters Links */}
      <div className="flex flex-wrap justify-evenly w-full gap-3 mb-4">
        <div className="flex justify-center items-center">
          <span className="flex flex-wrap justify-center items-center gap-2">
            {filters.map(({ label, value }) => {
              const href = value
                ? `/cage/check-bookings?type=${encodeURIComponent(value)}${
                    searchParams.get("checkIn") && searchParams.get("checkOut")
                      ? `&checkIn=${searchParams.get("checkIn")}&checkOut=${searchParams.get("checkOut")}`
                      : ""
                  }`
                : `/cage/check-bookings${
                    searchParams.get("checkIn") && searchParams.get("checkOut")
                      ? `?checkIn=${searchParams.get("checkIn")}&checkOut=${searchParams.get("checkOut")}`
                      : ""
                  }`;

              const isActive =
                (!value && !currentTypes) ||
                value?.toLowerCase() === currentTypes?.toLowerCase();

              return (
                <Link
                  key={label}
                  href={href}
                  className={`px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? "bg-emerald-800 text-white border-emerald-700"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </span>
        </div>

        {/* Date Filter Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-baseline-last gap-4 mb-6"
        >
          <div className="w-48">
            <label className="block mb-1 font-semibold">Check-In Date:</label>
            <Controller
              control={control}
              name="checkIn"
              rules={{ required: "Check-in date is required" }}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select check-in date"
                  minDate={new Date()}
                  maxDate={
                    new Date(new Date().setDate(new Date().getDate() + 30))
                  }
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="dd-MM-yyyy"
                  className="border-2 border-gray-300 rounded-md p-2 bg-white text-black w-full placeholder:text-gray-500"
                />
              )}
            />
          </div>

          <div className="w-48">
            <label className="block mb-1 font-semibold">Check-Out Date:</label>
            <Controller
              control={control}
              name="checkOut"
              rules={{ required: "Check-out date is required" }}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select check-out date"
                  minDate={
                    watch("checkIn")
                      ? new Date(watch("checkIn").getTime() + 86400000)
                      : new Date()
                  }
                  maxDate={
                    new Date(new Date().setDate(new Date().getDate() + 31))
                  }
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="dd-MM-yyyy"
                  className="border-2 border-gray-300 rounded-md p-2 bg-white text-black w-full placeholder:text-gray-500"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-800 text-white px-6 py-2 rounded hover:bg-emerald-900 transition"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className={`flex flex-col justify-center items-center gap-2 hover:border-1 hover:shadow-none border-gray-300 rounded-lg p-4 w-full shadow-gray-50/60 shadow-[0_1px_8px_rgba(0,0,0,0.3)] transition-all duration-300 ${
              room.bookedDate.length > 0 ? "bg-emerald-950" : ""
            }`}
          >
            <h1 className="text-xl text-shadow-lg text-shadow-black">
              {room.name}
            </h1>
            <h5 className="text-sm font-bold">{room.type}</h5>
            <h5 className="text-sm text-emerald-200 font-bold">{room.price}/=</h5>

            {option && (
              <span className="flex w-full justify-evenly items-center">
                <Link
                  href={`/cage/admin/rooms/edit/${encodeURIComponent(
                    room.name
                  )}`}
                >
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    const result = await deleteRoom(room.name);
                    if (result.success) {
                      router.refresh();
                    } else {
                      alert(result.message);
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </span>
            )}

            {room.bookedDate.map((d, i) => (
              <p key={i}>{new Date(d).toLocaleDateString("en-GB")}</p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
