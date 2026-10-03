"use client";

import Link from "next/link";
import { useState } from "react";
import { Bookmark } from "lucide-react";
import { FaCalendarCheck } from "react-icons/fa";

const WorkoutButtons = () => {
  const [activeButton, setActiveButton] = useState("");

  return (
    <div className="mt-8 flex gap-3">

      
      <Link href="/pages/Plan">
        <button
          onClick={() => setActiveButton("plan")}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold ${
            activeButton === "plan"
              ? "bg-[#C2F800] text-black"
              : "border border-[#222630] text-white"
          }`}
        >
          <FaCalendarCheck size={16} />
          Add to todays plan
        </button>
      </Link>

    
      <Link href="/pages/Plan">
        <button
          onClick={() => setActiveButton("save")}
          className={`flex items-center gap-2 rounded-lg px-5 py-3 text-sm ${
            activeButton === "save"
              ? "bg-[#C2F800] font-semibold text-black"
              : "border border-[#222630] text-white hover:border-[#C2F800] hover:text-[#C2F800]"
          }`}
        >
          <Bookmark size={16} />
          Save for later
        </button>
      </Link>

    </div>
  );
};

export default WorkoutButtons;