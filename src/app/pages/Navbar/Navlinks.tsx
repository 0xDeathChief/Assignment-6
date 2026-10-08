"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Workout",
      link: "/",
    },
    {
      name: "My Plan",
      link: "/my-plan",
    },
  ];

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-10">
      {menuItems.map((item) => {
        const isActive =
          item.link === "/"
            ? pathname === "/" || pathname.startsWith("/pages/LibraryPage")
            : pathname.startsWith(item.link);

        return (
          <Link
            key={item.name}
            href={item.link}
            className={`px-5 py-2 rounded-full font-medium ${
              isActive
                ? "text-[#C2F800] bg-[#1A2312]"
                : "text-gray-400"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
