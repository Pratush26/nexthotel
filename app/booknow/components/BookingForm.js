"use client";
import React, { useState, useEffect } from "react";
import { useStep } from "../StepContext";
import { useForm, Controller } from "react-hook-form";
import ClientDetails from "@/app/actions/ClientDetails";
import SubmitBooking from "@/app/actions/BookingInfo";
import generateDateRange from "@/app/actions/DateArr";
import Image from "next/image";
import { motion } from "framer-motion";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function BookNow({roomdata}) {
  const [checkPrice, setChcekPrice] = useState(false)
  const { step, setStep } = useStep();
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
    watch,
    trigger,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rooms: [],
    },
  });
  // ✅ Normalize both date arrays before comparing
  const normalizeDate = (date) => new Date(date).toISOString().split("T")[0];
  const selectedMethod = watch("paymentMethod");
  const [SelectIn, SelectOut] = watch(["checkin", "checkout"]);
  const selectedRooms = watch("rooms");
  const dateArr = generateDateRange(SelectIn, SelectOut).map(normalizeDate); // Ensures format
  
  // Step 2: Define room filter logic
  const isRoomAvailable = (room) => {
    const bookedDates = (room.bookedDate || []).map(normalizeDate); // Normalize booked dates
    return !dateArr.some(date => bookedDates.includes(date)); // No overlap allowed
  };
  
  // Step 3: Apply filter and create room options
  const roomOptions = roomdata
  .filter(isRoomAvailable)
  .map(room => ({
    id: room._id,
    value: room.name,
    label: `${room.name} - ৳${room.price} - ${room.type}`,
    price: room.price,
  }));
  
  
  // Calculate amounts when rooms or coupon change
  // inside your component
 const couponCode = checkPrice && watch("coupon")?.toUpperCase();
const isCouponValid = couponCode === "DISCOUNT10";

useEffect(() => {
  // Sum of room prices
  const total = selectedRooms.reduce((sum, room) => sum + (room.price || 0), 0);

  // Discount if coupon matches
  const discount = isCouponValid ? 1000 : 0;

  // Calculate total for number of days
  const daysCount = dateArr.length || 1; // fallback to 1 if empty

  // Calculate final after discount
  const final = total * daysCount - discount;

  setValue("totalAmount", total * daysCount);
  setValue("finalAmount", final > 0 ? final : 0);
  setValue("couponDiscount", discount);
  setValue("coupon", couponCode);
  setValue("bookedBy", "user");
  setValue("bookingStatus", "Pending");
}, [selectedRooms, isCouponValid, dateArr.length, setValue]);


const totalAmount = watch("totalAmount") || 0;
const finalAmount = watch("finalAmount") || 0;
const couponDiscount = watch("couponDiscount") || 0;


  const onSubmit = async (data) => {
    console.log(data);
    await SubmitBooking(data);
    reset(); // Reset the form after submission
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
  if (!isMounted) return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 items-center justify-center bg-emerald-800/30 backdrop-blur-sm px-4 py-10 rounded-2xl shadow-xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Booking Form</h1>
      {step == 1 && (
        <div className='flex flex-col gap-2 items-center justify-center md:w-1/2 sm:w-3/4 w-full h-full p-1'>
          <div className='flex flex-col w-full'>

            {errors.name ? <motion.p className='text-red-400 text-sm'
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
              }}>{errors.name.message}</motion.p> : <label htmlFor="name">Name:</label>}
            <input
              id="name"
              className="border border-gray-300 rounded-md bg-white p-2 mb-2 placeholder:text-gray-500 text-black"
              placeholder="Enter your name"
              {...register('name', { required: 'Name is required' })}
            />
          </div>

          <div className='flex flex-col w-full'>

            {errors.email ? <motion.p className='text-red-400 text-sm'
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
              }}>{errors.email.message}</motion.p> : <label htmlFor="email">Email:</label>}
            <input
              id="email"
              className="border border-gray-300 rounded-md bg-white p-2 mb-2 placeholder:text-gray-500 text-black"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address'
                }
              })}
            />
          </div>

          <div className='flex flex-col w-full'>

            {errors.phone ? <motion.p className='text-red-400 text-sm'
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
              }}>{errors.phone.message}</motion.p> : <label htmlFor="phone">Phone:</label>}
            <input
              id="phone"
              className="border border-gray-300 rounded-md bg-white p-2 mb-2 placeholder:text-gray-500 text-black"
              placeholder="Enter your contact number"
              type="tel"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: 'Invalid phone number'
                }
              })}
            />
          </div>
          <button type="button"
            onClick={async () => {
              const isValid = await trigger(["name", "email", "phone"]); // validate these fields
              if (isValid) {
                const data = watch();
                console.log(data);
                ClientDetails(data);
                setStep(step + 1);
              }
            }} className='bg-emerald-700 flex gap-1 justify-center items-center text-white w-full p-2 rounded-lg m-2 font-bold hover:bg-emerald-800 cursor-pointer hover:scale-105 transition-all duration-300'>Submit<Image src="/rightarrow.svg" className="dark:invert" width={14} height={14} alt='i' /></button>
        </div>
      )}


      {step == 2 && (<>
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
                  minDate={getValues("checkin") || new Date()}
                  maxDate={getValues("checkin") ? new Date(new Date(getValues("checkin")).setDate(getValues("checkin").getDate() + 14)) : null}
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
        {!SelectIn && !SelectOut && <h4 className="text-amber-300 text-center">Give Checkin & Checkout Date to Select rooms</h4> }
        {/* Display selected rooms */}
        {SelectIn &&- SelectOut && <Controller
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
                      {room.value}
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
        />}
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
          <button onClick={() => { setChcekPrice(true) }} className="bg-emerald-700 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300 rounded-lg m-6" type="button">Check Price</button>
        </div>
<div className="text-white bg-emerald-800 p-4 rounded-2xl inset-shadow-sm inset-shadow-emerald-950 w-5/6 text-center">
  <h6 className="font-semibold">Price estimate</h6>
  {selectedRooms && selectedRooms.length > 0 && (
    <>
      <div className="flex justify-between items-center w-full gap-2">
        <section className="flex flex-col items-center">
          {selectedRooms.map((room, index) => (
            <motion.span
              className="px-3 py-1 rounded-full text-sm"
              key={room.value}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
              }}
            >
              {room.value}
            </motion.span>
          ))}
        </section>
        <section className="flex flex-col items-center">
          {selectedRooms.map((room, index) => (
            <p key={index}>{room.price}/=</p>
          ))}
        </section>
      </div>

      <span className="inline-block w-full h-0.5 rounded-2xl bg-amber-50"></span>

      <section>
        {isCouponValid && (
  <div>
    <div className="flex items-center justify-between">
      <p>Total Amount</p>
      <p>{totalAmount}/=</p>
    </div>
    <div className="flex items-center justify-between">
      <p>Coupon</p>
      <p>{couponDiscount}/=</p>
    </div>
    <span className="inline-block w-full h-0.5 rounded-2xl bg-amber-50"></span>
  </div>
)}

        <div className="flex items-center justify-between">
          <p>Final Amount</p>
          <p>{finalAmount}/=</p>
        </div>
      </section>
    </>
  )}
