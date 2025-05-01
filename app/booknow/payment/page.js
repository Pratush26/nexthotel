"use client";
import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const IdentityForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = (data) => {
        console.log(data);
        router.push('/booknow/ability');
    };

    return (
        <div className='flex flex-col items-center justify-center w-full h-full bg-emerald-800/30 rounded-2xl p-8'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 items-center justify-center md:w-1/2 sm:w-3/4 w-full h-full p-1'>
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
                <button type="submit" className='bg-emerald-700 flex gap-1 justify-center items-center text-white w-full p-2 rounded-lg m-2 font-bold hover:bg-emerald-800 cursor-pointer hover:scale-105 transition-all duration-300'>Submit<Image src="/rightarrow.svg" className="dark:invert" width={14} height={14} alt='i'/></button>
            </form>
        </div>
    );
};

export default IdentityForm;