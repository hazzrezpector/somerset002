import { useState } from 'react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  category: string;
  pinned: boolean;
}

const initialAnnouncements: Announcement[] = [
  { id: 1, title: 'Kerja Bakti Bulanan - Januari 2026', content: 'Diberitahukan kepada seluruh warga RT 05 untuk mengikuti kerja bakti bulanan yang akan dilaksanakan pada hari Minggu, 15 Januari 2026 pukul 07.00 WIB. Setiap KK diharapkan membawa peralatan kebersihan masing-masing.', date: '10 Jan 2026', author: 'Pak Budi (Ketua RT)', category: 'Kegiatan', pinned: true },
  { id: 2, title: 'Pembayaran Iuran Bulanan', content: 'Diharapkan kepada seluruh warga untuk segera membayar iuran bulanan bulan Januari 2026 sebesar Rp 50.000/KK. Pembayaran dapat dilakukan melalui transfer atau langsung ke bendahara.', date: '8 Jan 2026', author: 'Bu Ratna (Bendahara)', category: 'Iuran', pinned: true },
  { id: 3, title: 'Perbaikan Jalan Lingkungan', content: 'Mulai tanggal 12 Januari 2026 akan dilakukan perbaikan jalan di Jl. Mawar. Mohon warga yang tinggal di area tersebut untuk memarkir kendaraan di tempat yang telah disediakan.', date: '7 Jan 2026', author: 'Pak Budi (Ketua RT)', category: 'Infrastruktur', pinned: false },
  { id: 4, title: 'Rapat Koordinasi Persiapan 17 Agustus', content: 'Undangan rapat persiapan peringatan HUT RI ke-81. Rapat akan dilaksanakan di Balai Warga pada tanggal 20 Januari 2026 pukul 19.30 WIB.', date: '5 Jan 2026', author: 'Pak Eko (Sekretaris)', category: 'Rapat', pinned: false },
  { id: 5, title: 'Program Posyandu Bulan Januari', content: 'Jadwal posyandu bulan Januari: Tanggal 18 untuk balita, tanggal 19 untuk ibu hamil, dan tanggal 20 untuk lansia. Tempat di Posyandu Melati.', date: '3 Jan 2026', author: 'Bu Sari (Kader Posyandu)', category: 'Kesehatan', pinned: false },
];

export default function Pengumuman() {
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<Announcement | null>(null);
  const [showDelete, setShowDelete] = useState<Announcement | null>(null);
  const [filter, setFilter] = useState('Semua');
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [toast, setToast] = useState('');

  const categories = ['Semua', 'Kegiatan', 'Iuran', 'Infrastruktur', 'Rapat', 'Kesehatan'];
  const filtered = filter === 'Semua' ? announcements : announcements.filter(a => a.category === filter);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (ann: Announcement) => {
    setAnnouncements(announcements.filter(a => a.id !== ann.id));
    setShowDelete(null);
    showToast('Pengumuman berhasil dihapus');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Pengumuman</h2>
          <p className="text-gray-500 text-sm">Informasi dan pengumuman untuk warga</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <span>+</span> Buat Pengumuman
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === cat ? 'bg-emerald-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map(ann => (
          <div key={ann.id} className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${ann.pinned ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100'}`}>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {ann.pinned && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">📌 Disematkan</span>}
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ann.category}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mt-2">{ann.title}</h3>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">{ann.content}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => setShowDetail(ann)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
                    title="Lihat Detail"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowModal(true)}
                    className="p-2 rounded-lg hover:bg-amber-50 text-amber-600"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowDelete(ann)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                    title="Hapus"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-xs font-bold">
                    {ann.author.charAt(0)}
                  </div>
                  <span className="text-xs text-gray-500">{ann.author}</span>
                </div>
                <span className="text-xs text-gray-400">{ann.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{showDetail.category}</span>
              </div>
              <button onClick={() => setShowDetail(null)} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-xl text-gray-800">{showDetail.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-xs font-bold">
                  {showDetail.author.charAt(0)}
                </div>
                <span className="text-sm text-gray-500">{showDetail.author}</span>
                <span className="text-xs text-gray-400">• {showDetail.date}</span>
              </div>
              <p className="text-gray-700 mt-4 leading-relaxed">{showDetail.content}</p>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowDetail(null)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Tutup</button>
              <button onClick={() => { setShowDetail(null); setShowModal(true); }} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Edit</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-gray-800">Hapus Pengumuman?</h3>
            <p className="text-sm text-gray-500 mt-2">Pengumuman "<strong>{showDelete.title}</strong>" akan dihapus permanen</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowDelete(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={() => handleDelete(showDelete)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Buat Pengumuman Baru</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Judul pengumuman" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>Kegiatan</option>
                  <option>Iuran</option>
                  <option>Infrastruktur</option>
                  <option>Rapat</option>
                  <option>Kesehatan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Isi Pengumuman</label>
                <textarea className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" rows={5} placeholder="Tulis isi pengumuman..." />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pinned" className="rounded border-gray-300" />
                <label htmlFor="pinned" className="text-sm text-gray-700">Sematkan pengumuman</label>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={() => { setShowModal(false); showToast('Pengumuman berhasil dipublikasikan'); }} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Publikasikan</button>
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
