import Navbar from "@/components/shared/Navbar";
import HeroSection from "../components/HeroSection";
import GameGrid from "../components/GameGrid";
import Footer from "@/components/shared/Footer";

const HomePage = () => {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <GameGrid />
      <Footer />
    </div>
  );
};

export default HomePage;
