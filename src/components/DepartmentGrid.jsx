import { useState } from "react";

const departments = [
  {
    id: "marines",
    title: "Marine Headquarters",
    motto: "Absolute Justice",
    publicDesc:
      "The primary military force of the World Government, maintaining peace and maritime security across the four seas.",
    classifiedDesc:
      "Deploying Buster Calls to erase non-compliant islands. Actively suppressing knowledge of the Void Century.",
    emblem: "⚓",
  },
  {
    id: "cipher-pol",
    title: "Cipher Pol (CP0-CP9)",
    motto: "Intelligence & Order",
    publicDesc:
      "An elite agency conducting economic analysis, diplomatic security, and international investigations.",
    classifiedDesc:
      "Covert assassination squads operating outside international law. Directly reporting to the Celestial Dragons.",
    emblem: "👁️",
  },
  {
    id: "enies-lobby",
    title: "Enies Lobby",
    motto: "The Scale of Law",
    publicDesc:
      "The high court of justice where the world's most dangerous criminals face righteous legal judgment.",
    classifiedDesc:
      "A sham tribunal with a 100% conviction rate. Serves purely as a psychological processing gate for Impel Down.",
    emblem: "⚖️",
  },
  {
    id: "impel-down",
    title: "Impel Down",
    motto: "Absolute Containment",
    publicDesc:
      "A maximum-security underwater penitentiary built to safely house the world's most volatile threats.",
    classifiedDesc:
      "A six-level subterranean torture matrix. Secret Level 5.5 rumored to contain active revolutionary defectors.",
    emblem: "⛓️",
  },
];

export default function DepartmentGrid() {
  const [revealedDepts, setRevealedDepts] = useState({});

  const toggleReveal = (id) => {
    setRevealedDepts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="bg-slate-950 text-slate-100 py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold tracking-widest text-red-600 uppercase mb-2">
            Global Jurisdictions
          </h2>
          <p className="text-3xl font-serif font-semibold text-slate-200 tracking-wide">
            Branches of Global Stability
          </p>
          <div className="h-1 w-12 bg-red-600 mx-auto mt-4 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => {
            const isClassified = revealedDepts[dept.id];

            return (
              <div
                key={dept.id}
                onClick={() => toggleReveal(dept.id)}
                className={`cursor-pointer relative overflow-hidden bg-slate-900 border rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between ${
                  isClassified
                    ? "border-red-600 bg-linear-to-b from-slate-900 to-red-950/20 shadow-red-900/10"
                    : "border-slate-800 hover:border-slate-600"
                }`}
              >
                <div>
                  <div className="absolute right-4 top-4 text-4xl opacity-10 select-none">
                    {dept.emblem}
                  </div>
                  <div className="text-2xl mb-4 text-slate-400">
                    {dept.emblem}
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-1 tracking-wide text-slate-100">
                    {dept.title}
                  </h3>
                  <span
                    className={`text-xs font-mono font-medium uppercase tracking-wider block mb-4 ${
                      isClassified ? "text-red-500" : "text-slate-400"
                    }`}
                  >
                    {isClassified
                      ? "CLASSIFIED BREACH"
                      : `Motto: ${dept.motto}`}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-400 min-h-20">
                    {isClassified ? dept.classifiedDesc : dept.publicDesc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/60 text-xs font-mono text-center text-slate-500">
                  {isClassified
                    ? "Click to re-encrypt records"
                    : "Click to inspect authorization"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
