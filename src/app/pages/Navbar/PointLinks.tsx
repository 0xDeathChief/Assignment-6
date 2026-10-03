"use client";

import Link from "next/link";
import { useState } from "react";

const PlanSavedLinks = () => {
  const [activeButton, setActiveButton] = useState("Plan");

  return (
    <div className="flex items-center gap-8">

      <Link
        href="/pages/Plan"
        onClick={() => setActiveButton("Plan")}
        className={
          activeButton === "Plan"
            ? "flex items-center gap-3 text-white"
            : "flex items-center gap-3 text-gray-400 hover:text-white"
        }
      >
        <span>Plan</span>

        <span
          className={
            activeButton === "Plan"
              ? "grid h-8 w-8 place-items-center rounded-full bg-[#C2F800] text-sm font-bold text-black"
              : "grid h-8 w-8 place-items-center rounded-full border border-white/20 text-sm font-bold text-white"
          }
        >
          0
        </span>
      </Link>

  
      <Link
        href="/pages/Plan"
        onClick={() => setActiveButton("Saved")}
        className={
          activeButton === "Saved"
            ? "flex items-center gap-3 text-white"
            : "flex items-center gap-3 text-gray-400 hover:text-white"
        }
      >
        <span>Saved</span>

        <span
          className={
            activeButton === "Saved"
              ? "grid h-8 w-8 place-items-center rounded-full bg-[#C2F800] text-sm font-bold text-black"
              : "grid h-8 w-8 place-items-center rounded-full border border-white/20 text-sm font-bold text-white"
          }
        >
          0
        </span>
      </Link>

    </div>
  );
};

export default PlanSavedLinks;
