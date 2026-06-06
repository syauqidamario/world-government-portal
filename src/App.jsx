import { useState } from "react";
import CommanderAdmin from "./CommanderAdmin";

export default function App() {
  // State navigasi: 'public', 'login', atau 'admin'
  const [view, setView] = useState("public");

  // State untuk form login
  const [passcode, setPasscode] = useState("");
  const [loginError, setLoginError] = useState("");

  // State form publik dengan pemisahan amount dan desc (HANYA DITULIS SEKALI)
  const [formData, setFormData] = useState({
    name: "",
    faction: "",
    targetYonko: "Shanks",
    purpose: "Aliansi Militer",
    tribute_amount: 0,
    tribute_desc: "",
  });

  const [ticket, setTicket] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);

  // State untuk Deep Learning Forecaster
  const [predictionScore, setPredictionScore] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // --- FUNGSI MENGAMBIL PREDIKSI KERAS (DEEP LEARNING) ---
  const handlePredict = async () => {
    setIsPredicting(true);
    try {
      const response = await fetch("http://127.0.0.1:8001/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_yonko: formData.targetYonko,
          purpose: formData.purpose,
          tribute_amount: Number(formData.tribute_amount),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPredictionScore(data.probability);
      } else {
        const errorData = await response.json();
        alert(`AI Ditolak Server: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      alert(
        "KONEKSI GAGAL: Server Neural Network Yonko tidak merespons. Pastikan uvicorn berjalan.",
      );
    } finally {
      setIsPredicting(false);
    }
  };

  // --- FUNGSI LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "haoshoku") {
      setView("admin");
      setPasscode("");
      setLoginError("");
    } else {
      setLoginError("AKSES DITOLAK: Level Haki tidak mencukupi.");
    }
  };

  // --- FUNGSI SUBMIT TIKET PUBLIK ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPrinting(true);
    try {
      const response = await fetch("http://127.0.0.1:8001/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          faction: formData.faction,
          target_yonko: formData.targetYonko,
          purpose: formData.purpose,
          tribute_amount: Number(formData.tribute_amount),
          tribute_desc: formData.tribute_desc,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const dbTicket = result.data;
        setTicket({
          name: dbTicket.name,
          faction: dbTicket.faction,
          targetYonko: dbTicket.target_yonko,
          purpose: dbTicket.purpose,
          tributeAmount: dbTicket.tribute_amount,
          tributeDesc: dbTicket.tribute_desc,
          ticketNo: dbTicket.ticket_no,
          dateIssued: dbTicket.date_issued,
          status: dbTicket.status,
        });
      } else {
        alert("GAGAL: Otoritas Dunia Bawah menolak dokumen ini.");
      }
    } catch (error) {
      alert(
        "KONEKSI TERPUTUS: Server Yonko (Port 8001) tidak dapat dihubungi.",
      );
    } finally {
      setIsPrinting(false);
    }
  };

  // --- RENDER HALAMAN ADMIN ---
  if (view === "admin") {
    return <CommanderAdmin onClose={() => setView("public")} />;
  }

  // --- RENDER HALAMAN LOGIN GATEWAY ---
  if (view === "login") {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center font-mono text-zinc-100 p-6 relative selection:bg-red-500 selection:text-zinc-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-red-900/20 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-zinc-950 border border-red-900/50 p-8 rounded-2xl shadow-[0_0_50px_rgba(127,29,29,0.15)] relative z-10">
          <div className="text-center mb-8">
            <span className="text-4xl block mb-2">🛡️</span>
            <h2 className="text-xl font-black text-red-600 uppercase tracking-[0.2em]">
              Otorisasi Komandan
            </h2>
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-2">
              Area Terlarang - Verifikasi Sandi Dibutuhkan
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="password"
                autoFocus
                placeholder="***"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-xl text-center text-red-500 font-black tracking-[0.5em] outline-none focus:border-red-600 transition-colors shadow-inner"
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-[10px] text-center font-bold uppercase tracking-widest animate-pulse border border-red-900/50 bg-red-950/30 py-2 rounded">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-red-950/50 hover:bg-red-900 border border-red-900 text-red-500 hover:text-zinc-100 py-3 uppercase tracking-widest font-bold transition-all rounded-xl text-xs shadow-lg shadow-red-900/20 cursor-pointer"
            >
              Verifikasi Akses
            </button>
          </form>

          <button
            onClick={() => {
              setView("public");
              setLoginError("");
              setPasscode("");
            }}
            className="w-full mt-6 text-[10px] text-zinc-500 hover:text-zinc-300 uppercase tracking-widest transition-colors cursor-pointer"
          >
            &lt; Batalkan dan Kembali
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER HALAMAN PUBLIK (DEFAULT) ---
  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-red-950/20 via-amber-950/5 to-transparent blur-3xl pointer-events-none" />

      {/* NAVBAR */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">☠️</span>
            <div>
              <h1 className="text-base font-black tracking-widest text-amber-500 uppercase">
                New World Audience Bureau
              </h1>
              <p className="text-[10px] text-zinc-500 tracking-wider">
                Sistem Registrasi Protokol Teokrasi & Maritim
              </p>
            </div>
          </div>

          <button
            onClick={() => setView("login")}
            className="text-[11px] border border-red-900 bg-red-950/30 hover:bg-red-900/50 px-4 py-2 rounded text-red-500 font-bold tracking-widest uppercase transition-colors cursor-pointer shadow-[0_0_15px_rgba(127,29,29,0.2)]"
          >
            🛡️ Commander Access
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-red-500 uppercase tracking-[0.3em] mb-3">
            Audiensi Paus Tirani Samudra
          </h2>
          <p className="text-3xl font-serif text-zinc-200 tracking-wide leading-relaxed">
            Ajukan Permohonan Pertemuan dengan{" "}
            <span className="text-amber-500 font-semibold">Empat Penguasa</span>
          </p>
          <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
            Gunakan dokumen digital ini untuk mengajukan nota diplomasi,
            penawaran upeti, atau negosiasi wilayah kekuasaan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl shadow-2xl backdrop-blur-sm">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6 border-b border-zinc-800 pb-3 flex items-center gap-2">
              <span>📝</span> {"Formulir Dokumen Diplomasi"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              <div>
                <label className="block text-zinc-500 uppercase font-bold mb-2 tracking-wider">
                  Nama Utusan / Perwakilan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Capone Bege"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-zinc-200 outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-zinc-500 uppercase font-bold mb-2 tracking-wider">
                  Afiliasi / Nama Bajak Laut
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Fire Tank Pirates"
                  value={formData.faction}
                  onChange={(e) =>
                    setFormData({ ...formData, faction: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-zinc-200 outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-500 uppercase font-bold mb-2 tracking-wider">
                    Target Yonko
                  </label>
                  <select
                    value={formData.targetYonko}
                    onChange={(e) =>
                      setFormData({ ...formData, targetYonko: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-zinc-200 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Shanks">Shanks (Rambut Merah)</option>
                    <option value="Luffy">Luffy (Topi Jerami)</option>
                    <option value="Teach">Blackbeard (Kurohige)</option>
                    <option value="Buggy">Buggy (Badut Genius)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-500 uppercase font-bold mb-2 tracking-wider">
                    Tujuan Utama
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) =>
                      setFormData({ ...formData, purpose: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-zinc-200 outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Aliansi Militer">Aliansi Militer</option>
                    <option value="Deklarasi Perang">Deklarasi Perang</option>
                    <option value="Perlindungan Teritorial">
                      Perlindungan Wilayah
                    </option>
                    <option value="Bisnis Dunia Bawah">
                      Bisnis Dunia Bawah
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-500 uppercase font-bold mb-2 tracking-wider">
                    Nominal Berry
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="0"
                    value={formData.tribute_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tribute_amount: e.target.value,
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-zinc-200 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 uppercase font-bold mb-2 tracking-wider">
                    Keterangan Barang
                  </label>
                  <input
                    type="text"
                    placeholder="Misal: Sake Binks"
                    value={formData.tribute_desc}
                    onChange={(e) =>
                      setFormData({ ...formData, tribute_desc: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-zinc-200 outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="bg-zinc-950 border border-indigo-900/40 p-4 rounded-lg mt-4 flex items-center justify-between">
                <div>
                  <span className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest block mb-1">
                    AI Acceptance Forecaster
                  </span>
                  {predictionScore !== null ? (
                    <span className="text-2xl font-black text-indigo-300">
                      {predictionScore}%{" "}
                      <span className="text-[10px] text-zinc-500 font-normal tracking-wide">
                        Peluang Diterima
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-500 italic">
                      Hitung probabilitas persetujuan...
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handlePredict}
                  disabled={isPredicting}
                  className="bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-900/50 text-indigo-400 text-[10px] uppercase font-bold px-4 py-2 rounded transition-colors cursor-pointer"
                >
                  {isPredicting ? "Memproses Tensor..." : "Kalkulasi AI"}
                </button>
              </div>

              <button
                type="submit"
                disabled={isPrinting}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-zinc-950 py-3 uppercase tracking-widest font-black transition-all rounded-lg shadow-lg shadow-amber-950/20 disabled:opacity-50 mt-4 text-center cursor-pointer"
              >
                {isPrinting
                  ? "MENGIRIM DATA KE DATABASE..."
                  : "CETAK TIKET AUDIENSI"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[400px]">
            {!ticket ? (
              <div className="text-center p-8 border-2 border-dashed border-zinc-800 rounded-xl max-w-md w-full bg-zinc-900/10">
                <span className="text-4xl block mb-4 opacity-40">🎫</span>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                  Menunggu Dokumen Masuk
                </p>
                <p className="text-[11px] text-zinc-600 mt-2">
                  Isi formulir di sebelah kiri untuk menghasilkan manifes tiket
                  audiensi resmi.
                </p>
              </div>
            ) : (
              <div className="w-full max-w-xl bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-amber-500/60 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.05)] animate-fadeIn">
                <div className="bg-gradient-to-r from-amber-950/40 to-zinc-900 border-b border-amber-500/30 p-5 flex justify-between items-center relative">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-zinc-950 rounded-br-full border-b border-r border-amber-500/30" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-950 rounded-bl-full border-b border-l border-amber-500/30" />
                  <div>
                    <span className="text-[10px] uppercase font-black text-amber-500 tracking-[0.2em]">
                      Official Safe Conduct Ticket
                    </span>
                    <h4 className="text-lg font-serif font-bold text-zinc-100 tracking-wide mt-0.5">
                      Audiensi Kaisar Laut
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-zinc-500 block uppercase font-bold">
                      Nomor Dokumen
                    </span>
                    <span className="text-xs font-bold text-amber-400 font-mono tracking-wider">
                      {ticket.ticketNo}
                    </span>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-2 gap-y-5 gap-x-6 text-xs relative">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold mb-0.5">
                      Nama Utusan
                    </span>
                    <span className="text-zinc-200 font-bold text-sm tracking-wide">
                      {ticket.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold mb-0.5">
                      Fraksi Penanggung Jawab
                    </span>
                    <span className="text-zinc-200 font-bold text-sm tracking-wide">
                      {ticket.faction}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold mb-0.5">
                      Entitas Yonko Target
                    </span>
                    <span className="text-amber-400 font-black tracking-widest text-sm uppercase">
                      大頭目: {ticket.targetYonko}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold mb-0.5">
                      Agenda Utama
                    </span>
                    <span className="text-zinc-200 font-bold text-sm tracking-wide border border-zinc-800 bg-zinc-900 px-2 py-0.5 rounded w-fit block">
                      {ticket.purpose}
                    </span>
                  </div>
                  <div className="col-span-2 border-t border-zinc-800/60 pt-4">
                    <span className="text-zinc-500 block text-[10px] uppercase font-bold mb-1">
                      Nilai Konsesi / Upeti
                    </span>
                    <p className="text-zinc-300 italic text-xs leading-relaxed bg-zinc-950 p-2.5 rounded border border-zinc-900 font-serif">
                      "{(ticket.tributeAmount || 0).toLocaleString("id-ID")}{" "}
                      Berry — {ticket.tributeDesc}"
                    </p>
                  </div>
                </div>
                <div className="border-t border-dashed border-zinc-800 p-5 bg-zinc-900/30 flex justify-between items-center relative">
                  <div className="absolute -top-1.5 -left-2 w-3 h-3 bg-zinc-950 rounded-full border border-zinc-800" />
                  <div className="absolute -top-1.5 -right-2 w-3 h-3 bg-zinc-950 rounded-full border border-zinc-800" />
                  <div>
                    <span className="text-zinc-600 block text-[9px] uppercase font-bold">
                      Tanggal Pembuatan
                    </span>
                    <span className="text-[11px] font-bold text-zinc-400">
                      {ticket.dateIssued}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-600 block text-[9px] uppercase font-bold mb-0.5">
                      Status Tiket
                    </span>
                    <span className="text-[10px] bg-zinc-900/80 text-zinc-400 font-black px-2.5 py-1 rounded border border-zinc-800/60 tracking-wider uppercase">
                      {ticket.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
