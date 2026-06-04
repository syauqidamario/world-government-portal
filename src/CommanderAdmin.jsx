import { useState, useEffect } from "react";

export default function CommanderAdmin({ onClose }) {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTickets = () => {
    fetch("http://127.0.0.1:8001/api/tickets")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleUpdateStatus = async (ticketNo, newStatus) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8001/api/tickets/${ticketNo}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (response.ok) {
        fetchTickets(); // Refresh data setelah berhasil update
      }
    } catch (err) {
      alert("Gagal menghubungi server database Yonko.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono p-8 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end border-b border-red-900/50 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-red-600 uppercase tracking-widest mb-1">
              Commander Terminal
            </h1>
            <p className="text-zinc-500 text-sm tracking-wider">
              Pusat Evaluasi Upeti & Protokol Audiensi
            </p>
          </div>
          <button
            onClick={onClose}
            className="border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Tutup Terminal
          </button>
        </div>

        {isLoading ? (
          <div className="text-center text-zinc-500 animate-pulse py-20">
            Mengambil arsip dari Den Den Mushi...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 border-b border-zinc-800/50 pb-3">
                    <span className="text-amber-500 font-bold text-xs font-mono">
                      {ticket.ticket_no}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider ${
                        ticket.status === "PENDING EVALUASI"
                          ? "bg-zinc-800 text-zinc-400"
                          : ticket.status === "DISETUJUI (APPROVED)"
                            ? "bg-green-900/40 text-green-500"
                            : "bg-red-900/40 text-red-500"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs mb-6">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Target Yonko:</span>
                      <span className="font-bold uppercase text-red-400">
                        {ticket.target_yonko}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Fraksi Utusan:</span>
                      <span className="text-zinc-200">{ticket.faction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Agenda:</span>
                      <span className="text-zinc-200">{ticket.purpose}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-zinc-800/50">
                      <span className="text-zinc-500 block text-[10px] uppercase mb-1">
                        Tawaran Upeti:
                      </span>
                      <span className="text-amber-500/80 italic">
                        "{ticket.tribute}"
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi Komandan */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() =>
                      handleUpdateStatus(
                        ticket.ticket_no,
                        "DISETUJUI (APPROVED)",
                      )
                    }
                    className="bg-green-950/30 hover:bg-green-900/50 border border-green-900/50 text-green-500 py-2 text-[10px] uppercase font-bold rounded transition-colors"
                  >
                    Setujui Audiensi
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateStatus(ticket.ticket_no, "DITOLAK (REJECTED)")
                    }
                    className="bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 text-red-500 py-2 text-[10px] uppercase font-bold rounded transition-colors"
                  >
                    Tolak / Eksekusi
                  </button>
                </div>
              </div>
            ))}
            {tickets.length === 0 && (
              <div className="col-span-full text-center text-zinc-500 py-10">
                Tidak ada pengajuan audiensi yang masuk.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
