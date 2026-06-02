import TopHeader from "./components/TopHeader";
import HeroSection from "./components/HeroSection";
import DepartmentGrid from "./components/DepartmentGrid";
import BountyPredictor from "./components/BountyPredictor";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <TopHeader />
      <HeroSection />
      <DepartmentGrid />
      <BountyPredictor />
    </div>
  );
}

export default App;
