import { useState } from "react";

export default function App() {
  // State untuk menyimpan input form
  const [formData, setFormData] = useState({
    name: "",
    faction: "",
    targetYonko: "Shanks",
    purpose: "Aliansi Militer",
    tribute: "",
  });

  // State untuk menyimpan tiket yang berhasil dicetak
  const [ticket, setTicket] = useState(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPrinting(true);

    // Simulasi proses enkripsi dan pencetakan tiket selama 1.5 detik
    setTimeout(() => {
      const ticketNumber = `YONKO-${formData.targetYonko.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicket({
        ...formData,
        ticketNo: ticketNumber,
        dateIssued: new Date().toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: "PENDING EVALUASI",
      });
      setIsPrinting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-mono text-zinc-100 selection:bg-amber-500 selection:text-zinc-950">
      {/* BACKGROUND DECORATION (Aura Haki) */}
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
          <div className="text-[11px] border border-amber-500/30 bg-amber-500/5 px-3 py-1 rounded text-amber-400 font-bold tracking-widest uppercase animate-pulse">
            Status: Jalur Diplomatik Terbuka
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* HERO SECTION */}
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
            penawaran upeti, atau negosiasi wilayah kekuasaan langsung di
            hadapan entitas Yonko.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* COLUMN 1: FORM REGISTER (5/12 width) */}
          <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl shadow-2xl backdrop-blur-sm">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6 border-b border-zinc-800 pb-3 flex items-center gap-2">
              <span>📝</span> Formulir Dokumen Diplomasi
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

              <div>
                <label className="block text-zinc-500 uppercase font-bold mb-2 tracking-wider">
                  Nilai Upeti Ditawarkan (Berry / Komoditas)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: 500,000,000 Berry atau 2 Peti Sake Kualitas S"
                  value={formData.tribute}
                  onChange={(e) =>
                    setFormData({ ...formData, tribute: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-lg text-zinc-200 outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isPrinting}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-zinc-950 py-3 uppercase tracking-widest font-black transition-all rounded-lg shadow-lg shadow-amber-950/20 disabled:opacity-50 mt-4 text-center cursor-pointer"
              >
                {isPrinting
                  ? "MENGOTENTIKASI BERKAS..."
                  : "CETAK TIKET AUDIENSI"}
              </button>
            </form>
          </div>

          {/* COLUMN 2: TICKET VIEWER (7/12 width) */}
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
                {/* Bagian Atas Tiket */}
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

                {/* Badan Utama Tiket */}
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
                      "{ticket.tribute}"
                    </p>
                  </div>
                </div>

                {/* Bagian Bawah / Barcode & Status */}
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

                  {/* Pseudo Barcode */}
                  <div className="flex flex-col items-center gap-1 opacity-70">
                    <div className="h-6 w-32 bg-zinc-200 flex tracking-tighter overflow-hidden rounded-[2px] border border-zinc-400">
                      <div className="w-full bg-zinc-950 flex justify-around px-1 text-[5px] text-zinc-200 select-none items-center font-black">
                        ||||| | |||| || ||| |||| | ||| || |||| |
                      </div>
                    </div>
                    <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.15em]">
                      Keamanan Enkripsi Dunia Bawah
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-zinc-600 block text-[9px] uppercase font-bold mb-0.5">
                      Status Tiket
                    </span>
                    <span className="text-[10px] bg-red-950/50 text-red-400 font-black px-2.5 py-1 rounded border border-red-900/60 tracking-wider animate-pulse uppercase">
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
