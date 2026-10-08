import HomePageBanner from "./pages/HomePage/Banner";
import LibraryPage from "./pages/LibraryPage/page";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomePageBanner />
      <LibraryPage />
    </div>
  );
}
