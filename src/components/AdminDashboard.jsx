/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";

export default function AdminDashboard({ onLogout }) {
  const [classifiedData, setClassifiedData] = useState(null);
  const [nations, setNations] = useState([]);
  const [error, setError] = useState("");

  // State Form Edit & Delete
  const [selectedNation, setSelectedNation] = useState("");
  const [newStatus, setNewStatus] = useState("Active");
  const [newTribute, setNewTribute] = useState("Paid");
  const [isUpdating, setIsUpdating] = useState(false);

  // State Form Create (Tambah Baru)
  const [createData, setCreateData] = useState({
    id: "",
    name: "",
    ruler: "",
    region: "",
    status: "Active",
    tribute: "Paid",
  });

  // Fungsi untuk me-refresh data secara real-time setelah ada perubahan CRUD
  const fetchNationsList = useCallback(() => {
    fetch("http://127.0.0.1:8000/api/nations")
      .then((res) => res.json())
      .then((data) => {
        setNations(data);
        // Otomatis pilih kerajaan pertama di dropdown jika belum ada yang dipilih
        if (data.length > 0 && !selectedNation) {
          setSelectedNation(data[0].id);
        } else if (data.length === 0) {
          setSelectedNation("");
        }
      });
  }, [selectedNation]);

  useEffect(() => {
    const token = localStorage.getItem("wg_token");
    if (!token) {
      setError("Akses Ilegal: Token tidak ditemukan.");
      return;
    }

    // Ambil data rahasia
    fetch(`http://127.0.0.1:8000/api/admin/classified-data?token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error("Token tidak valid atau kadaluarsa.");
        return res.json();
      })
      .then((data) => setClassifiedData(data))
      .catch((err) => setError(err.message));

    // Ambil daftar kerajaan
    fetchNationsList();
  }, [fetchNationsList]);

  // --- LOGIC UPDATE ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedNation) return alert("Pilih target kerajaan terlebih dahulu.");

    setIsUpdating(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/nations/${selectedNation}?token=${localStorage.getItem("wg_token")}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus, tribute: newTribute }),
        },
      );
      if (response.ok) {
        alert("STATUS BERHASIL DIUBAH.");
        fetchNationsList();
      } else {
        alert("GAGAL: Akses ditolak oleh server pusat.");
      }
    } catch (err) {
      alert("KONEKSI TERPUTUS.");
    } finally {
      setIsUpdating(false);
    }
  };

  // --- LOGIC CREATE ---
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/nations?token=${localStorage.getItem("wg_token")}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createData),
        },
      );

      if (response.ok) {
        alert("REGISTRASI KERAJAAN BERHASIL.");
        setCreateData({
          id: "",
          name: "",
          ruler: "",
          region: "",
          status: "Active",
          tribute: "Paid",
        });
        fetchNationsList();
      } else {
        const errorData = await response.json();
        alert(`GAGAL: ${errorData.detail}`);
      }
    } catch (err) {
      alert("KONEKSI TERPUTUS.");
    }
  };

  // --- LOGIC DELETE ---
  const handleDelete = async () => {
    if (!selectedNation) return alert("Pilih target kerajaan terlebih dahulu.");
    if (
      !window.confirm(
        "PERINGATAN: Anda akan menghapus data ini secara permanen dari sejarah. Lanjutkan eksekusi Buster Call?",
      )
    )
      return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/admin/nations/${selectedNation}?token=${localStorage.getItem("wg_token")}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        alert("DATA TERHAPUS PERMANEN.");
        setSelectedNation(""); // Reset pilihan
        fetchNationsList();
      }
    } catch (err) {
      alert("KONEKSI TERPUTUS.");
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 p-8 font-mono text-slate-100 border-t-4 border-red-900 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Header Dashboard */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-red-600 uppercase tracking-widest">
              Cipher Pol Aegis Zero
            </h1>
            <p className="text-slate-500 text-sm tracking-wider">
              Pusat Komando Sistem Database Global
            </p>
          </div>
          <button
            onClick={onLogout}
            className="border border-red-900 text-red-500 hover:bg-red-900/30 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Cabut Akses (Logout)
          </button>
        </div>

        {error ? (
          <div className="bg-red-900/20 border border-red-900 text-red-500 p-6 rounded text-center">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Panel Top Secret (Read-Only) */}
            {classifiedData && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-900 text-white text-[10px] px-3 py-1 font-bold tracking-widest rounded-bl">
                  TOP SECRET
                </div>
                <h2 className="text-lg font-bold mb-4 border-b border-slate-800 pb-2 text-red-500">
                  Target Eliminasi
                </h2>
                <div className="flex justify-between max-w-md text-sm">
                  <span className="text-slate-500">
                    Target Operasi:{" "}
                    <span className="font-bold text-slate-200 ml-2">
                      {classifiedData.target}
                    </span>
                  </span>
                  <span className="text-slate-500">
                    Status:{" "}
                    <span className="font-bold uppercase text-red-500 animate-pulse ml-2">
                      {classifiedData.status}
                    </span>
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* PANEL KIRI: Create New (Tambah Data) */}
              <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg shadow-2xl h-fit">
                <h2 className="text-lg font-bold mb-4 border-b border-slate-800 pb-2 text-green-500">
                  [+] Registrasi Afiliasi Baru
                </h2>
                <form
                  onSubmit={handleCreate}
                  className="space-y-4 text-sm mt-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase mb-1">
                        ID Unik (Misal: wano)
                      </label>
                      <input
                        type="text"
                        required
                        value={createData.id}
                        onChange={(e) =>
                          setCreateData({
                            ...createData,
                            id: e.target.value.toLowerCase(),
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200 outline-none focus:border-green-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase mb-1">
                        Wilayah / Region
                      </label>
                      <input
                        type="text"
                        required
                        value={createData.region}
                        onChange={(e) =>
                          setCreateData({
                            ...createData,
                            region: e.target.value,
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200 outline-none focus:border-green-600 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase mb-1">
                      Nama Resmi Kerajaan
                    </label>
                    <input
                      type="text"
                      required
                      value={createData.name}
                      onChange={(e) =>
                        setCreateData({ ...createData, name: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200 outline-none focus:border-green-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase mb-1">
                      Penguasa (Ruler)
                    </label>
                    <input
                      type="text"
                      required
                      value={createData.ruler}
                      onChange={(e) =>
                        setCreateData({ ...createData, ruler: e.target.value })
                      }
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200 outline-none focus:border-green-600 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase mb-1">
                        Status Awal
                      </label>
                      <select
                        value={createData.status}
                        onChange={(e) =>
                          setCreateData({
                            ...createData,
                            status: e.target.value,
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200 outline-none focus:border-green-600"
                      >
                        <option value="Active">Active</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Revoked">Revoked</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-500 text-[10px] uppercase mb-1">
                        Upeti Awal
                      </label>
                      <select
                        value={createData.tribute}
                        onChange={(e) =>
                          setCreateData({
                            ...createData,
                            tribute: e.target.value,
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200 outline-none focus:border-green-600"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Denied">Denied</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-900/40 hover:bg-green-800 border border-green-700 text-slate-100 py-3 uppercase tracking-widest font-bold transition-colors rounded text-xs mt-4"
                  >
                    Tambahkan ke Database
                  </button>
                </form>
              </div>

              {/* PANEL KANAN: Update & Delete (Manipulasi Data) */}
              <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg shadow-2xl h-fit">
                <h2 className="text-lg font-bold mb-4 border-b border-slate-800 pb-2 text-slate-300">
                  [⚙] Override & Eliminasi
                </h2>

                <form
                  onSubmit={handleUpdate}
                  className="space-y-4 text-sm mt-4"
                >
                  <div>
                    <label className="block text-slate-500 text-[10px] uppercase mb-1">
                      Pilih Target Kerajaan
                    </label>
                    <select
                      value={selectedNation}
                      onChange={(e) => setSelectedNation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200 outline-none focus:border-red-600"
                    >
                      {nations.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name}
                        </option>
                      ))}
                      {nations.length === 0 && (
                        <option value="">-- Database Kosong --</option>
                      )}
                    </select>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-slate-500 text-[10px] uppercase mb-1">
                        Status Baru
                      </label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200 outline-none focus:border-red-600"
                      >
                        <option value="Active">Active</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Revoked">Revoked</option>
                        <option value="Erased">Erased</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-slate-500 text-[10px] uppercase mb-1">
                        Status Upeti
                      </label>
                      <select
                        value={newTribute}
                        onChange={(e) => setNewTribute(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 p-2 rounded text-slate-200 outline-none focus:border-red-600"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Denied">Denied</option>
                        <option value="NULL">NULL</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-slate-800">
                    <button
                      type="submit"
                      disabled={isUpdating || !selectedNation}
                      className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 py-3 uppercase tracking-widest font-bold transition-colors rounded text-xs disabled:opacity-50"
                    >
                      {isUpdating ? "MEMPROSES..." : "UPDATE STATUS"}
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={!selectedNation}
                      className="w-full bg-red-900/30 hover:bg-red-900 border border-red-800 text-red-500 hover:text-slate-100 py-3 uppercase tracking-widest font-bold transition-colors rounded text-xs disabled:opacity-50"
                    >
                      BUSTER CALL (HAPUS PERMANEN)
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
