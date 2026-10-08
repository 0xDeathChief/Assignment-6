"use client";

import Image from "next/image";
import Link from "next/link";
import { IoTimeOutline } from "react-icons/io5";
import { FaFireFlameCurved } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { useGymContext } from "@/context/GymContext";

const WorkoutList = ({ fontClass }: { fontClass: string }) => {
  const { data, loading, error } = useGymContext();

  if (loading) {
    return (
      <div
        role="status"
        className="flex items-center gap-3 py-8 text-sm text-[#9CA3AF]"
      >
        <span className="loading loading-spinner loading-md text-[#C2F800]" />
        Loading workouts…
      </div>
    );
  }

  if (error) {
    return <p className="text-[#9CA3AF]">{error}</p>;
  }

  if (data.length === 0) {
    return <p className="text-[#9CA3AF]">No workouts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {data.map((item) => (
        <Link
          key={item.id}
          href={`/pages/LibraryPage/${item.id}`}
          className="card w-full overflow-hidden border border-[#222630] bg-[#15171D] shadow-sm"
        >
          <figure className="w-full">
            <Image
              src={item.image}
              alt={item.name}
              width={600}
              height={400}
              className="h-auto w-full object-cover"
            />
          </figure>

          <div className="card-body p-4 sm:p-5">
            <div className="flex flex-wrap gap-2">
              {item.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="badge rounded-xl bg-[#C2F800] px-2.5 py-2 text-xs font-semibold text-black sm:text-sm"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h2
              className={`${fontClass} card-title mt-1 text-xl transition-colors hover:text-[#C2F800] sm:text-2xl`}
            >
              {item.name}
            </h2>

            <p className="font-inter text-sm text-[#9CA3AF]">
              {item.equipment}
            </p>
          </div>

          <hr className="w-full border-[#20242E]" />

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <IoTimeOutline className="h-5 w-5 shrink-0" />
              <span>{item.duration} min</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <FaFireFlameCurved className="h-5 w-5 shrink-0" />
              <span>{item.caloriesBurned} kcal</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
              <CiStar className="h-5 w-5 shrink-0" />
              <span>{item.rating}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default WorkoutList;
