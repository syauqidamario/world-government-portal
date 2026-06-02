import TopHeader from "./components/TopHeader";
import HeroSection from "./components/HeroSection";
import DepartmentGrid from "./components/DepartmentGrid";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <TopHeader />
      <HeroSection />
      <DepartmentGrid />
    </div>
  );
}

export default App;
