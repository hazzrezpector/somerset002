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

const initialVisitors: Visitor[] = [
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

const initialIncidents: SecurityIncident[] = [
  { id: 1, type: 'Pencurian', description: 'Pencurian sepeda motor di area parkir Jl. Kenanga', date: '5 Jan 2026', location: 'Jl. Kenanga No. 6', status: 'resolved' },
  { id: 2, type: 'Gangguan', description: 'Suara musik keras dari rumah kosong setelah jam 22:00', date: '8 Jan 2026', location: 'Jl. Anggrek No. 10', status: 'resolved' },
  { id: 3, type: 'Lampu Jalan', description: 'Lampu jalan mati di Jl. Mawar (3 titik)', date: '10 Jan 2026', location: 'Jl. Mawar', status: 'ongoing' },
];

export default function Keamanan() {
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<Visitor | null>(null);
  const [showCheckout, setShowCheckout] = useState<Visitor | null>(null);
  const [tab, setTab] = useState<'visitors' | 'incidents'>('visitors');
  const [visitors, setVisitors] = useState(initialVisitors);
  const [incidents] = useState(initialIncidents);
  const [toast, setToast] = useState('');

  const insideCount = visitors.filter(v => v.status === 'inside').length;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleCheckout = (visitor: Visitor) => {
    setVisitors(visitors.map(v => v.id === visitor.id ? { ...v, status: 'left' as const, checkOut: new Date().toLocaleString('id-ID') } : v));
    setShowCheckout(null);
    showToast(`${visitor.name} telah check-out`);
  };

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
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTab('visitors')}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🚗</span>
            <span className="text-xs text-gray-500">Tamu Saat Ini</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">{insideCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTab('visitors')}>
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="text-xs text-gray-500">Total Hari Ini</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">{visitors.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTab('incidents')}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🛡️</span>
            <span className="text-xs text-gray-500">Insiden Bulan Ini</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-1">{incidents.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setTab('incidents')}>
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
                    <h4 className="font-bold text-gray-800 text-sm cursor-pointer hover:text-emerald-600" onClick={() => setShowDetail(visitor)}>{visitor.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      visitor.status === 'inside' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {visitor.status === 'inside' ? 'Masih di Dalam' : 'Sudah Pulang'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{visitor.purpose}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <span className="text-xs text-gray-400">🏠 Tuan rumah: {visitor.host}</span>
                    <span className="text-xs text-gray-400">📍 {visitor.hostAddress}</span>
                    <span className="text-xs text-gray-400">🕐 Masuk: {visitor.checkIn}</span>
                    <span className="text-xs text-gray-400">🚗 {visitor.vehicle}</span>
                  </div>
                  {visitor.checkOut && (
                    <p className="text-xs text-gray-400 mt-1">🕐 Keluar: {visitor.checkOut}</p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setShowDetail(visitor)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600" title="Detail">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {visitor.status === 'inside' && (
                    <button onClick={() => setShowCheckout(visitor)} className="p-2 rounded-lg hover:bg-amber-50 text-amber-600" title="Check Out">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
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
                <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 shrink-0" title="Detail">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Detail Tamu</h3>
              <button onClick={() => setShowDetail(null)} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  showDetail.status === 'inside' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {showDetail.status === 'inside' ? '🟢' : '⚪'}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{showDetail.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    showDetail.status === 'inside' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {showDetail.status === 'inside' ? 'Masih di Dalam' : 'Sudah Pulang'}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Tujuan</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.purpose}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Tuan Rumah</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.host}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Alamat</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.hostAddress}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Kendaraan</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.vehicle}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Check In</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.checkIn}</span>
                </div>
                {showDetail.checkOut && (
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-500">Check Out</span>
                    <span className="text-sm font-medium text-gray-800">{showDetail.checkOut}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowDetail(null)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Tutup</button>
              {showDetail.status === 'inside' && (
                <button onClick={() => { setShowDetail(null); setShowCheckout(showDetail); }} className="px-4 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 font-medium">Check Out</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Confirmation */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🚪</div>
            <h3 className="text-lg font-bold text-gray-800">Check Out Tamu?</h3>
            <p className="text-sm text-gray-500 mt-2">Konfirmasi <strong>{showCheckout.name}</strong> telah meninggalkan area RT</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCheckout(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={() => handleCheckout(showCheckout)} className="flex-1 px-4 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-700 font-medium">Check Out</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Visitor Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Lapor Tamu / Pengunjung</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
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
              <button onClick={() => { setShowModal(false); showToast('Data tamu berhasil disimpan'); }} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50">
          <span>✅</span>
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
