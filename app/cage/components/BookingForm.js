"use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import SubmitBooking from "@/app/actions/BookingInfo";
import generateDateRange from "@/app/actions/DateArr";
import Image from "next/image";
import { motion } from "framer-motion";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function BookNow({ roomdata, coupons }) {
  const [checkPrice, setChcekPrice] = useState(false)
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
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      rooms: [],
    },
  });
  // ✅ Normalize both date arrays before comparing
  const normalizeDate = (date) => new Date(date).toISOString().split("T")[0];
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
    label: `${room.name} - ৳${room.offprice || room.price} - ${room.type}`,
    price: room.offprice || room.price, // fallback to regular price if no offprice
  }));


  // Calculate amounts when rooms or coupon change
  // inside your component
const couponCode = checkPrice && watch("coupon")?.trim();

const matchedCoupon = coupons.find(
  (c) => c.coupon.trim() === couponCode
);
// Validate coupon presence
const isCouponValid = Boolean(matchedCoupon);

// Parse discount:
// if discount ends with %, treat as percentage; else fixed amount
function parseDiscount(discountStr, total) {
  if (!discountStr) return 0;
  discountStr = discountStr.trim();
  if (discountStr.endsWith("%")) {
    const perc = parseFloat(discountStr.slice(0, -1));
    if (isNaN(perc)) return 0;
    return (total * perc) / 100;
  } else {
    const fixed = parseFloat(discountStr);
    return isNaN(fixed) ? 0 : fixed;
  }
}

  useEffect(() => {
  const total = selectedRooms.reduce((sum, room) => sum + (room.price || 0), 0);
  const daysCount = dateArr.length || 1;

  // Calculate discount from matched coupon or 0
  const discount = isCouponValid ? parseDiscount(matchedCoupon.discount, total * daysCount) : 0;

  const final = total * daysCount - discount;

    setValue("totalAmount", total * daysCount);
    setValue("finalAmount", final > 0 ? final : 0);
    setValue("couponDiscount", discount);
    setValue("coupon", couponCode);
    setValue("trxId", null);
    setValue("bookedBy", "employee");
    setValue("paymentMethod", "handy");
    setValue("bookingStatus", "Confirmed");
    setValue("recieved", null);
  }, [selectedRooms, isCouponValid, couponCode, dateArr.length, setValue, matchedCoupon]);


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
      </div>


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
      {!SelectIn && !SelectOut && <h4 className="text-amber-300 text-center">Give Checkin & Checkout Date to Select rooms</h4>}
      {/* Display selected rooms */}
      {SelectIn && - SelectOut && <Controller
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
      <div className="flex flex-wrap justify-center items-baseline-last w-full">
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


          <button 
          type="submit"
          disabled={isSubmitting}
            className="bg-emerald-700 disabled:bg-gray-700 text-white font-bold px-9 py-3 cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300 rounded-lg m-6">
            Submit
          </button>


    </form>
  )

}