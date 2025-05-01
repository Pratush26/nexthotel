"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { motion } from "framer-motion";
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
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30)

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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 items-center justify-center bg-emerald-800/30 backdrop-blur-sm px-4 py-10 rounded-2xl shadow-xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-white mb-6">Booking Form</h1>
            <div className="flex justify-between w-3/4">
                {/* Checkin Date */}
                <label className="text-white flex flex-col items-center justify-center w-full mr-4">

                    {errors.checkin ?
                        <motion.span className="text-red-400 text-sm mb-1"
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                type: "spring",
                                stiffness: 300,
                            }}>{errors.checkin.message}</motion.span> : "Check-In Date:"
                    }
                    <Controller
                        control={control}
                        name="checkin"
                        rules={{ required: 'Check-in date is required' }}
                        render={({ field }) => (
                            <DatePicker
                                placeholderText="Checkin Date"
                                minDate={new Date()}
                                maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="dd-MM-yyyy"
                                className="border-2 border-gray-300 rounded-md p-2 bg-white text-black w-full placeholder:text-gray-500"
                            />
                        )}
                    />
                </label>


                {/* Checkout Date */}
                <label className="text-white flex flex-col items-center justify-center w-full">
                    {errors.checkout ?
                        <motion.span className="text-red-400 text-sm mb-1"
                            initial={{ x: 10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                type: "spring",
                                stiffness: 300,
                            }}>{errors.checkin.message}</motion.span> : "Check-out Date:"
                    }
                    <Controller
                        control={control}
                        name="checkout"
                        rules={{ required: 'Check-out date is required' }}
                        render={({ field }) => (
                            <DatePicker
                                placeholderText="Checkout Date"
                                minDate={new Date()}
                                maxDate={new Date(new Date().setDate(new Date().getDate() + 44))}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                dateFormat="dd-MM-yyyy"
                                className="border-2 border-gray-300 rounded-md p-2 bg-white text-black w-full placeholder:text-gray-500"
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
                                    <motion.span className="bg-emerald-700 px-3 py-1 rounded-full text-sm"
                                        key={room.value}
                                        initial={{ x: 10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            type: "spring",
                                            stiffness: 300,
                                        }}>
                                        {room.label}
                                    </motion.span>
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
                <motion.p className="text-red-400 text-sm"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                    }}>{errors.rooms.message}</motion.p>
            )}
            <div className="flex justify-center items-baseline-last w-full">
                <div className="flex flex-col items-center justify-center">
                    {errors.coupon ? <motion.p className='text-red-400 text-sm mb-3'
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 300,
                        }}>{errors.coupon.message}</motion.p> : <label htmlFor="coupon">Coupon:</label>}
                    <input
                        id="coupon"
                        className="border border-gray-300 rounded-md bg-white p-2 mb-2 placeholder:text-gray-500 text-black"
                        placeholder="Enter Coupon"
                        type="text"
                        {...register('coupon',
                            // { required: 'invaild coupon' }
                        )}
                    />
                </div>
                <button className="bg-emerald-700 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300 rounded-lg m-6" type="submit">Check Price</button>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <span className="text-white bg-emerald-800 p-4 rounded-2xl inset-shadow-sm inset-shadow-emerald-950">Price estimate</span>
                <div className="flex items-center justify-center w-full">
                    <button className="bg-emerald-700 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300 rounded-lg m-6 flex gap-1"><Image src="/leftarrow.svg" className="dark:invert" width={14} height={14} alt="i" />Go Back</button>
                    <button className="bg-emerald-700 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300 rounded-lg m-6 flex gap-1">Confirm Booking<Image src="/rightarrow.svg" className="dark:invert" width={14} height={14} alt="i" /></button>
                </div>
            </div>
        </form>
    )

}