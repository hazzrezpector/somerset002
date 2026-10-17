import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function WargaDashboard() {
  const { user, logout } = useAuth();
  const [activePage, setActivePage] = useState('beranda');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  // Warga menu items
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
    { title: 'Pembayaran Iuran Bulanan', date: '8 Jan 2026', category: 'Iuran', pinned: true, content: 'Diharapkan seluruh warga untuk segera membayar iuran bulanan bulan Januari sebesar Rp 50.000/KK.' },
    { title: 'Perbaikan Jalan Lingkungan', date: '7 Jan 2026', category: 'Infrastruktur', pinned: false, content: 'Mulai tanggal 12 Januari akan dilakukan perbaikan jalan di Jl. Mawar.' },
    { title: 'Program Posyandu Bulan Januari', date: '3 Jan 2026', category: 'Kesehatan', pinned: false, content: 'Jadwal posyandu: Tgl 18 balita, tgl 19 ibu hamil, tgl 20 lansia.' },
  ];

  const myServices = [
    { id: 1, type: 'Surat Keterangan Domisili', status: 'processing', date: '11 Jan 2026', desc: 'Surat keterangan domisili untuk keperluan bank' },
    { id: 2, type: 'Surat Pengantar Nikah', status: 'completed', date: '10 Jan 2026', desc: 'Surat pengantar untuk pendaftaran nikah di KUA' },
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'beranda':
        return (
          <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold">Halo, {user?.name}! 👋</h2>
              <p className="text-emerald-100 mt-1">Selamat datang di RT Digital. Semoga hari Anda menyenangkan!</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                  📋 Ajukan Layanan
                </button>
                <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
                  💳 Bayar Iuran
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <span className="text-lg">💰</span>
                <p className="text-lg font-bold text-gray-800 mt-1">Rp 50.000</p>
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
                <button onClick={() => setActivePage('pengumuman')} className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                  Lihat Semua →
                </button>
              </div>
              <div className="p-5 space-y-4">
                {announcements.slice(0, 3).map((ann, idx) => (
                  <div key={idx} className="flex items-start gap-3">
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
                <button onClick={() => setActivePage('layanan')} className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                  Lihat Semua →
                </button>
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
              <button className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors text-sm">
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
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
              <p className="text-emerald-100 text-sm">Iuran Bulan Ini</p>
              <p className="text-3xl font-bold mt-1">Rp 50.000</p>
              <p className="text-emerald-200 text-sm mt-2">Jatuh tempo: 15 Januari 2026</p>
              <button className="mt-4 bg-white text-emerald-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
                💳 Bayar Sekarang
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Riwayat Pembayaran</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {['Desember 2025', 'November 2025', 'Oktober 2025', 'September 2025'].map((month, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 text-sm">✅</div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{month}</p>
                        <p className="text-xs text-gray-400">Dibayar tgl {5 + idx} {month.split(' ')[1]}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">Rp 50.000</span>
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
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4">
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
                  <span className="text-sm text-gray-500">Alamat</span>
                  <span className="text-sm font-medium text-gray-800">{user?.address}</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors">
                Edit Profil
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
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/20 transition-all">
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.charAt(0)}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
