import React from "react";
import Image from "next/image";
import { Oswald } from "next/font/google";
import { Bookmark } from "lucide-react";
import { FaCalendarCheck } from "react-icons/fa";
import { Item } from "@/app/Types/type";
import Link from "next/link";
import WorksButton from "../WorksButton";

const oswald = Oswald({
  subsets: ["latin"],
});

const getData = async (libraryId: string): Promise<Item> => {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${libraryId}`,
  );
  const data = await response.json();
  return data;
};

const PageDetails = async ({
  params,
}: {
  params: Promise<{ libraryId: string }>;
}) => {
  const { libraryId } = await params;
  const item = await getData(libraryId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative w-full overflow-hidden rounded-2xl border border-[#222630]">
          <Image
            src={item.image}
            alt={item.name}
            width={800}
            height={500}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1
            className={`${oswald.className} text-4xl font-bold uppercase text-white`}
          >
            {item.name}
          </h1>

          <p className="mt-3 text-[#9CA3AF]">{item.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {item.muscleGroups.map((muscle) => (
              <div
                key={muscle}
                className="badge rounded-xl bg-[#C2F800] px-2 py-2 font-semibold text-black"
              >
                {muscle}
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#222630] bg-[#12151B]">
            <div className="flex justify-between border-b border-[#222630] px-5 py-4">
              <span className="text-sm text-[#9CA3AF]">Equipment</span>

              <span className="text-white">{item.equipment}</span>
            </div>

            <div className="flex justify-between border-b border-[#222630] px-5 py-4">
              <span className="text-sm text-[#9CA3AF]">Difficulty</span>

              <span className="text-white">{item.difficulty}</span>
            </div>

            <div className="flex justify-between border-b border-[#222630] px-5 py-4">
              <span className="text-sm text-[#9CA3AF]">Sets</span>

              <span className="text-white">{item.sets}</span>
            </div>

            <div className="flex justify-between border-b border-[#222630] px-5 py-4">
              <span className="text-sm text-[#9CA3AF]">Reps</span>

              <span className="text-white">{item.reps}</span>
            </div>

            <div className="flex justify-between border-b border-[#222630] px-5 py-4">
              <span className="text-sm text-[#9CA3AF]">Duration</span>

              <span className="text-white">{item.duration} min</span>
            </div>

            <div className="flex justify-between border-b border-[#222630] px-5 py-4">
              <span className="text-sm text-[#9CA3AF]">Calories</span>

              <span className="text-white">{item.caloriesBurned} kcal</span>
            </div>

            <div className="flex justify-between px-5 py-4">
              <span className="text-sm text-[#9CA3AF]">Rating</span>

              <span className="text-white">{item.rating}</span>
            </div>
          </div>

          <h2 className="mt-8 text-sm font-bold uppercase text-white">
            Instructions
          </h2>

          <div className="mt-4 space-y-3">
            {item.instructions.map((instruction: string, index: number) => (
              <div key={index} className="flex gap-3 text-sm text-[#9CA3AF]">
                <span className="font-bold text-[#C2F800]">{index + 1}.</span>

                <span>{instruction}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <WorksButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetails;
