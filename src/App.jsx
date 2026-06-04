import TopHeader from "./components/TopHeader";
import HeroSection from "./components/HeroSection";
import SpatialMap from "./components/SpatialMap";
import DepartmentGrid from "./components/DepartmentGrid";
import AffiliatedNations from "./components/AffiliatedNations"; // Import baru
import BountyPredictor from "./components/BountyPredictor";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <TopHeader />
      <HeroSection />
      <SpatialMap />
      <DepartmentGrid />
      <AffiliatedNations /> {/* Munculkan di sini */}
      <BountyPredictor />
    </div>
  );
}

export default App;
