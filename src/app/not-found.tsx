import Link from "next/link";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#C2F800]">
        404
      </p>
      <h1 className={`${oswald.className} mt-3 text-4xl font-bold text-white`}>
        Workout not found
      </h1>
      <p className="mt-3 text-sm text-[#9CA3AF]">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-[#C2F800] px-6 py-3 text-sm font-semibold text-black"
      >
        Back to workouts
      </Link>
    </main>
  );
}
