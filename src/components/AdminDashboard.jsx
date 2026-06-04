import { useState, useEffect } from "react";

export default function AdminDashboard({ onLogout }) {
  const token = localStorage.getItem("wg_token");
  const [classifiedData, setClassifiedData] = useState(null);
  const [error, setError] = useState(() =>
    token ? "" : "Akses Ilegal: Token tidak ditemukan.",
  );

  useEffect(() => {
    if (!token) return;

    // Menembak endpoint rahasia di Python
    fetch(`http://127.0.0.1:8000/api/admin/classified-data?token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error("Token tidak valid atau kadaluarsa.");
        return res.json();
      })
      .then((data) => setClassifiedData(data))
      .catch((err) => setError(err.message));
  }, [token]);

  return (
    <section className="min-h-screen bg-slate-950 p-8 font-mono text-slate-100">
      <div className="max-w-5xl mx-auto">
        {/* Header Dashboard */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-red-600 uppercase tracking-widest">
              Cipher Pol Aegis Zero
            </h1>
            <p className="text-slate-500 text-sm tracking-wider">
              Pusat Komando & Manipulasi Data Global
            </p>
          </div>
          <button
            onClick={onLogout}
            className="border border-red-900 text-red-500 hover:bg-red-900/30 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Cabut Akses (Logout)
          </button>
        </div>

        {/* Konten Rahasia */}
        {error ? (
          <div className="bg-red-900/20 border border-red-900 text-red-500 p-6 rounded text-center animate-pulse">
            [PELANGGARAN KEAMANAN] {error}
          </div>
        ) : !classifiedData ? (
          <div className="text-slate-500 text-center py-12">
            Mendekripsi arsip pemerintah...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Panel Data Rahasia dari API Python */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-900 text-white text-[10px] px-3 py-1 font-bold tracking-widest rounded-bl">
                TOP SECRET
              </div>
              <h2 className="text-lg font-bold mb-4 border-b border-slate-800 pb-2">
                Status Target Eliminasi
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Operasi:</span>
                  <span className="font-bold text-red-500">
                    {classifiedData.target}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Terkini:</span>
                  <span className="font-bold uppercase tracking-wider text-slate-300">
                    {classifiedData.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Placeholder untuk Fitur Edit Database */}
            <div className="border border-dashed border-slate-700 p-6 rounded-lg flex items-center justify-center text-slate-600 text-sm text-center">
              [Modul Manipulasi Database Reverie akan di-load di sini] <br />
              (Tambah/Hapus/Edit Status Kerajaan)
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
