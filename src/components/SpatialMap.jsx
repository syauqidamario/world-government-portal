import { useState } from "react";

const locations = [
  {
    id: "mary-geoise",
    name: "Pangaea Castle (Mary Geoise)",
    coords: "top-[15%] left-[50%]",
    type: "Pusat Pemerintahan",
    description:
      "Terletak di puncak Red Line. Kediaman tertinggi bagi para Gorosei dan Bangsawan Dunia Dunia.",
    securityLevel: "MAXIMUM OVERRIDE",
  },
  {
    id: "marineford",
    name: "New Marineford",
    coords: "top-[45%] left-[65%]",
    type: "Markas Militer Utama",
    description:
      "Pusat kekuatan militer Angkatan Laut yang diposisikan strategis untuk mengawasi New World.",
    securityLevel: "HIGH MILITARY",
  },
  {
    id: "enies-lobby",
    name: "Enies Lobby",
    coords: "top-[45%] left-[35%]",
    type: "Pulau Peradilan",
    description:
      "Gerbang hukum utama yang tidak pernah mengalami malam. Terhubung langsung melalui Tarai Current.",
    securityLevel: "JUDICIAL SECURE",
  },
  {
    id: "impel-down",
    name: "Impel Down",
    coords: "top-[75%] left-[50%]",
    type: "Penjara Bawah Laut",
    description:
      "Struktur menara bawah laut raksasa yang menampung kriminal paling berbahaya di dunia.",
    securityLevel: "FULL ISOLATION",
  },
];

export default function SpatialMap() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  return (
    <section className="bg-slate-950 border-t border-slate-800 py-16 px-6 font-mono">
      <div className="max-w-6xl mx-auto">
        {/* Header Judul */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-xs font-bold tracking-widest text-red-600 uppercase mb-2">
            Global Positioning System
          </h2>
          <p className="text-3xl font-serif font-semibold text-slate-200 tracking-wide">
            Peta Navigasi Spasial Sektor Utama
          </p>
        </div>

        {/* Layout Utama */}
        <div className="flex flex-col lg:flex-row gap-8 bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden shadow-2xl">
          {/* Sisi Kiri: Peta Taktis Interaktif */}
          <div className="flex-1 min-h-[400px] bg-slate-950 rounded-lg border border-slate-800/80 relative overflow-hidden flex items-center justify-center">
            {/* Garis Grid Transparan (Efek Radar/Peta Taktis) */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            ></div>
            {/* Garis Sumbu Simbolis (Grand Line & Red Line) */}
            <div className="absolute inset-y-0 left-1/2 w-[2px] bg-slate-800/50"></div>{" "}
            {/* Red Line */}
            <div className="absolute inset-x-0 top-1/2 h-[2px] bg-slate-800/50"></div>{" "}
            {/* Grand Line */}
            {/* Render Titik Lokasi secara Spasial */}
            {locations.map((loc) => {
              const isActive = activeLocation.id === loc.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 group ${loc.coords}`}
                >
                  {/* Efek Ping Gelombang Pulsa */}
                  <span
                    className={`absolute inset-0 rounded-full animate-ping opacity-25 ${isActive ? "bg-red-500" : "bg-slate-500"}`}
                  ></span>

                  {/* Titik Inti Intuitif */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "bg-red-600 border-slate-100 scale-125 shadow-lg shadow-red-500/50"
                        : "bg-slate-900 border-slate-500 group-hover:border-slate-300"
                    }`}
                  ></div>

                  {/* Label Nama Lokasi Mengambang */}
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-950/90 border border-slate-800 text-[10px] text-slate-400 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {loc.name}
                  </span>
                </button>
              );
            })}
            {/* Kompas Taktis di Sudut */}
            <div className="absolute bottom-4 right-4 text-xs text-slate-600 font-bold select-none">
              SECTOR: GRAND LINE
            </div>
          </div>

          {/* Sisi Kanan: Panel Informasi Detail Dinamis */}
          <div className="w-full lg:w-[350px] bg-slate-950 border border-slate-800 rounded-lg p-6 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex justify-between items-start mb-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] text-red-500 font-bold tracking-widest uppercase block mb-1">
                    {activeLocation.securityLevel}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-100 leading-tight">
                    {activeLocation.name}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                    Klasifikasi
                  </span>
                  <p className="text-sm text-slate-300">
                    {activeLocation.type}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                    Deskripsi Wilayah
                  </span>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {activeLocation.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Kontekstual */}
            <div className="mt-8">
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all">
                Buka Enskripsi Data Sektor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
