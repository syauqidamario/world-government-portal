import { useState, useEffect } from "react";

export default function BountyPredictor() {
  const [formData, setFormData] = useState({
    haki: 1,
    fruitClass: 1,
    crewSize: 10,
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [bounty, setBounty] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  };

  // Simulate a model's forward pass and epoch processing
  useEffect(() => {
    if (!isCalculating) return undefined;

    const calculateFinalBounty = () => {
      // A simplified weighted calculation for the threat level
      const baseThreat = 50000000;
      const hakiMultiplier = formData.haki * 1.5;
      const fruitMultiplier = formData.fruitClass * 2.2;
      const crewFactor = formData.crewSize * 100000;

      const total = Math.floor(
        baseThreat * hakiMultiplier * fruitMultiplier + crewFactor,
      );
      setBounty(total.toLocaleString());
    };

    const interval = setInterval(() => {
      setEpoch((prev) => {
        const next = prev + 10;
        if (next >= 200) {
          clearInterval(interval);
          setIsCalculating(false);
          calculateFinalBounty();
          return 200;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [formData.haki, formData.fruitClass, formData.crewSize, isCalculating]);

  const startPrediction = (e) => {
    e.preventDefault();
    setBounty(null);
    setEpoch(0);
    setIsCalculating(true);
  };

  return (
    <section className="bg-slate-900 border-t border-slate-800 py-16 px-6 font-mono">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Left Side: The Input Parameters */}
        <div className="flex-1 p-8 border-r border-slate-800">
          <h2 className="text-xl font-bold text-red-600 mb-6 uppercase tracking-widest">
            Cipher Pol Threat Analyzer
          </h2>
          <form onSubmit={startPrediction} className="space-y-6">
            <div>
              <label className="block text-slate-400 text-xs uppercase mb-2">
                Haki Mastery Level (1-10)
              </label>
              <input
                type="range"
                name="haki"
                min="1"
                max="10"
                value={formData.haki}
                onChange={handleChange}
                className="w-full accent-red-600"
              />
              <div className="text-right text-slate-100 text-sm">
                {formData.haki}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 text-xs uppercase mb-2">
                Devil Fruit Classification
              </label>
              <select
                name="fruitClass"
                value={formData.fruitClass}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 text-slate-100 p-2 rounded focus:border-red-600 outline-none"
              >
                <option value="1">None / Unconfirmed</option>
                <option value="2">Paramecia (Standard)</option>
                <option value="3">Zoan (Standard)</option>
                <option value="5">Logia (Intangible)</option>
                <option value="8">Mythical Zoan</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-xs uppercase mb-2">
                Crew Size / Fleet
              </label>
              <input
                type="number"
                name="crewSize"
                min="1"
                max="5000"
                value={formData.crewSize}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 text-slate-100 p-2 rounded focus:border-red-600 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isCalculating}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 py-3 uppercase tracking-widest text-sm font-bold transition-colors disabled:opacity-50"
            >
              {isCalculating ? "Processing..." : "Calculate Threat Level"}
            </button>
          </form>
        </div>

        {/* Right Side: The Output / Display */}
        <div className="flex-1 p-8 flex flex-col justify-center items-center bg-slate-900 relative overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#475569 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="relative z-10 w-full text-center">
            {isCalculating ? (
              <div className="space-y-4">
                <div className="text-slate-400 text-sm animate-pulse">
                  Running assessment matrix...
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-red-600 h-full transition-all duration-100"
                    style={{ width: `${(epoch / 200) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-slate-500">
                  Epoch {epoch} / 200
                </div>
              </div>
            ) : bounty ? (
              <div className="animate-fade-in">
                <h3 className="text-slate-400 uppercase tracking-widest text-sm mb-4">
                  Issued Bounty
                </h3>
                <div className="text-4xl md:text-5xl font-black text-slate-100 mb-2">
                  ฿{bounty}
                </div>
                <div className="text-red-500 text-xs tracking-widest border border-red-900/50 inline-block px-3 py-1 rounded bg-red-950/20">
                  DEAD OR ALIVE
                </div>
              </div>
            ) : (
              <div className="text-slate-500 text-sm uppercase tracking-widest">
                Awaiting Target Data...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
