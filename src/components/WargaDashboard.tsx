import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function WargaDashboard() {
  const { user, logout, updateUser, kasBalance, addTransaction } = useAuth();
  const [activePage, setActivePage] = useState('beranda');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPayConfirm, setShowPayConfirm] = useState(false);
  const [toast, setToast] = useState('');

  // Edit profile state
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editAddress, setEditAddress] = useState(user?.address || '');
  const [editPassword, setEditPassword] = useState('');

  const IURAN_AMOUNT = 70000;

  const menuItems = [
    { id: 'beranda', label: 'Beranda', icon: '🏠' },
    { id: 'pengumuman', label: 'Pengumuman', icon: '📢' },
    { id: 'layanan', label: 'Layanan Saya', icon: '📋' },
    { id: 'iuran', label: 'Iuran Saya', icon: '💳' },
    { id: 'jadwal', label: 'Jadwal Kegiatan', icon: '📅' },
    { id: 'profil', label: 'Profil Saya', icon: '👤' },
  ];

  const notifications = [
    { text: 'Kerja bakti akan dilaksanakan Minggu ini', time: '1 jam lalu', read: false },
    { text: 'Iuran bulan Januari sudah diterima', time: '2 jam lalu', read: false },
    { text: 'Surat pengantar Anda sedang diproses', time: '5 jam lalu', read: true },
  ];

  const announcements = [
    { title: 'Kerja Bakti Bulanan - Januari 2026', date: '10 Jan 2026', category: 'Kegiatan', pinned: true, content: 'Diberitahukan kepada seluruh warga RT 05 untuk mengikuti kerja bakti bulanan pada hari Minggu, 15 Januari 2026 pukul 07.00 WIB.' },
    { title: 'Pembayaran Iuran Bulanan', date: '8 Jan 2026', category: 'Iuran', pinned: true, content: `Diharapkan seluruh warga untuk segera membayar iuran bulanan bulan Januari sebesar Rp ${IURAN_AMOUNT.toLocaleString('id-ID')}/KK.` },
    { title: 'Perbaikan Jalan Lingkungan', date: '7 Jan 2026', category: 'Infrastruktur', pinned: false, content: 'Mulai tanggal 12 Januari akan dilakukan perbaikan jalan di Jl. Mawar.' },
    { title: 'Program Posyandu Bulan Januari', date: '3 Jan 2026', category: 'Kesehatan', pinned: false, content: 'Jadwal posyandu: Tgl 18 balita, tgl 19 ibu hamil, tgl 20 lansia.' },
  ];

  const myServices = [
    { id: 1, type: 'Surat Keterangan Domisili', status: 'processing', date: '11 Jan 2026', desc: 'Surat keterangan domisili untuk keperluan bank' },
    { id: 2, type: 'Surat Pengantar Nikah', status: 'completed', date: '10 Jan 2026', desc: 'Surat pengantar untuk pendaftaran nikah di KUA' },
  ];

  const paymentHistory = [
    { month: 'Desember 2025', date: '5 Des 2025', amount: IURAN_AMOUNT, status: 'paid' },
    { month: 'November 2025', date: '3 Nov 2025', amount: IURAN_AMOUNT, status: 'paid' },
    { month: 'Oktober 2025', date: '7 Okt 2025', amount: IURAN_AMOUNT, status: 'paid' },
    { month: 'September 2025', date: '2 Sep 2025', amount: IURAN_AMOUNT, status: 'paid' },
  ];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handlePayIuran = () => {
    addTransaction({
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      description: `Iuran Bulanan - ${user?.name}`,
      type: 'income',
      amount: IURAN_AMOUNT,
      category: 'Iuran',
    });
    setShowPayConfirm(false);
    showToast(`Pembayaran iuran Rp ${IURAN_AMOUNT.toLocaleString('id-ID')} berhasil!`);
  };

  const handleSaveProfile = () => {
    if (!user) return;
    const updated = { ...user, name: editName, phone: editPhone, address: editAddress };
    if (editPassword) updated.password = editPassword;
    updateUser(updated);
    setShowEditProfile(false);
    setEditPassword('');
    showToast('Profil berhasil diperbarui!');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'beranda':
        return (
          <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative">
                <h2 className="text-2xl font-bold">Halo, {user?.name}! 👋</h2>
                <p className="text-emerald-100 mt-1">Selamat datang di RT Digital. Semoga hari Anda menyenangkan!</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button onClick={() => setActivePage('layanan')} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                    📋 Ajukan Layanan
                  </button>
                  <button onClick={() => setActivePage('iuran')} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                    💳 Bayar Iuran
                  </button>
                </div>
              </div>
            </div>

            {/* Kas RT Dashboard */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800">💰 Saldo Kas RT</h3>
                <span className="text-xs text-gray-400">Update realtime</span>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Total Saldo Kas RT 05</p>
                <p className="text-3xl font-bold text-emerald-700 mt-1">{formatCurrency(kasBalance)}</p>
                <p className="text-xs text-gray-500 mt-2">Dikelola oleh Bendahara RT 05 • Per Januari 2026</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-500">Pemasukan</p>
                  <p className="text-sm font-bold text-green-700">Januari</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-500">Warga Aktif</p>
                  <p className="text-sm font-bold text-blue-700">248 orang</p>
                </div>
                <div className="text-center p-2 bg-amber-50 rounded-lg">
                  <p className="text-xs text-gray-500">Iuran/Bulan</p>
                  <p className="text-sm font-bold text-amber-700">{formatCurrency(IURAN_AMOUNT)}</p>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <span className="text-lg">💰</span>
                <p className="text-lg font-bold text-gray-800 mt-1">{formatCurrency(IURAN_AMOUNT)}</p>
                <p className="text-xs text-gray-500">Iuran Bulan Ini</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <span className="text-lg">📋</span>
                <p className="text-lg font-bold text-gray-800 mt-1">2</p>
                <p className="text-xs text-gray-500">Layanan Aktif</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm col-span-2 sm:col-span-1">
                <span className="text-lg">📢</span>
                <p className="text-lg font-bold text-gray-800 mt-1">4</p>
                <p className="text-xs text-gray-500">Pengumuman Baru</p>
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">Pengumuman Terbaru</h3>
                <button onClick={() => setActivePage('pengumuman')} className="text-sm text-emerald-600 font-medium hover:text-emerald-700">Lihat Semua →</button>
              </div>
              <div className="p-5 space-y-4">
                {announcements.slice(0, 3).map((ann, idx) => (
                  <div key={idx} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg -m-2 transition-colors">
                    <span className="text-lg mt-0.5">{ann.pinned ? '📌' : '📢'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm">{ann.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{ann.date} • {ann.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Services Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">Layanan Saya</h3>
                <button onClick={() => setActivePage('layanan')} className="text-sm text-emerald-600 font-medium hover:text-emerald-700">Lihat Semua →</button>
              </div>
              <div className="p-5 space-y-3">
                {myServices.map(svc => (
                  <div key={svc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                      svc.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {svc.status === 'completed' ? '✅' : '⏳'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm">{svc.type}</p>
                      <p className="text-xs text-gray-400">{svc.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      svc.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {svc.status === 'completed' ? 'Selesai' : 'Diproses'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'pengumuman':
        return (
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Pengumuman</h2>
              <p className="text-gray-500 text-sm">Informasi terbaru dari pengurus RT</p>
            </div>
            {announcements.map((ann, idx) => (
              <div key={idx} className={`bg-white rounded-xl shadow-sm border p-5 ${ann.pinned ? 'border-emerald-200' : 'border-gray-100'}`}>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  {ann.pinned && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">📌 Disematkan</span>}
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ann.category}</span>
                </div>
                <h3 className="font-bold text-gray-800">{ann.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{ann.content}</p>
                <p className="text-xs text-gray-400 mt-3">{ann.date}</p>
              </div>
            ))}
          </div>
        );

      case 'layanan':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Layanan Saya</h2>
                <p className="text-gray-500 text-sm">Riwayat dan status layanan Anda</p>
              </div>
              <button onClick={() => showToast('Fitur ajukan layanan baru')} className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors text-sm">
                + Ajukan Baru
              </button>
            </div>
            <div className="space-y-3">
              {myServices.map(svc => (
                <div key={svc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      svc.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {svc.status === 'completed' ? '✅' : '⏳'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm">{svc.type}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{svc.desc}</p>
                      <p className="text-xs text-gray-400 mt-1">{svc.date}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      svc.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {svc.status === 'completed' ? 'Selesai' : 'Diproses'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'iuran':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Iuran Saya</h2>
              <p className="text-gray-500 text-sm">Status pembayaran iuran bulanan</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative">
                <p className="text-emerald-100 text-sm">Iuran Bulan Ini</p>
                <p className="text-3xl font-bold mt-1">{formatCurrency(IURAN_AMOUNT)}</p>
                <p className="text-emerald-200 text-sm mt-2">Jatuh tempo: 15 Januari 2026</p>
                <button
                  onClick={() => setShowPayConfirm(true)}
                  className="mt-4 bg-white text-emerald-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
                >
                  💳 Bayar Sekarang
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div>
                <p className="text-sm font-medium text-amber-800">Info Pembayaran</p>
                <p className="text-xs text-amber-700 mt-1">Pembayaran akan otomatis tercatat di Kas RT dan dapat dilihat oleh Bendahara</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Riwayat Pembayaran</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {paymentHistory.map((payment, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-sm">✅</div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{payment.month}</p>
                        <p className="text-xs text-gray-400">Dibayar tgl {payment.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{formatCurrency(payment.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'jadwal':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Jadwal Kegiatan</h2>
              <p className="text-gray-500 text-sm">Kegiatan yang akan datang</p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Kerja Bakti Bulanan', date: '15 Jan 2026', time: '07:00', location: 'Lingkungan RT' },
                { title: 'Arisan Warga', date: '25 Jan 2026', time: '10:00', location: 'Rumah Bu Sari' },
                { title: 'Pengajian Rutin', date: '28 Jan 2026', time: '19:00', location: 'Musholla Al-Ikhlas' },
                { title: 'Senam Pagi Bersama', date: '1 Feb 2026', time: '06:00', location: 'Lapangan RT' },
              ].map((event, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex flex-col items-center justify-center text-emerald-700 shrink-0">
                    <span className="text-xs font-medium">{event.date.split(' ')[1]}</span>
                    <span className="text-lg font-bold">{event.date.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{event.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">🕐 {event.time} WIB • 📍 {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profil':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Profil Saya</h2>
              <p className="text-gray-500 text-sm">Informasi data diri Anda</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-2xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{user?.name}</h3>
                  <p className="text-sm text-gray-500">Warga RT 05</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-medium text-gray-800">{user?.email}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">No. HP</span>
                  <span className="text-sm font-medium text-gray-800">{user?.phone}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-500">NIK</span>
                  <span className="text-sm font-medium text-gray-800">{user?.nik || '-'}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm text-gray-500">Alamat</span>
                  <span className="text-sm font-medium text-gray-800">{user?.address || '-'}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditName(user?.name || '');
                  setEditPhone(user?.phone || '');
                  setEditAddress(user?.address || '');
                  setEditPassword('');
                  setShowEditProfile(true);
                }}
                className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
              >
                ✏️ Edit Profil
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-5 border-b border-emerald-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">🏘️</div>
            <div>
              <h2 className="font-bold text-lg leading-tight">RT Digital</h2>
              <p className="text-emerald-200 text-xs">Portal Warga</p>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActivePage(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                activePage === item.id ? 'bg-white/20 text-white' : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-emerald-700">
          <button onClick={() => setShowLogoutConfirm(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/20 transition-all">
            <span>🚪</span>
            <span className="font-medium text-sm">Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-800">Portal Warga</h1>
              <p className="text-xs text-gray-500">RT 05 - RW 03, Kelurahan Sukamaju</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 rounded-lg hover:bg-gray-100">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              {showNotif && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                  <div className="p-3 border-b border-gray-100">
                    <h4 className="font-bold text-gray-800 text-sm">Notifikasi</h4>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif, idx) => (
                      <div key={idx} className={`p-3 border-b border-gray-50 ${!notif.read ? 'bg-emerald-50/50' : ''}`}>
                        <p className="text-sm text-gray-700">{notif.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setEditName(user?.name || '');
                setEditPhone(user?.phone || '');
                setEditAddress(user?.address || '');
                setEditPassword('');
                setShowEditProfile(true);
              }}
              className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors"
            >
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.charAt(0)}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Edit Profil</h3>
              <button onClick={() => setShowEditProfile(false)} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                <input type="text" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <textarea value={editAddress} onChange={(e) => setEditAddress(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" rows={2} />
              </div>
              <div className="pt-3 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru <span className="text-gray-400">(kosongkan jika tidak diubah)</span></label>
                <input type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Password baru" />
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowEditProfile(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={handleSaveProfile} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Pay Confirmation Modal */}
      {showPayConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">💳</div>
            <h3 className="text-lg font-bold text-gray-800">Konfirmasi Pembayaran</h3>
            <p className="text-sm text-gray-500 mt-2">Bayar iuran bulanan bulan Januari 2026</p>
            <p className="text-2xl font-bold text-emerald-600 mt-3">{formatCurrency(IURAN_AMOUNT)}</p>
            <div className="bg-gray-50 rounded-xl p-3 mt-4 text-left">
              <p className="text-xs text-gray-500">Pembayaran akan otomatis tercatat di Kas RT</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowPayConfirm(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={handlePayIuran} className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Bayar</button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🚪</div>
            <h3 className="text-lg font-bold text-gray-800">Keluar dari Aplikasi?</h3>
            <p className="text-sm text-gray-500 mt-2">Anda akan kembali ke halaman login</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={logout} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium">Ya, Keluar</button>
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
