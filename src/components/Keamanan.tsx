import { useState } from 'react';

interface Visitor {
  id: number;
  name: string;
  purpose: string;
  host: string;
  hostAddress: string;
  checkIn: string;
  checkOut: string | null;
  vehicle: string;
  status: 'inside' | 'left';
}

const visitors: Visitor[] = [
  { id: 1, name: 'Pak Joko (Keluarga)', purpose: 'Silaturahmi', host: 'Bu Ani', hostAddress: 'Jl. Mawar No. 1', checkIn: '13 Jan 2026, 10:00', checkOut: null, vehicle: 'Motor - B 1234 ABC', status: 'inside' },
  { id: 2, name: 'Kurir JNE', purpose: 'Pengiriman paket', host: 'Pak Budi', hostAddress: 'Jl. Melati No. 5', checkIn: '13 Jan 2026, 09:30', checkOut: '13 Jan 2026, 09:45', vehicle: 'Motor - B 5678 DEF', status: 'left' },
  { id: 3, name: 'Tukang Galon', purpose: 'Antar galon', host: 'Bu Sari', hostAddress: 'Jl. Anggrek No. 3', checkIn: '13 Jan 2026, 08:00', checkOut: '13 Jan 2026, 08:15', vehicle: 'Motor - B 9012 GHI', status: 'left' },
  { id: 4, name: 'Ibu Rina (Saudara)', purpose: 'Menginap 3 hari', host: 'Pak Eko', hostAddress: 'Jl. Dahlia No. 2', checkIn: '12 Jan 2026, 15:00', checkOut: null, vehicle: 'Mobil - B 3456 JKL', status: 'inside' },
  { id: 5, name: 'Teknisi Internet', purpose: 'Perbaikan jaringan', host: 'Pak Irfan', hostAddress: 'Jl. Kenanga No. 1', checkIn: '12 Jan 2026, 13:00', checkOut: '12 Jan 2026, 15:00', vehicle: 'Mobil - B 7890 MNO', status: 'left' },
];

interface SecurityIncident {
  id: number;
  type: string;
  description: string;
  date: string;
  location: string;
  status: 'resolved' | 'ongoing';
}

const incidents: SecurityIncident[] = [
  { id: 1, type: 'Pencurian', description: 'Pencurian sepeda motor di area parkir Jl. Kenanga', date: '5 Jan 2026', location: 'Jl. Kenanga No. 6', status: 'resolved' },
  { id: 2, type: 'Gangguan', description: 'Suara musik keras dari rumah kosong setelah jam 22:00', date: '8 Jan 2026', location: 'Jl. Anggrek No. 10', status: 'resolved' },
  { id: 3, type: 'Lampu Jalan', description: 'Lampu jalan mati di Jl. Mawar (3 titik)', date: '10 Jan 2026', location: 'Jl. Mawar', status: 'ongoing' },
];

export default function Keamanan() {
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState<'visitors' | 'incidents'>('visitors');

  const insideCount = visitors.filter(v => v.status === 'inside').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Keamanan & Tamu</h2>
          <p className="text-gray-500 text-sm">Pencatatan tamu dan keamanan lingkungan</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <span>+</span> Lapor Tamu
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚗</span>
            <span className="text-xs text-gray-500">Tamu Saat Ini</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">{insideCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="text-xs text-gray-500">Total Hari Ini</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">{visitors.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛡️</span>
            <span className="text-xs text-gray-500">Insiden Bulan Ini</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">{incidents.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <span className="text-xs text-gray-500">Selesai</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{incidents.filter(i => i.status === 'resolved').length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('visitors')}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            tab === 'visitors' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          🚗 Tamu ({visitors.length})
        </button>
        <button
          onClick={() => setTab('incidents')}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            tab === 'incidents' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          🛡️ Insiden ({incidents.length})
        </button>
      </div>

      {/* Content */}
      {tab === 'visitors' ? (
        <div className="space-y-3">
          {visitors.map(visitor => (
            <div key={visitor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  visitor.status === 'inside' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {visitor.status === 'inside' ? '🟢' : '⚪'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-gray-800 text-sm">{visitor.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      visitor.status === 'inside' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {visitor.status === 'inside' ? 'Masih di Dalam' : 'Sudah Pulang'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{visitor.purpose}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">🏠 Tuan rumah: {visitor.host}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">📍 {visitor.hostAddress}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">🕐 Masuk: {visitor.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">🚗 {visitor.vehicle}</span>
                    </div>
                  </div>
                  {visitor.checkOut && (
                    <p className="text-xs text-gray-400 mt-1">🕐 Keluar: {visitor.checkOut}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {incidents.map(incident => (
            <div key={incident.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  incident.status === 'ongoing' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  {incident.status === 'ongoing' ? '⚠️' : '✅'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{incident.type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      incident.status === 'ongoing' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {incident.status === 'ongoing' ? 'Belum Selesai' : 'Selesai'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{incident.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-400">📅 {incident.date}</span>
                    <span className="text-xs text-gray-400">📍 {incident.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Lapor Tamu / Pengunjung</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Tamu</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama lengkap tamu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Berkunjung</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Tujuan kunjungan" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tuan Rumah</label>
                  <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama warga" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                  <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Alamat warga" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kendaraan</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Jenis & nomor kendaraan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KTP/Identitas</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="No. KTP / identitas lainnya" />
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
