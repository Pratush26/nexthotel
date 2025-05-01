"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Steps() {
    const pathname = usePathname()
    const progressHeight =
  pathname === '/booknow/ability'
    ? 'h-1/2'
    : pathname === '/booknow/payment'
    ? 'h-full'
    : 'h-0';

    return (
        <div className="flex flex-col items-center justify-center sm:w-3/4 w-full h-auto bg-emerald-800/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center m-4">Booking Steps</h2>
            <div className="grid grid-cols-[30%_70%] w-full">
                <div className="flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                <span className={`absolute top-0 right-[48%] z-0 w-1 bg-emerald-600 rounded-full ${progressHeight}`} />
                    <span className="flex items-center justify-center w-8 h-8 text-white bg-emerald-700 rounded-full z-10">1</span>
                    <span className={`flex items-center justify-center w-8 h-8 text-white rounded-full z-10 ${(pathname === '/booknow/ability' || pathname === '/booknow/payment') ? 'bg-emerald-700' : 'bg-cyan-600'}`}>2</span>
                    <span className={`flex items-center justify-center w-8 h-8 text-white rounded-full z-10 ${pathname === '/booknow/payment' ? 'bg-emerald-700' : 'bg-cyan-600'}`}>3</span>
                </div>
                <div className="flex flex-col items-baseline justify-center gap-4">
                    <span className="">Give your Details</span>
                    <span className="">Check ability</span>
                    <span className="">Payment</span>
                </div>
            </div>
        </div>
    );
}