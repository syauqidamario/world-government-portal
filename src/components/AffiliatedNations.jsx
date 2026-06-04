import { useState, useEffect } from "react";

export default function AffiliatedNations() {
  const [nationsData, setNationsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Menarik data langsung dari database SQLite melalui FastAPI
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/nations")
      .then((res) => res.json())
      .then((data) => {
        setNationsData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal menarik data:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredNations = nationsData.filter((nation) => {
    const matchesSearch =
      nation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nation.ruler.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || nation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <section className="bg-slate-900 border-t border-slate-800 py-16 px-6 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xs font-bold tracking-widest text-red-600 uppercase mb-2">
            Reverie Council
          </h2>
          <p className="text-3xl font-serif font-semibold text-slate-200 tracking-wide">
            Affiliated Nations Registry
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-slate-950 p-4 rounded-lg border border-slate-800 shadow-xl">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari kerajaan atau nama penguasa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 py-2 pl-10 pr-4 rounded focus:border-red-600 outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-48 bg-slate-900 border border-slate-700 text-slate-100 p-2 rounded focus:border-red-600 outline-none cursor-pointer"
          >
            <option value="All">Semua Status</option>
            <option value="Active">Active</option>
            <option value="Under Review">Under Review</option>
            <option value="Revoked">Revoked</option>
            <option value="Erased">Erased</option>
          </select>
        </div>

        {/* Indikator Loading */}
        {isLoading ? (
          <div className="text-center py-12 text-slate-500 animate-pulse">
            Menghubungkan ke Server Pusat...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNations.length > 0 ? (
              filteredNations.map((nation) => (
                <div
                  key={nation.id}
                  className={`p-5 rounded-lg border bg-slate-950 relative overflow-hidden transition-all ${
                    nation.status === "Erased"
                      ? "border-red-900/50 opacity-60 grayscale"
                      : nation.status === "Revoked"
                        ? "border-orange-900/50"
                        : "border-slate-800"
                  }`}
                >
                  <span
                    className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded ${
                      nation.status === "Active"
                        ? "bg-green-900/30 text-green-500"
                        : nation.status === "Under Review"
                          ? "bg-yellow-900/30 text-yellow-500"
                          : nation.status === "Revoked"
                            ? "bg-orange-900/30 text-orange-500"
                            : "bg-red-900/50 text-red-500 animate-pulse"
                    }`}
                  >
                    {nation.status}
                  </span>
                  <h3
                    className={`font-serif text-xl font-bold mb-1 ${nation.status === "Erased" ? "line-through text-slate-500" : "text-slate-200"}`}
                  >
                    {nation.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 tracking-wider uppercase">
                    {nation.region}
                  </p>
                  <div className="space-y-2 mt-4 pt-4 border-t border-slate-800/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Ruler:</span>
                      <span className="text-slate-300 font-bold">
                        {nation.ruler}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Heavenly Tribute:</span>
                      <span
                        className={`font-bold ${nation.tribute === "Paid" ? "text-slate-300" : "text-red-500"}`}
                      >
                        {nation.tribute}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500">
                [SYSTEM ERROR] Data tidak ditemukan.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
