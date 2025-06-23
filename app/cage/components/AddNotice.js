"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { motion } from "framer-motion"
import { createAnnouncement } from "@/app/actions/AddImgNote"

export default function AddAnnouncementForm() {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: "",
            desc: [{ text: "", bold: false }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "desc",
    })

    const onSubmit = async (data) => {
        await createAnnouncement(data)
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center gap-6 bg-emerald-900 p-10 rounded-lg w-2/3 mx-auto text-black"
        >
            <h2 className="text-xl text-white font-bold">Add New Announcement</h2>

            {/* Title */}
            <div className="flex flex-col w-full">
                {errors.title ? (
                    <motion.p
                        className="text-pink-700 text-sm"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 300,
                        }}
                    >
                        {errors.title.message}
                    </motion.p>
                ) : (
                    <label htmlFor="title" className="text-white">Title :</label>
                )}
                <input
                    id="title"
                    className="border border-gray-300 rounded-md bg-white p-2 mb-2 placeholder:text-gray-500 text-black"
                    placeholder="Enter your title"
                    {...register("title", { required: "title is required" })}
                />
            </div>

            {/* Description */}
            <div>
                <label className="text-white">Description :</label>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex flex-col gap-1 mb-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Enter text"
                                {...register(`desc.${index}.text`, { required: "description is required" })}
                                className="bg-white px-2 py-1 rounded w-full"
                            />
                            <label className="flex items-center gap-1 text-white">
                                <input type="checkbox" {...register(`desc.${index}.bold`)} />
                                <span>Bold</span>
                            </label>
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 font-bold cursor-pointer"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        {/* Per-field error display */}
                        {errors.desc?.[index]?.text && (
                            <motion.p
                                className="text-pink-700 text-sm ml-1"
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 300,
                                }}
                            >
                                {errors.desc[index].text.message}
                            </motion.p>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append({ text: "", bold: false })}
                    className="text-emerald-300 underline mt-2"
                >
                    + Add More
                </button>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-3/4 font-bold disabled:bg-gray-700 bg-emerald-700 text-white py-2 rounded-lg cursor-pointer hover:bg-emerald-800 hover:scale-105 transition-all duration-300"
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </form>
    )
}
