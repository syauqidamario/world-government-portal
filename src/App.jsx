import { useState } from "react";
import HeroSection from "./components/HeroSection";
import SpatialMap from "./components/SpatialMap";
import DepartmentGrid from "./components/DepartmentGrid";
import AffiliatedNations from "./components/AffiliatedNations";
import BountyPredictor from "./components/BountyPredictor";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

// Komponen pembungkus untuk Halaman Utama Publik
const PublicView = () => (
  <>
    <HeroSection />
    <SpatialMap />
    <DepartmentGrid />
    <AffiliatedNations />
    <BountyPredictor />
  </>
);

function App() {
  // State untuk mengontrol tampilan layar ('home', 'login', atau 'dashboard')
  const [currentView, setCurrentView] = useState("home");

  return (
    <div className="min-h-screen bg-slate-950">
      {/* TopHeader dimodifikasi agar bisa mengontrol navigasi */}
      <div className="sticky top-0 z-50 shadow-xl">
        <nav className="bg-slate-100 border-b-4 border-slate-900 px-6 py-4 flex justify-between items-center">
          <div
            onClick={() => setCurrentView("home")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center relative transition-transform group-hover:scale-110">
              <div className="w-1 h-5 bg-slate-100 absolute"></div>
              <div className="w-5 h-1 bg-slate-100 absolute"></div>
              <div className="w-2 h-2 rounded-full bg-slate-900 absolute border border-slate-100"></div>
            </div>
            <span className="font-serif text-2xl font-black tracking-widest text-slate-900 uppercase">
              World Govt.
            </span>
          </div>

          <div className="flex gap-4">
            {/* Tombol Akses Rahasia */}
            <button
              onClick={() => setCurrentView("login")}
              className="text-slate-500 hover:text-red-700 font-mono text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-2"
            >
              🔒 Admin Access
            </button>
            <button className="bg-red-700 hover:bg-red-800 text-slate-100 px-5 py-2 font-bold uppercase tracking-wider text-sm transition-colors rounded-sm shadow-md hidden md:flex items-center gap-2">
              <span>⚠️</span> Report Pirate
            </button>
          </div>
        </nav>
      </div>

      {/* Logic Conditional Rendering */}
      {currentView === "home" && <PublicView />}

      {currentView === "login" && (
        <Login onLoginSuccess={() => setCurrentView("dashboard")} />
      )}

      {currentView === "dashboard" && (
        <AdminDashboard
          onLogout={() => {
            localStorage.removeItem("wg_token"); // Hapus token saat logout
            setCurrentView("home"); // Kembalikan ke halaman depan
          }}
        />
      )}
    </div>
  );
}

export default App;
