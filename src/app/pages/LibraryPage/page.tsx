import WorkoutList from "./WorkoutList";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });

const LibraryPage = () => {
  return (
    <section
      id="library"
      className="container mx-auto mt-10 scroll-mt-24 px-4 sm:px-6 lg:px-8 xl:px-10"
    >
      <div className="flex flex-col gap-2 sm:gap-4 mb-8">
        <h2 className={`${oswald.className} text-2xl sm:text-3xl`}>
          THE LIBRARY
        </h2>

        <p className="text-[#9CA3AF] text-sm sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <WorkoutList fontClass={oswald.className} />
    </section>
  );
};

export default LibraryPage;
