import { useState } from 'react';

interface Warga {
  id: number;
  nama: string;
  nik: string;
  alamat: string;
  noHP: string;
  status: string;
  pekerjaan: string;
}

const initialData: Warga[] = [
  { id: 1, nama: 'Ahmad Suryadi', nik: '3201012345670001', alamat: 'Jl. Mawar No. 1', noHP: '081234567890', status: 'Kepala Keluarga', pekerjaan: 'Wiraswasta' },
  { id: 2, nama: 'Siti Aminah', nik: '3201012345670002', alamat: 'Jl. Mawar No. 1', noHP: '081234567891', status: 'Istri', pekerjaan: 'Ibu Rumah Tangga' },
  { id: 3, nama: 'Budi Santoso', nik: '3201012345670003', alamat: 'Jl. Melati No. 5', noHP: '081234567892', status: 'Kepala Keluarga', pekerjaan: 'PNS' },
  { id: 4, nama: 'Dewi Lestari', nik: '3201012345670004', alamat: 'Jl. Melati No. 5', noHP: '081234567893', status: 'Istri', pekerjaan: 'Guru' },
  { id: 5, nama: 'Eko Prasetyo', nik: '3201012345670005', alamat: 'Jl. Anggrek No. 3', noHP: '081234567894', status: 'Kepala Keluarga', pekerjaan: 'Karyawan Swasta' },
  { id: 6, nama: 'Fitri Handayani', nik: '3201012345670006', alamat: 'Jl. Anggrek No. 7', noHP: '081234567895', status: 'Kepala Keluarga', pekerjaan: 'Dokter' },
  { id: 7, nama: 'Gunawan Wibowo', nik: '3201012345670007', alamat: 'Jl. Dahlia No. 2', noHP: '081234567896', status: 'Kepala Keluarga', pekerjaan: 'Pensiunan' },
  { id: 8, nama: 'Heni Susanti', nik: '3201012345670008', alamat: 'Jl. Dahlia No. 4', noHP: '081234567897', status: 'Kepala Keluarga', pekerjaan: 'Pedagang' },
  { id: 9, nama: 'Irfan Hakim', nik: '3201012345670009', alamat: 'Jl. Kenanga No. 1', noHP: '081234567898', status: 'Kepala Keluarga', pekerjaan: 'Pengacara' },
  { id: 10, nama: 'Joko Widodo', nik: '3201012345670010', alamat: 'Jl. Kenanga No. 6', noHP: '081234567899', status: 'Kepala Keluarga', pekerjaan: 'Petani' },
];

export default function DataWarga() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<Warga | null>(null);
  const [showDelete, setShowDelete] = useState<Warga | null>(null);
  const [data, setData] = useState(initialData);
  const [toast, setToast] = useState('');

  const filtered = data.filter(w =>
    w.nama.toLowerCase().includes(search.toLowerCase()) ||
    w.alamat.toLowerCase().includes(search.toLowerCase())
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (warga: Warga) => {
    setData(data.filter(w => w.id !== warga.id));
    setShowDelete(null);
    showToast(`Data ${warga.nama} berhasil dihapus`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Data Warga</h2>
          <p className="text-gray-500 text-sm">Kelola data warga RT 05</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <span>+</span> Tambah Warga
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Warga', value: data.length.toString(), icon: '👥' },
          { label: 'Laki-laki', value: '128', icon: '👨' },
          { label: 'Perempuan', value: '120', icon: '👩' },
          { label: 'KK', value: '72', icon: '🏠' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <span className="text-lg">{s.icon}</span>
            <p className="text-xl font-bold text-gray-800 mt-1">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama atau alamat warga..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nama</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">NIK</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Alamat</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Pekerjaan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((warga) => (
                <tr key={warga.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs">
                        {warga.nama.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{warga.nama}</p>
                        <p className="text-xs text-gray-400">{warga.noHP}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{warga.nik}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">{warga.alamat}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{warga.pekerjaan}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      warga.status === 'Kepala Keluarga' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {warga.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setShowDetail(warga)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"
                        title="Lihat Detail"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowModal(true)}
                        className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-600"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setShowDelete(warga)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-600"
                        title="Hapus"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Menampilkan {filtered.length} dari {data.length} warga</p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">←</button>
            <button className="px-3 py-1.5 text-sm rounded-lg bg-emerald-600 text-white">1</button>
            <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">2</button>
            <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">3</button>
            <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">→</button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Detail Warga</h3>
              <button onClick={() => setShowDetail(null)} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-2xl font-bold">
                  {showDetail.nama.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{showDetail.nama}</h4>
                  <p className="text-sm text-gray-500">{showDetail.status}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">NIK</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.nik}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">No. HP</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.noHP}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Alamat</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.alamat}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-500">Pekerjaan</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.pekerjaan}</span>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowDetail(null)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Tutup</button>
              <button onClick={() => { setShowDetail(null); setShowModal(true); }} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Edit Data</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-gray-800">Hapus Data Warga?</h3>
            <p className="text-sm text-gray-500 mt-2">Data <strong>{showDelete.nama}</strong> akan dihapus permanen</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowDelete(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={() => handleDelete(showDelete)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Tambah Warga Baru</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Masukkan nama lengkap" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="16 digit NIK" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                  <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="08xxxxxxxxxx" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
                  <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Pekerjaan" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <textarea className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" rows={2} placeholder="Alamat lengkap" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>Kepala Keluarga</option>
                  <option>Istri</option>
                  <option>Anak</option>
                </select>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={() => { setShowModal(false); showToast('Data warga berhasil ditambahkan'); }} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Simpan</button>
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
