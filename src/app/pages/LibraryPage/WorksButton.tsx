"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { FaCalendarCheck } from "react-icons/fa";
import type { Item } from "@/app/Types/type";
import { useGymContext } from "@/context/GymContext";

const WorkoutButtons = ({ item }: { item: Item }) => {
  const { addToPlan, addToSaved, plan, storageLoaded } = useGymContext();
  const isAdded = plan.some((workout) => workout.id === item.id);
  const planIsFull = plan.length >= 5;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        onClick={() => addToPlan(item)}
        disabled={!storageLoaded || isAdded || planIsFull}
        className="flex items-center justify-center gap-2 rounded-lg bg-[#C2F800] px-5 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaCalendarCheck size={16} />
        {!storageLoaded
          ? "Loading plan..."
          : isAdded
            ? "Added to today's plan"
            : "Add to today's plan"}
      </button>

      <button
        onClick={() => addToSaved(item)}
        disabled={!storageLoaded}
        className="flex items-center justify-center gap-2 rounded-lg border border-[#222630] px-5 py-3 text-sm text-white transition hover:border-[#C2F800] hover:text-[#C2F800]"
      >
        <Bookmark size={16} />
        Save for later
      </button>
    </div>
  );
};

export default WorkoutButtons;