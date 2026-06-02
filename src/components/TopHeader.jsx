// The most current high-threat targets
const activeTargets = [
  { name: '"Red-Haired" Shanks', bounty: "4,048,900,000", status: "WANTED" },
  { name: '"Blackbeard" Teach', bounty: "3,996,000,000", status: "WANTED" },
  { name: '"Hawk Eyes" Mihawk', bounty: "3,590,000,000", status: "WANTED" },
  {
    name: "Buggy the Genius Jester",
    bounty: "3,189,000,000",
    status: "WANTED",
  },
  { name: '"Straw Hat" Luffy', bounty: "3,000,000,000", status: "WANTED" },
  { name: "Trafalgar D. Water Law", bounty: "3,000,000,000", status: "WANTED" },
  { name: 'Eustass "Captain" Kid', bounty: "3,000,000,000", status: "WANTED" },
  { name: "King the Wildfire", bounty: "1,390,000,000", status: "CAPTURED" },
];

export default function TopHeader() {
  return (
    <div className="sticky top-0 z-50 shadow-xl">
      {/* 1. Main Navigation Bar */}
      <nav className="bg-slate-100 border-b-4 border-slate-900 px-6 py-4 flex justify-between items-center">
        {/* World Government Brand */}
        <div className="flex items-center space-x-3 cursor-pointer">
          {/* Simple CSS representation of the WG Cross logo */}
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center relative">
            <div className="w-1 h-5 bg-slate-100 absolute"></div>
            <div className="w-5 h-1 bg-slate-100 absolute"></div>
            <div className="w-2 h-2 rounded-full bg-slate-900 absolute border border-slate-100"></div>
          </div>
          <span className="font-serif text-2xl font-black tracking-widest text-slate-900 uppercase">
            World Govt.
          </span>
        </div>

        {/* Navigation Links (Hidden on mobile for now) */}
        <div className="hidden md:flex space-x-8 font-mono text-sm font-bold text-slate-700 uppercase tracking-wide">
          <a href="#" className="hover:text-red-700 transition-colors">
            Global Security
          </a>
          <a href="#" className="hover:text-red-700 transition-colors">
            Affiliated Nations
          </a>
          <a href="#" className="hover:text-red-700 transition-colors">
            Judicial System
          </a>
        </div>

        {/* Call to Action */}
        <button className="bg-red-700 hover:bg-red-800 text-slate-100 px-5 py-2 font-bold uppercase tracking-wider text-sm transition-colors rounded-sm shadow-md flex items-center gap-2">
          <span>⚠️</span> Report Pirate Activity
        </button>
      </nav>

      {/* 2. Live Bounty Ticker */}
      <div className="bg-slate-950 text-slate-100 border-b-2 border-red-800 py-1.5 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex whitespace-nowrap">
          {/* We map the array twice to create a seamless infinite scrolling loop */}
          {[...activeTargets, ...activeTargets].map((target, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 mx-8 font-mono text-sm"
            >
              <span
                className={`font-black tracking-widest ${target.status === "CAPTURED" ? "text-blue-500" : "text-red-600"}`}
              >
                [{target.status}]
              </span>
              <span className="font-bold text-slate-300">{target.name}</span>
              <span className="text-yellow-500 tracking-widest">
                — ฿{target.bounty}
              </span>
              <span className="text-slate-700 ml-4">|</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
