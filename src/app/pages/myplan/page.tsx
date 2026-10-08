"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Oswald } from "next/font/google";
import { Check, X } from "lucide-react";
import { IoTimeOutline } from "react-icons/io5";
import { FaFireFlameCurved } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { useGymContext } from "@/context/GymContext";

const oswald = Oswald({
  subsets: ["latin"],
});

const Plan = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("duration");

  const {
    loading,
    error,
    storageError,
    plan,
    saved,
    done,
    storageLoaded,
    addToPlan,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useGymContext();

  // -----------------------------
  // Calculate total minutes
  // -----------------------------

  let minutes = 0;

  for (const workout of plan) {
    minutes = minutes + workout.duration;
  }

  // -----------------------------
  // Calculate total calories
  // -----------------------------

  let calories = 0;

  for (const workout of plan) {
    calories = calories + workout.caloriesBurned;
  }

  // -----------------------------
  // Decide which workouts to show
  // -----------------------------

  let workouts = [];

  if (activeTab === "today") {
    workouts = [...plan];
  } else {
    workouts = [...saved];
  }

  // -----------------------------
  // Sort workouts
  // -----------------------------

  if (sortBy === "duration") {
    workouts.sort((a, b) => b.duration - a.duration);
  }

  if (sortBy === "calories") {
    workouts.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  }

  if (sortBy === "rating") {
    workouts.sort((a, b) => b.rating - a.rating);
  }

  // -----------------------------
  // Loading
  // -----------------------------

  if (loading || !storageLoaded) {
    return (
      <div className="container mx-auto flex min-h-[40vh] items-center justify-center px-4 text-[#9CA3AF]">
        <span className="loading loading-spinner loading-md mr-3 text-[#C2F800]" />
        Loading workouts...
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-10">
      {/* =========================
          PAGE TITLE
      ========================== */}

      <div>
        <h1
          className={`${oswald.className} text-2xl font-bold uppercase text-white sm:text-3xl`}
        >
          My Plan
        </h1>

        <p className="mt-1 text-xs text-[#9CA3AF]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* =========================
          ERROR MESSAGE
      ========================== */}

      {storageError && (
        <p className="mt-4 text-xs text-red-400">{storageError}</p>
      )}

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      {/* =========================
          SUMMARY
      ========================== */}

      <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-xl border border-[#222630] bg-[#12151B] sm:grid-cols-3">
        {/* Exercises */}

        <div className="border-b border-[#222630] px-5 py-4 sm:border-b-0 sm:border-r">
          <p className="text-[10px] text-[#9CA3AF]">Exercises</p>

          <p
            className={`${oswald.className} mt-1 text-2xl font-bold text-[#C2F800]`}
          >
            {plan.length}
          </p>
        </div>

        {/* Minutes */}

        <div className="border-b border-[#222630] px-5 py-4 sm:border-b-0 sm:border-r">
          <p className="text-[10px] text-[#9CA3AF]">Minutes</p>

          <p
            className={`${oswald.className} mt-1 text-2xl font-bold text-white`}
          >
            {minutes}
          </p>
        </div>

        {/* Calories */}

        <div className="px-5 py-4">
          <p className="text-[10px] text-[#9CA3AF]">Calories</p>

          <p
            className={`${oswald.className} mt-1 text-2xl font-bold text-white`}
          >
            {calories}
          </p>
        </div>
      </div>

      {/* =========================
          TAB + SORT
      ========================== */}

      <div className="mt-6 flex items-center justify-between gap-4">
        {/* Tabs */}

        <div className="flex rounded-lg border border-[#222630] bg-[#12151B] p-1">
          <button
            onClick={() => setActiveTab("today")}
            className={`rounded-md px-3 py-1.5 text-[10px] transition ${
              activeTab === "today"
                ? "bg-[#1E222B] font-semibold text-white"
                : "text-[#9CA3AF]"
            }`}
          >
            Today's Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-3 py-1.5 text-[10px] transition ${
              activeTab === "saved"
                ? "bg-[#1E222B] font-semibold text-white"
                : "text-[#9CA3AF]"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort */}

        <label className="flex items-center gap-2 text-[10px] text-[#9CA3AF]">
          Sort By
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-md border border-[#222630] bg-[#12151B] px-2 py-1.5 text-[10px] text-white outline-none"
          >
            <option value="duration">Duration</option>

            <option value="calories">Calories</option>

            <option value="rating">Rating</option>
          </select>
        </label>
      </div>

      {/* =========================
          EMPTY STATE
      ========================== */}

      {workouts.length === 0 ? (
        <div className="mt-5 flex min-h-[230px] flex-col items-center justify-center rounded-xl border border-dashed border-[#222630] bg-[#111317] px-4 text-center">
          <h2
            className={`${oswald.className} text-base font-bold uppercase text-white`}
          >
            {activeTab === "today" ? "Nothing Here Yet" : "No Saved Workouts"}
          </h2>

          <p className="mt-1 max-w-sm text-[10px] text-[#9CA3AF]">
            {activeTab === "today"
              ? "Browse the library and add a lift to get today moving."
              : "Save a workout from the library and it will appear here."}
          </p>

          <Link
            href="/#library"
            className="mt-4 rounded-full bg-[#C2F800] px-5 py-2 text-[10px] font-semibold text-black transition hover:brightness-110"
          >
            {activeTab === "today" ? "Go to workouts" : "Browse Library"}
          </Link>
        </div>
      ) : (
        /* =========================
            WORKOUT LIST
        ========================== */

        <div className="mt-5 space-y-2">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center gap-3 rounded-xl border border-[#222630] bg-[#12151B] p-2.5 transition hover:border-[#303640]"
            >
              {/* =====================
                  IMAGE
              ====================== */}

              <Image
                src={workout.image}
                alt={workout.name}
                width={100}
                height={70}
                className="h-12 w-16 shrink-0 rounded-lg object-cover sm:h-14 sm:w-20"
              />

              {/* =====================
                  WORKOUT INFORMATION
              ====================== */}

              <div className="min-w-0 flex-1">
                <h3
                  className={`${oswald.className} truncate text-sm font-bold uppercase text-white`}
                >
                  {workout.name}
                </h3>

                <p className="truncate text-[9px] text-[#9CA3AF]">
                  {workout.equipment}
                </p>

                {/* Workout stats */}

                <div className="mt-1 flex flex-wrap items-center gap-2 text-[9px] text-[#9CA3AF]">
                  <span className="flex items-center gap-1">
                    <IoTimeOutline size={11} />
                    {workout.duration} min
                  </span>

                  <span className="flex items-center gap-1">
                    <FaFireFlameCurved size={10} />
                    {workout.caloriesBurned} kcal
                  </span>

                  <span className="flex items-center gap-1">
                    <CiStar size={12} />
                    {workout.rating}
                  </span>
                </div>
              </div>

              {/* =====================
                  BUTTONS
              ====================== */}

              <div className="flex shrink-0 items-center gap-1.5">
                {/* View Details */}

                <Link
                  href={`/pages/LibraryPage/${workout.id}`}
                  className="hidden rounded-lg border border-[#222630] px-3 py-1.5 text-[9px] text-white transition hover:border-[#C2F800] sm:block"
                >
                  View Details
                </Link>

                {/* Today's Plan */}

                {activeTab === "today" && (
                  <>
                    <button
                      onClick={() => markAsDone(workout.id)}
                      disabled={done.includes(workout.id)}
                      className="flex items-center gap-1 rounded-lg bg-[#C2F800] px-2.5 py-1.5 text-[9px] font-semibold text-black disabled:opacity-60 sm:px-3"
                    >
                      <Check size={11} />

                      <span className="hidden sm:inline">
                        {done.includes(workout.id) ? "Done" : "Mark as Done"}
                      </span>
                    </button>

                    <button
                      onClick={() => removeFromPlan(workout.id)}
                      className="rounded-lg border border-[#222630] p-1.5 text-[#9CA3AF] transition hover:border-red-500 hover:text-red-400"
                    >
                      <X size={11} />
                    </button>
                  </>
                )}

                {/* Saved */}

                {activeTab === "saved" && (
                  <>
                    <button
                      onClick={() => addToPlan(workout)}
                      disabled={
                        plan.length >= 5 ||
                        plan.some((item) => item.id === workout.id)
                      }
                      className="rounded-lg bg-[#C2F800] px-2.5 py-1.5 text-[9px] font-semibold text-black disabled:opacity-60"
                    >
                      Add to plan
                    </button>

                    <button
                      onClick={() => removeFromSaved(workout.id)}
                      className="rounded-lg border border-[#222630] p-1.5 text-[#9CA3AF] transition hover:border-red-500 hover:text-red-400"
                    >
                      <X size={11} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Plan;
