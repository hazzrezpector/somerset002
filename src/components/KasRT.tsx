import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Transaction {
  id: number;
  date: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
}

export default function KasRT() {
  const { transactions, addTransaction } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<Transaction | null>(null);
  const [showDelete, setShowDelete] = useState<Transaction | null>(null);
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState('');

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (t: Transaction) => {
    setShowDelete(null);
    showToast('Transaksi berhasil dihapus');
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
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white cursor-pointer hover:shadow-lg transition-shadow">
          <p className="text-emerald-100 text-sm">Saldo Saat Ini</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(balance)}</p>
          <p className="text-emerald-200 text-xs mt-2">Per Januari 2026</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">↑</div>
            <p className="text-sm text-gray-500">Pemasukan</p>
          </div>
          <p className="text-xl font-bold text-gray-800 mt-2">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600">↓</div>
            <p className="text-sm text-gray-500">Pengeluaran</p>
          </div>
          <p className="text-xl font-bold text-gray-800 mt-2">{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      {/* Iuran Status */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Status Iuran Bulan Ini</h3>
          <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">Lihat Detail</button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Lunas: 52 KK</span>
              <span className="text-gray-600">Belum: 20 KK</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-emerald-500 h-3 rounded-full transition-all" style={{ width: '72%' }}></div>
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
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer ${
                t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {t.type === 'income' ? '↓' : '↑'}
              </div>
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setShowDetail(t)}>
                <p className="font-medium text-gray-800 text-sm truncate">{t.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400">{t.date}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t.category}</span>
                </div>
              </div>
              <p className={`font-bold text-sm ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </p>
              <div className="flex gap-1">
                <button onClick={() => setShowDetail(t)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600" title="Detail">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button onClick={() => setShowDelete(t)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600" title="Hapus">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Detail Transaksi</h3>
              <button onClick={() => setShowDetail(null)} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4 ${
                showDetail.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {showDetail.type === 'income' ? '💰' : '💸'}
              </div>
              <p className="text-center text-2xl font-bold text-gray-800">{formatCurrency(showDetail.amount)}</p>
              <p className="text-center text-sm text-gray-500 mt-1">{showDetail.description}</p>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Tanggal</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.date}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Jenis</span>
                  <span className={`text-sm font-medium ${showDetail.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {showDetail.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-500">Kategori</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.category}</span>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowDetail(null)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-gray-800">Hapus Transaksi?</h3>
            <p className="text-sm text-gray-500 mt-2">Transaksi "<strong>{showDelete.description}</strong>" akan dihapus</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowDelete(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={() => handleDelete(showDelete)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Transaction Modal */}
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            addTransaction(data);
            setShowModal(false);
            showToast('Transaksi berhasil ditambahkan');
          }}
        />
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

function AddTransactionModal({ onClose, onSave }: { onClose: () => void; onSave: (data: { date: string; description: string; type: 'income' | 'expense'; amount: number; category: string }) => void }) {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Iuran');

  const handleSubmit = () => {
    if (!description || !amount) return;
    onSave({
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      description,
      type,
      amount: parseInt(amount),
      category,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-lg text-gray-800">Tambah Transaksi</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Transaksi</label>
            <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Keterangan transaksi" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah (Rp)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
              <option>Iuran</option>
              <option>Kegiatan</option>
              <option>Infrastruktur</option>
              <option>Donasi</option>
              <option>Lainnya</option>
            </select>
          </div>
        </div>
        <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
          <button onClick={handleSubmit} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Simpan</button>
        </div>
      </div>
    </div>
  );
}
