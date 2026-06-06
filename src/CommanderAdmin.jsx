import { useState, useEffect, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CommanderAdmin({ onClose }) {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
        fetchTickets();
      }
    } catch (err) {
      alert("Gagal menghubungi server database Yonko.");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const query = searchQuery.toLowerCase();
    return (
      ticket.ticket_no.toLowerCase().includes(query) ||
      ticket.faction.toLowerCase().includes(query) ||
      ticket.target_yonko.toLowerCase().includes(query)
    );
  });

  // --- LOGIKA DATA VISUALISASI (DIHITUNG OTOMATIS) ---

  // 1. Data untuk Pie Chart (Distribusi Target Yonko)
  const yonkoData = useMemo(() => {
    const counts = {};
    tickets.forEach((t) => {
      counts[t.target_yonko] = (counts[t.target_yonko] || 0) + 1;
    });
    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key],
    }));
  }, [tickets]);
  const pieColors = ["#f59e0b", "#ef4444", "#6366f1", "#10b981"];

  // 2. Data untuk Bar Chart (Akumulasi Berry berdasarkan Tujuan)
  const purposeData = useMemo(() => {
    const sums = {};
    tickets.forEach((t) => {
      const amount = Number(t.tribute_amount) || 0;
      sums[t.purpose] = (sums[t.purpose] || 0) + amount;
    });
    return Object.keys(sums).map((key) => ({
      name: key,
      TotalBerry: sums[key],
    }));
  }, [tickets]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono p-8 relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* HEADER PANEL */}
        <div className="flex justify-between items-end border-b border-red-900/50 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-black text-red-600 uppercase tracking-widest mb-1">
              Commander Terminal
            </h1>
            <p className="text-zinc-500 text-sm tracking-wider">
              Pusat Evaluasi Upeti & Visualisasi Data
            </p>
          </div>
          <button
            onClick={onClose}
            className="border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Tutup Terminal
          </button>
        </div>

        {isLoading ? (
          <div className="text-center text-zinc-500 animate-pulse py-20">
            Mengambil arsip dari Den Den Mushi...
          </div>
        ) : (
          <>
            {/* --- NEW: TRIBUTE ANALYTICS DASHBOARD --- */}
            {tickets.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* PIE CHART PANEL */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                    Distribusi Audiensi Yonko
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={yonkoData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {yonkoData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={pieColors[index % pieColors.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#18181b",
                            borderColor: "#3f3f46",
                            fontSize: "12px",
                          }}
                          itemStyle={{ color: "#f4f4f5" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* BAR CHART PANEL */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
                    Akumulasi Upeti (Berry) via Agenda
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={purposeData}
                        margin={{ top: 10, right: 10, left: 30, bottom: 25 }}
                      >
                        <XAxis
                          dataKey="name"
                          stroke="#52525b"
                          fontSize={10}
                          tickMargin={10}
                        />
                        <YAxis
                          stroke="#52525b"
                          fontSize={10}
                          tickFormatter={(value) =>
                            `${(value / 1000000).toFixed(0)}M`
                          }
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#18181b",
                            borderColor: "#3f3f46",
                            fontSize: "12px",
                          }}
                          cursor={{ fill: "#27272a" }}
                          formatter={(value) =>
                            new Intl.NumberFormat("id-ID").format(value)
                          }
                        />
                        <Bar
                          dataKey="TotalBerry"
                          fill="#b91c1c"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* SEARCH BAR */}
            <div className="mb-8 bg-zinc-900/50 border border-zinc-800 p-4 rounded-lg flex items-center gap-4">
              <span className="text-xl opacity-50">🔍</span>
              <input
                type="text"
                placeholder="Cari berdasarkan Nomor Tiket, Nama Kru, atau Yonko..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-zinc-200 placeholder-zinc-600"
              />
              {searchQuery && (
                <span className="text-[10px] bg-red-950/50 text-red-500 px-2 py-1 rounded border border-red-900/50 uppercase font-bold">
                  Filter Aktif
                </span>
              )}
            </div>

            {/* TAMPILAN GRID TIKET */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTickets.map((ticket) => (
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
                          "
                          {(ticket.tribute_amount || 0).toLocaleString("id-ID")}{" "}
                          Berry — {ticket.tribute_desc}"
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          ticket.ticket_no,
                          "DISETUJUI (APPROVED)",
                        )
                      }
                      className="bg-green-950/30 hover:bg-green-900/50 border border-green-900/50 text-green-500 py-2 text-[10px] uppercase font-bold rounded transition-colors cursor-pointer"
                    >
                      Setujui Audiensi
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          ticket.ticket_no,
                          "DITOLAK (REJECTED)",
                        )
                      }
                      className="bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 text-red-500 py-2 text-[10px] uppercase font-bold rounded transition-colors cursor-pointer"
                    >
                      Tolak / Eksekusi
                    </button>
                  </div>
                </div>
              ))}

              {filteredTickets.length === 0 && (
                <div className="col-span-full text-center text-zinc-500 py-10 border border-dashed border-zinc-800 rounded-lg">
                  <span className="text-2xl block mb-2 opacity-50">📭</span>
                  Tidak ada dokumen yang cocok dengan kata kunci pencarian.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
