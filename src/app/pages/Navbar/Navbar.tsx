import Image from "next/image";
import Logo from "@/app/assets/logo.png";
import Link from "next/link";
import NavLinks from "./Navlinks";
import PointLinks from "./PointLinks";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar container mx-auto px-3">
        {/* Left Side */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <button
              tabIndex={0}
              type="button"
              aria-label="Open navigation menu"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            <div
              tabIndex={-1}
              className="dropdown-content z-1 mt-3 w-52 rounded-box bg-base-100 p-3 shadow"
            >
              <nav aria-label="Mobile navigation">
                <NavLinks />
              </nav>
            </div>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className={`${oswald.className} flex items-center gap-2 text-xl`}
          >
            <Image
              src={Logo}
              alt="FITLOG logo"
              width={40}
              height={40}
            />
            FITLOG
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <nav aria-label="Main navigation">
            <NavLinks />
          </nav>
        </div>

        {/* Right Side */}
        <div className="navbar-end flex gap-2 sm:gap-8">
          <PointLinks />
        </div>
      </div>
    </header>
  );
};

export default Navbar;