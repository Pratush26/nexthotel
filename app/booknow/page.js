"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const roomOptions = [
    { value: "101", label: "Room 101" },
    { value: "102", label: "Room 102" },
    { value: "103", label: "Room 103" },
    { value: "104", label: "Room 104" },
];


export default function BookNow() {
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            rooms: [],
        },
    });
    const onSubmit = (data) => {
        console.log(data);
    }
    if (!isMounted) return null;
    return (
        <div>
            <h1 className="text-3xl font-bold text-center text-white mb-6">Booking Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center justify-center bg-emerald-800/30 backdrop-blur-sm px-4 py-10 rounded-2xl shadow-xl w-1/2 mx-auto">
                <input className="border-2 border-gray-300 rounded-md p-2 bg-white text-black w-3/4" type="text" {...register("name")} placeholder="Name" />
                <input className="border-2 border-gray-300 rounded-md p-2 bg-white text-black w-3/4" type="email" {...register("email")} placeholder="Email" />
                <input className="border-2 border-gray-300 rounded-md p-2 bg-white text-black w-3/4" type="number" {...register("phone")} placeholder="Phone" />
                <label className="border-2 border-gray-300 rounded-md p-2 bg-white text-black w-3/4 cursor-pointer text-center">
                    <span className="text-sm">{selectedFileName || <p>Upload your ID proof <br /><small>(National ID, Passport, etc.)</small></p>}</span>
                    <input
                        type="file"
                        {...register("file")}
                        onChange={(e) => setSelectedFileName(e.target.files[0]?.name || "")}
                        className="hidden"
                    />
                </label>

                <div className="flex justify-between w-3/4">
                    {/* Checkin Date */}
                    <label className="text-white flex flex-col items-center justify-center w-full mr-4">
                        Checkin Date
                        <Controller
                            control={control}
                            name="checkin"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText="Checkin Date"
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="dd-MM-yyyy"
                                    className="border-2 border-gray-300 rounded-md p-2 bg-white text-black w-full"
                                />
                            )}
                        />
                    </label>

                    {/* Checkout Date */}
                    <label className="text-white flex flex-col items-center justify-center w-full">
                        Checkout Date
                        <Controller
                            control={control}
                            name="checkout"
                            rules={{ required: true }}
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText="Checkout Date"
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    dateFormat="dd-MM-yyyy"
                                    className="border-2 border-gray-300 rounded-md p-2 bg-white text-black w-full"
                                />
                            )}
                        />
                    </label>
                </div>
                <h2 className="text-xl font-semibold text-center">Select Your Rooms</h2>
                {/* Display selected rooms */}
                <Controller
                    name="rooms"
                    control={control}
                    rules={{ required: "Please select at least one room" }}
                    render={({ field }) => (
                        <>
                            {field.value && field.value.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {field.value.map((room) => (
                                        <span key={room.value} className="bg-emerald-700 px-3 py-1 rounded-full text-sm">
                                            {room.label}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <Select
                                {...field}
                                isMulti
                                options={roomOptions}
                                className="text-black w-3/4"
                                placeholder="Select room(s)..."
                                onChange={(val) => field.onChange(val)}
                            />
                        </>
                    )}
                />
                {errors.rooms && (
                    <p className="text-red-300 text-sm mt-1">{errors.rooms.message}</p>
                )}

                <input className="bg-emerald-600 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-700 hover:scale-105 transition-all duration-300 rounded-lg m-6" value="Confirm Booking" type="submit" />
            </form>
        </div>
    )

}
