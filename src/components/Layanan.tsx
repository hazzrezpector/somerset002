import { useState } from 'react';

interface ServiceRequest {
  id: number;
  type: string;
  resident: string;
  date: string;
  status: 'pending' | 'processing' | 'completed';
  description: string;
}

const requests: ServiceRequest[] = [
  { id: 1, type: 'Surat Pengantar KTP', resident: 'Siti Aminah', date: '12 Jan 2026', status: 'pending', description: 'Permohonan surat pengantar pembuatan KTP baru' },
  { id: 2, type: 'Surat Keterangan Domisili', resident: 'Ahmad Suryadi', date: '11 Jan 2026', status: 'processing', description: 'Surat keterangan domisili untuk keperluan bank' },
  { id: 3, type: 'Surat Pengantar Nikah', resident: 'Eko Prasetyo', date: '10 Jan 2026', status: 'completed', description: 'Surat pengantar untuk pendaftaran nikah di KUA' },
  { id: 4, type: 'Surat Keterangan Tidak Mampu', resident: 'Gunawan Wibowo', date: '9 Jan 2026', status: 'processing', description: 'SKTM untuk keperluan pendidikan anak' },
  { id: 5, type: 'Surat Pengantar KK', resident: 'Dewi Lestari', date: '8 Jan 2026', status: 'completed', description: 'Permohonan surat pengantar pembuatan KK baru' },
  { id: 6, type: 'Pengaduan Lingkungan', resident: 'Fitri Handayani', date: '7 Jan 2026', status: 'pending', description: 'Saluran air mampet di Jl. Anggrek No. 7' },
  { id: 7, type: 'Surat Keterangan Usaha', resident: 'Heni Susanti', date: '6 Jan 2026', status: 'processing', description: 'Surat keterangan usaha untuk UMKM' },
  { id: 8, type: 'Pengaduan Keamanan', resident: 'Irfan Hakim', date: '5 Jan 2026', status: 'completed', description: 'Laporan pencurian sepeda motor di area parkir' },
];

const serviceTypes = [
  { name: 'Surat Pengantar KTP', icon: '🪪', desc: 'Pengantar pembuatan/perpanjangan KTP' },
  { name: 'Surat Keterangan Domisili', icon: '🏠', desc: 'Surat keterangan tempat tinggal' },
  { name: 'Surat Pengantar KK', icon: '👨‍👩‍👧‍👦', desc: 'Pengantar pembuatan Kartu Keluarga' },
  { name: 'Surat Pengantar Nikah', icon: '💍', desc: 'Pengantar pendaftaran pernikahan' },
  { name: 'Surat Keterangan Tidak Mampu', icon: '📄', desc: 'SKTM untuk berbagai keperluan' },
  { name: 'Surat Keterangan Usaha', icon: '🏪', desc: 'SK Usaha untuk UMKM' },
  { name: 'Pengaduan Lingkungan', icon: '🌿', desc: 'Laporan masalah lingkungan' },
  { name: 'Pengaduan Keamanan', icon: '🔒', desc: 'Laporan masalah keamanan' },
];

export default function Layanan() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter);

  const statusConfig = {
    pending: { label: 'Menunggu', color: 'bg-amber-100 text-amber-700', icon: '⏳' },
    processing: { label: 'Diproses', color: 'bg-blue-100 text-blue-700', icon: '⚙️' },
    completed: { label: 'Selesai', color: 'bg-green-100 text-green-700', icon: '✅' },
  };

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    processing: requests.filter(r => r.status === 'processing').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Layanan Warga</h2>
          <p className="text-gray-500 text-sm">Permohonan surat dan pengaduan warga</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <span>+</span> Ajukan Layanan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{stats.pending}</p>
          <p className="text-xs text-amber-600 mt-1">Menunggu</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-700">{stats.processing}</p>
          <p className="text-xs text-blue-600 mt-1">Diproses</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
          <p className="text-xs text-green-600 mt-1">Selesai</p>
        </div>
      </div>

      {/* Service Types */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-4">Jenis Layanan</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {serviceTypes.map(service => (
            <button
              key={service.name}
              className="p-3 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-all text-left"
            >
              <span className="text-xl">{service.icon}</span>
              <p className="font-medium text-gray-800 text-xs mt-1">{service.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{service.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'Semua' },
          { id: 'pending', label: 'Menunggu' },
          { id: 'processing', label: 'Diproses' },
          { id: 'completed', label: 'Selesai' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f.id ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Request List */}
      <div className="space-y-3">
        {filtered.map(req => (
          <div key={req.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 font-bold text-sm">
                #{req.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-gray-800 text-sm">{req.type}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[req.status].color}`}>
                    {statusConfig[req.status].icon} {statusConfig[req.status].label}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-400">👤 {req.resident}</span>
                  <span className="text-xs text-gray-400">📅 {req.date}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Ajukan Layanan</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Layanan</label>
                <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  {serviceTypes.map(s => (
                    <option key={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                <textarea className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" rows={4} placeholder="Jelaskan keperluan Anda..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urgensi</label>
                <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>Biasa</option>
                  <option>Penting</option>
                  <option>Segera</option>
                </select>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Ajukan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
