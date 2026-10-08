import Image from "next/image";
import Logo from "@/app/assets/logo.png";
import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-4 mt-[64px]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 pt-6 pb-6 sm:flex-row">
        
        <aside className="flex items-center gap-4">
          <Image src={Logo} alt="FitLog logo" width={50} height={50} />
          <h1 className={`${oswald.className} text-xl`}>FITLOG</h1>
        </aside>


        <aside className="flex items-center gap-6 text-sm">
          <p>
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;