import Image from "next/image";
import HomePageBanner from "./pages/HomePage/Banner";
import LibraryPage from "./pages/LibraryPage/page";

export default function Home() {
  return (
    <div className="container mx-auto">
        <HomePageBanner />
        <LibraryPage />
    </div>
  );
}
