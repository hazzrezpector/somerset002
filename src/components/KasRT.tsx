import { useState } from 'react';

interface Transaction {
  id: number;
  date: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
}

const transactions: Transaction[] = [
  { id: 1, date: '12 Jan 2026', description: 'Iuran Bulanan - Ahmad Suryadi', type: 'income', amount: 50000, category: 'Iuran' },
  { id: 2, date: '12 Jan 2026', description: 'Iuran Bulanan - Budi Santoso', type: 'income', amount: 50000, category: 'Iuran' },
  { id: 3, date: '11 Jan 2026', description: 'Pembelian bahan kebersihan kerja bakti', type: 'expense', amount: 150000, category: 'Kegiatan' },
  { id: 4, date: '10 Jan 2026', description: 'Iuran Bulanan - Eko Prasetyo', type: 'income', amount: 50000, category: 'Iuran' },
  { id: 5, date: '10 Jan 2026', description: 'Iuran Bulanan - Dewi Lestari', type: 'income', amount: 50000, category: 'Iuran' },
  { id: 6, date: '9 Jan 2026', description: 'Perbaikan lampu jalan', type: 'expense', amount: 200000, category: 'Infrastruktur' },
  { id: 7, date: '8 Jan 2026', description: 'Iuran Bulanan - Fitri Handayani', type: 'income', amount: 50000, category: 'Iuran' },
  { id: 8, date: '7 Jan 2026', description: 'Konsumsi rapat RT', type: 'expense', amount: 75000, category: 'Kegiatan' },
  { id: 9, date: '6 Jan 2026', description: 'Donasi warga untuk perbaikan masjid', type: 'income', amount: 500000, category: 'Donasi' },
  { id: 10, date: '5 Jan 2026', description: 'Iuran Bulanan - Gunawan Wibowo', type: 'income', amount: 50000, category: 'Iuran' },
];

export default function KasRT() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kas RT</h2>
          <p className="text-gray-500 text-sm">Kelola keuangan RT 05</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
        >
          <span>+</span> Tambah Transaksi
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
          <p className="text-emerald-100 text-sm">Saldo Saat Ini</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(balance)}</p>
          <p className="text-emerald-200 text-xs mt-2">Per Januari 2026</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Pemasukan</p>
          </div>
          <p className="text-xl font-bold text-gray-800 mt-2">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Pengeluaran</p>
          </div>
          <p className="text-xl font-bold text-gray-800 mt-2">{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      {/* Iuran Status */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-3">Status Iuran Bulan Ini</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Lunas: 52 KK</span>
              <span className="text-gray-600">Belum: 20 KK</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
          <span className="text-2xl font-bold text-emerald-600">72%</span>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'Semua' },
          { id: 'income', label: 'Pemasukan' },
          { id: 'expense', label: 'Pengeluaran' },
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

      {/* Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-100">
          {filtered.map(t => (
            <div key={t.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {t.type === 'income' ? '↓' : '↑'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate">{t.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400">{t.date}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t.category}</span>
                </div>
              </div>
              <p className={`font-bold text-sm ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Tambah Transaksi</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Transaksi</label>
                <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>Pemasukan</option>
                  <option>Pengeluaran</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Keterangan transaksi" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah (Rp)</label>
                <input type="number" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>Iuran</option>
                  <option>Kegiatan</option>
                  <option>Infrastruktur</option>
                  <option>Donasi</option>
                  <option>Lainnya</option>
                </select>
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
