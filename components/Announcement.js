"use client"
import { Delete } from "lucide-react"
import { useState } from "react"

export default function Announcement({ data }) {
  const [visible, setVisible] = useState(true)
  return (
    <div className={`fixed top-[50%] left-[50%] px-4 py-2 z-10 h-[70%] w-[80%] sm:w-[50%] flex flex-col rounded-2xl bg-gray-300 -translate-x-1/2 -translate-y-1/2 text-black ${!visible && "hidden"}`}>
      <div className="w-full flex justify-end">
        <button type="button" onClick={() => { setVisible(false) }} className="m-2 cursor-pointer">
          <Delete />
        </button>
      </div>
      <span className="text-center">
        <h4 className="text-amber-700 text-xl md:text-2xl font-bold italic text-shadow-black text-shadow-md">Announcement !</h4>
        <h3 className="font-bold text-2xl md:text-3xl capitalize my-2">{data.title}</h3>
        {data.desc.map((item, i) => (
          <p key={i} className={item.bold ? "font-bold" : ""}>
            {item.text}
          </p>
        ))}
      </span>
    </div>

  )
}