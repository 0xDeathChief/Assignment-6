"use client";

import Link from "next/link";
import { useGymContext } from "@/context/GymContext";

const PlanSavedLinks = () => {
  const { plan, saved } = useGymContext();

  return (
    <div className="flex items-center gap-3 sm:gap-8">
      <Link
        href="/my-plan#today"
        aria-label={`Today's plan: ${plan.length} workouts`}
        className="flex items-center gap-2 text-white sm:gap-3"
      >
        <span className="hidden sm:inline">Plan</span>

        <span className="grid h-8 min-w-8 place-items-center rounded-full bg-[#C2F800] px-2 text-sm font-bold text-black">
          {plan.length}
        </span>
      </Link>

      <Link
        href="/my-plan#saved"
        aria-label={`Saved workouts: ${saved.length}`}
        className="flex items-center gap-2 text-gray-400 hover:text-white sm:gap-3"
      >
        <span className="hidden sm:inline">Saved</span>

        <span className="grid h-8 min-w-8 place-items-center rounded-full border border-white/20 px-2 text-sm font-bold text-white">
          {saved.length}
        </span>
      </Link>
    </div>
  );
};

export default PlanSavedLinks;
