import Image from "next/image";
import Link from "next/link";
import BannerImg from "@/app/assets/banner.png";

const HomePageBanner = () => {
  return (
    <section className="container mx-auto mt-12">
      <div className="flex flex-col-reverse items-center justify-between gap-8 rounded-xl bg-[#15171D] px-8 py-12 md:flex-row md:px-16">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C2F800]">
            Workout Library
          </p>
          <h1 className="mt-6 font-oswald text-5xl font-bold uppercase leading-tight text-white md:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-6 max-w-md text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          
          <Link
            href=""
            className="mt-8 inline-block rounded-md bg-[#C2F800] px-6 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-110"
          >
            Browse Workouts
          </Link>
        </div>

        <Image
          src={BannerImg}
          alt="Muscle anatomy on a preacher curl machine"
          width={334}
          height={334}
          priority
          className="h-auto w-64 md:w-[334px]"
        />
      </div>
    </section>
  );
};

export default HomePageBanner;