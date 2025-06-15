"use client"
import { Delete } from "lucide-react"
import { useState } from "react"

export default function Announcement() {
    const [visible, setVisible] = useState(false)
    return (
        <div className={`fixed top-[50%] left-[50%] z-10 h-[70%] w-[50%] flex flex-col bg-gray-200 -translate-x-1/2 -translate-y-1/2 text-black ${!visible && "hidden"}`}>
  <div className="w-full flex justify-end">
    <button type="button" onClick={()=>{setVisible(false)}} className="m-2 cursor-pointer">
      <Delete />
    </button>
  </div>
  <span className="text-center">
    <h3 className="font-bold">Title</h3>
    <p>
    This is a notice, a general Announcement about this website launching
    </p>
    </span>
</div>

    )
}