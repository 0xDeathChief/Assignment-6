import React from "react";
import Image from "next/image";
import { Oswald } from "next/font/google";
import { Item } from "@/app/Types/type";
import { IoTimeOutline } from "react-icons/io5";
import { FaFireFlameCurved } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import Link from "next/link";

const oswald = Oswald({ subsets: ["latin"] });

const getData = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await res.json();
  return data;
};

const LibraryPage = async () => {
  const data = await getData();

  return (
    <div className="container mx-auto mt-20">
      <div className="flex flex-col gap-4">
        <h2 className={`${oswald.className} text-2xl`}>THE LIBRARY</h2>
        <p className="text-[#9CA3AF] mb-5">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-3 grid-rows-4 gap-y-6 gap-x-4">
        {data.map((item: Item) => (
          <div
            key={item.id}
            className="card bg-[#15171D] shadow-sm border-[#222630]"
          >
            <figure>
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={200}
                className="w-full"
              />
            </figure>

            <div className="card-body">
              <div className="card-actions justify-start">
                <div className="flex flex-wrap gap-2">
                  {item.muscleGroups.map((muscle) => (
                    <div
                      key={muscle}
                      className="badge bg-[#C2F800] px-2 py-2 font-semibold text-black rounded-xl"
                    >
                      {muscle}
                    </div>
                  ))}
                </div>
              </div>
              <Link href={`/pages/LibraryPage/${item.id}`}>
                <h2 className={`${oswald.className} text-2xl card-title`}>
                  {item.name}
                </h2>
              </Link>

              <p className="font-inter text-[#9CA3AF] text-sm">
                {item.equipment}
              </p>
            </div>
            <hr className="w-[450px] mx-auto border-[#20242E]" />

            <div className="card-actions justify-start px-4 py-6 gap-4 ">
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <IoTimeOutline className="h-5 w-5 text-[#9CA3AF]" />
                {item.duration} min
              </div>
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <FaFireFlameCurved className="h-5 w-5 text-[#9CA3AF]" />
                {item.caloriesBurned}
              </div>
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <CiStar className="h-5 w-5 text-[#9CA3AF]" />
                {item.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
