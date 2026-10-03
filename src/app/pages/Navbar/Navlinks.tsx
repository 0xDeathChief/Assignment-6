"use client";

import Link from "next/link";
import { useState } from "react";

const NavLinks = () => {
  const [activeButton, setActiveButton] = useState("Workouts");

  const menuItems = [
    {
      name: "Workouts",
      link: "/",
    },
    {
      name: "My Plan",
      link: "/plan",
    },
  ];

  return (
    <div className="flex gap-10">

      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          onClick={() => setActiveButton(item.name)}
          className={`px-5 py-2 rounded-full font-medium ${
            activeButton === item.name
              ? "text-[#C2F800] bg-[#1A2312]"
              : "text-gray-400"
          }`}
        >
          {item.name}
        </Link>
      ))}

    </div>
  );
};

export default NavLinks;
