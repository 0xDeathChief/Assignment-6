import Link from "next/link";
import { Oswald } from "next/font/google";
import { RiArrowDropDownLine } from "react-icons/ri";

const oswald = Oswald({ subsets: ["latin"] });

const Plan = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h2
          className={`${oswald.className} text-3xl font-bold uppercase text-white`}
        >
          My Plan
        </h2>
        <p className="text-sm text-[#9CA3AF]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 divide-y divide-[#222630] rounded-2xl border border-[#222630] bg-[#12151B] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="px-6 py-5">
          <p className="text-xs text-[#9CA3AF]">Exercises</p>
          <p
            className={`${oswald.className} mt-1 text-4xl font-bold text-[#C2F800]`}
          >
            0
          </p>
        </div>
        <div className="px-6 py-5">
          <p className="text-xs text-[#9CA3AF]">Minutes</p>
          <p
            className={`${oswald.className} mt-1 text-4xl font-bold text-white`}
          >
            0
          </p>
        </div>
        <div className="px-6 py-5">
          <p className="text-xs text-[#9CA3AF]">Calories</p>
          <p
            className={`${oswald.className} mt-1 text-4xl font-bold text-white`}
          >
            0
          </p>
        </div>
      </div>

      
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 rounded-xl border border-[#222630] bg-[#12151B] p-1">
          <span className="rounded-lg px-5 py-1.5 text-xs text-[#9CA3AF]">
            Todays Plan
          </span>
          <span className="rounded-lg bg-[#1E222B] px-5 py-1.5 text-xs font-semibold text-white">
            Saved
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#9CA3AF]">
          Sort By
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Duration <RiArrowDropDownLine />
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a>Rating</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    
      <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#222630] px-4 py-24 text-center bg-[#111317]">
        <h3
          className={`${oswald.className} text-xl font-bold uppercase text-white`}
        >
          Nothing here yet
        </h3>
        <p className="mt-2 text-xs text-[#9CA3AF]">
          Browse the library and add a lift to get today moving.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-[#C2F800] px-6 py-2.5 text-xs font-semibold text-black shadow-[0_8px_24px_rgba(194,248,0,0.25)] transition hover:brightness-110"
        >
          Go to workouts
        </Link>
      </div>
    </div>
  );
};

export default Plan;
