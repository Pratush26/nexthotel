'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { createRoom } from '@/app/actions/CreateRoom';

import {
    Wifi,
    AirVent,
    Utensils,
    TvIcon,
    WavesLadder,
    Music
} from 'lucide-react';

const ICON_OPTIONS = [
    { name: 'Wifi', Icon: Wifi },
    { name: 'AirVent', Icon: AirVent },
    { name: 'Utensils', Icon: Utensils },
    { name: 'TvIcon', Icon: TvIcon },
    { name: 'WavesLadder', Icon: WavesLadder },
    { name: 'Music', Icon: Music },
];

export default function RoomForm({ details = {} }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: details.name || '',
            image: details.image || '',
            description: details.description || '',
            type: details.type || '',
            price: details.price || '',
            offprice: details.offprice || null,
            icons: details.icons || [],
        },
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Optional: Ensure reset works even after async load
    useEffect(() => {
        reset({
            name: details.name || '',
            image: details.image || '',
            description: details.description || '',
            type: details.type || '',
            price: details.price || '',
            offprice: details.offprice || null,
            icons: details.icons || [],
        });
    }, [details, reset]);

    const onSubmit = async (data) => {
        setError(null);
        setSuccess(null);
        const res = await createRoom(data);

        if (res.success) {
            setSuccess(res.message); // shows: 'Room created', 'Room updated', or 'No changes detected'
            reset();
        } else {
            setError("Failed to save room.");
        }

    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center gap-6 bg-emerald-900 px-12 py-16 rounded-lg w-11/12 sm:w-2/3 md:w-1/2 mx-auto text-black"
        >
            {error && <p className="text-red-600 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            {/* Radio + Name/Image */}
            <section className="grid grid-cols-1 sm:grid-cols-[35%_65%] w-full items-center justify-items-center gap-2">
                {/* Room Type */}
                <div className="w-full">
                    <label className="text-white font-semibold">Room type:</label>
                    <div className="flex flex-col text-white">
                        {["AC Room", "Non-AC Room", "Duplex AC Room", "Duplex Non-AC Room"].map((option) => (
                            <label key={option} className="cursor-pointer">
                                <input
                                    {...register("type", { required: true })}
                                    type="radio"
                                    value={option}
                                    className="m-1"
                                />
                                {option}
                            </label>
                        ))}


                    </div>
                </div>

                {/* Room Name & Image */}
                <div className="w-full flex flex-col gap-4">
                    <input
                        {...register('name', { required: 'Room name is required' })}
                        placeholder="Room Name"
                        className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <input
                        {...register('image', { required: 'Image url is required' })}
                        placeholder="Image URL"
                        className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                </div>
            </section>

            {/* Description */}
            <div className="w-full">
                <textarea
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Description"
                    rows={3}
                    className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Icons */}
            <div className="w-full">
                <label className="text-white font-semibold mb-1 block">Select Icons:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ICON_OPTIONS.map(({ name, Icon }) => (
                        <label key={name} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                value={name}
                                defaultChecked={details.icons?.includes(name)}
                                {...register('icons')}
                                className="accent-emerald-500"
                            />
                            <Icon className="w-5 h-5 text-gray-300" />
                            <span className="text-sm text-white">{name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div className="w-full flex items-center justify-center gap-4">
                <input
                    {...register('price', { required: 'Price is required' })}
                    type="number"
                    placeholder="Price"
                    className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}

                <input
                    {...register('offprice')}
                    type="number"
                    placeholder="Offer Price"
                    className="bg-white placeholder:text-gray-500 w-full border px-3 py-2 rounded"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-3/4 disabled:bg-gray-800 font-bold bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
                {isSubmitting ? 'Submitting...' : 'Add Room'}
            </button>
        </form>
    );
}
