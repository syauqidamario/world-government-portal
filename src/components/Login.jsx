import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // Menembak API Python FastAPI yang sedang menyala di port 8000
      const response = await fetch("http://127.0.0.1:8000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Login berhasil! Simpan token di dalam browser
        localStorage.setItem("wg_token", data.access_token);
        setStatus({
          type: "success",
          message: "OTORISASI DITERIMA. Selamat datang, Agen Cipher Pol.",
        });

        // Transisi ke dashboard setelah 1.5 detik
        setTimeout(() => {
          onLoginSuccess();
        }, 1500);
      } else {
        // Kredensial salah
        setStatus({
          type: "error",
          message: data.detail || "KREDENSIAL DITOLAK.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "KONEKSI TERPUTUS. Gagal menghubungi server pusat.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-mono border-t-4 border-red-900">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden relative">
        {/* Dekorasi Garis Merah */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900"></div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-red-600 tracking-widest uppercase mb-1">
              Terminal Keamanan
            </h2>
            <p className="text-xs text-slate-500 tracking-wider">
              Tingkat Akses: Kategori 5 Diperlukan
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">
                Identitas Operatif
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-3 rounded focus:border-red-600 outline-none transition-colors"
                placeholder="Masukkan ID..."
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs uppercase tracking-wider mb-2">
                Kata Sandi Enkripsi
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-3 rounded focus:border-red-600 outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Pesan Status Alert */}
            {status.message && (
              <div
                className={`p-3 text-xs font-bold tracking-wider rounded border text-center uppercase ${
                  status.type === "success"
                    ? "bg-green-900/20 text-green-500 border-green-900/50"
                    : "bg-red-900/20 text-red-500 border-red-900/50 animate-pulse"
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-800 hover:bg-red-700 text-slate-100 py-3 uppercase tracking-widest text-sm font-bold transition-colors rounded disabled:opacity-50"
            >
              {isLoading ? "Verifikasi..." : "Inisiasi Akses"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