</div>

        <div className="flex items-center justify-center w-full">
          <button onClick={() => { setStep(step - 1) }} className="bg-emerald-700 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300 rounded-lg m-6 flex gap-1"><Image src="/leftarrow.svg" className="dark:invert" width={14} height={14} alt="i" />Go Back</button>
          <button onClick={async () => {
            const isValid = await trigger(["checkin", "checkout", "rooms"]); // validate these fields
            if (isValid) {
              const data = watch();
              console.log(data);
              setStep(step + 1);
            }
          }} className="bg-emerald-700 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300 rounded-lg m-6 flex gap-1">Confirm Booking<Image src="/rightarrow.svg" className="dark:invert" width={14} height={14} alt="i" /></button>
        </div>
      </>)}



      {step == 3 && (
        <>
          {/* Radio Buttons */}
          <div className="flex items-center justify-center gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" value="bkash" {...register("paymentMethod", { required: "Please select a payment method" })} />
              Bkash
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="nagad" {...register("paymentMethod")} />
              Nagad
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="rocket" {...register("paymentMethod")} />
              Rocket
            </label>
          </div>

          {/* Error for payment method */}
          {errors.paymentMethod && (
            <motion.p className="text-red-500 text-sm text-center"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.paymentMethod.message}
            </motion.p>
          )}

          {/* TrxID Input and Dynamic Number Display */}
          {selectedMethod && (
            <div className="flex flex-col px-16">
              {/* Show number based on selected method */}
              <p className="text-center text-white mb-2">
                Send to {selectedMethod === "bkash" && "017XXXXXXXX (Bkash)"}
                {selectedMethod === "nagad" && "018XXXXXXXX (Nagad)"}
                {selectedMethod === "rocket" && "019XXXXXXXX (Rocket)"}
              </p>

              {/* TrxID Input */}
              {errors.trxId ? (
                <motion.p className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.trxId.message}
                </motion.p>
              ) : (
                <label htmlFor="trxId">TrxID:</label>
              )}

              <input
                id="trxId"
                placeholder="Enter TrxID"
                className="border border-gray-300 rounded-md bg-white p-2 mb-2 placeholder:text-gray-500 text-black"
                {...register("trxId", {
                  required: "TrxID is required",
                  minLength: {
                    value: 6,
                    message: "TrxID must be at least 6 characters",
                  },
                })}
              />

            </div>
          )}
          <p className="p-6 text-center text-gray-400">
            <b className="text-white underline">Note:</b> Send 40% of the estimated price <b className="text-amber-200 text-lg">( {(finalAmount * 0.4).toFixed(0)}৳ )</b> to the number above and write the Transaction ID in the TrxID field. You’ll receive confirmation shortly.
          </p>
          <p className="text-center font-bold text-md">Must bring your NID copies</p>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center w-full">
            <button onClick={() => setStep(step - 1)} type="button"
              className="bg-emerald-700 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300 rounded-lg m-6 flex gap-1">
              <Image src="/leftarrow.svg" className="dark:invert" width={14} height={14} alt="Back" />
              Go Back
            </button>

            <button type="submit"
              className="bg-emerald-700 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300 rounded-lg m-6">
              Submit
            </button>
          </div>
        </>
      )}

    </form>
  )

}