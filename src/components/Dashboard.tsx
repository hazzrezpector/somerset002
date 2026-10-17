import { useState } from 'react';

export default function Dashboard() {
  const [showNotif, setShowNotif] = useState(false);
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null);

  const stats = [
    { label: 'Total Warga', value: '248', icon: '👥', color: 'bg-blue-50 text-blue-600', change: '+5' },
    { label: 'Kepala Keluarga', value: '72', icon: '🏠', color: 'bg-emerald-50 text-emerald-600', change: '+2' },
    { label: 'Kas Bulan Ini', value: 'Rp 4.2 Jt', icon: '💰', color: 'bg-amber-50 text-amber-600', change: '+12%' },
    { label: 'Layanan Aktif', value: '8', icon: '📋', color: 'bg-purple-50 text-purple-600', change: '3 baru' },
  ];

  const recentActivities = [
    { text: 'Pak Ahmad membayar iuran bulanan', time: '5 menit lalu', icon: '💳' },
    { text: 'Pengumuman baru: Kerja bakti Minggu', time: '1 jam lalu', icon: '📢' },
    { text: 'Permohonan surat pengantar dari Bu Sari', time: '2 jam lalu', icon: '📝' },
    { text: 'Tamu dilaporkan: Pak Joko (keluarga Bu Ani)', time: '3 jam lalu', icon: '🚗' },
    { text: 'Jadwal poskamling diperbarui', time: '5 jam lalu', icon: '🛡️' },
  ];

  const upcomingEvents = [
    { title: 'Kerja Bakti Bulanan', date: '15 Jan 2026', time: '07:00 WIB' },
    { title: 'Rapat RT Bulanan', date: '20 Jan 2026', time: '19:30 WIB' },
    { title: 'Poskamling Bersama', date: '22 Jan 2026', time: '20:00 WIB' },
    { title: 'Arisan Warga', date: '25 Jan 2026', time: '10:00 WIB' },
  ];

  const quickActions = [
    { id: 'pengumuman', label: 'Buat Pengumuman', icon: '📢', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
    { id: 'kas', label: 'Input Kas', icon: '💰', color: 'bg-amber-50 hover:bg-amber-100 text-amber-700' },
    { id: 'warga', label: 'Tambah Warga', icon: '👤', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' },
    { id: 'tamu', label: 'Laporan Tamu', icon: '🚗', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
  ];

  const notifications = [
    { text: 'Pak Ahmad membayar iuran bulanan', time: '5 menit lalu', read: false },
    { text: 'Permohonan surat dari Bu Sari menunggu persetujuan', time: '1 jam lalu', read: false },
    { text: 'Kerja bakti minggu ini - 45 warga terdaftar', time: '2 jam lalu', read: true },
    { text: 'Lampu jalan Jl. Mawar perlu perbaikan', time: '5 jam lalu', read: true },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-white/10 rounded-full translate-y-1/2"></div>
        <div className="relative">
          <h2 className="text-2xl font-bold">Selamat Datang, Pak Budi! 👋</h2>
          <p className="text-emerald-100 mt-1">Berikut ringkasan kegiatan RT 05 hari ini, Senin 13 Januari 2026</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
              📊 Lihat Laporan
            </button>
            <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-colors">
              📢 Buat Pengumuman
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-lg">Aktivitas Terkini</h3>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">Lihat Semua</button>
          </div>
          <div className="p-5 space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <span className="text-lg mt-0.5">{activity.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-lg">Jadwal Mendatang</h3>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">Lihat Semua</button>
          </div>
          <div className="p-5 space-y-4">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="text-emerald-700 font-bold text-xs text-center leading-tight">
                    {event.date.split(' ')[0]}<br/>{event.date.split(' ')[1]}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-white transition-colors">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 text-lg">Aksi Cepat</h3>
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              🔔
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotif && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                <div className="p-3 border-b border-gray-100">
                  <h4 className="font-bold text-gray-800 text-sm">Notifikasi</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif, idx) => (
                    <div key={idx} className={`p-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-emerald-50/50' : ''}`}>
                      <p className="text-sm text-gray-700">{notif.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => setActiveQuickAction(action.id)}
              className={`p-4 rounded-xl text-center transition-all ${action.color} ${
                activeQuickAction === action.id ? 'ring-2 ring-offset-2 ring-emerald-500 scale-95' : ''
              }`}
            >
              <span className="text-2xl block mb-2">{action.icon}</span>
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Feedback Toast */}
      {activeQuickAction && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce z-50">
          <span>✅</span>
          <span className="text-sm font-medium">
            {activeQuickAction === 'pengumuman' && 'Membuka form pengumuman...'}
            {activeQuickAction === 'kas' && 'Membuka form input kas...'}
            {activeQuickAction === 'warga' && 'Membuka form tambah warga...'}
            {activeQuickAction === 'tamu' && 'Membuka form laporan tamu...'}
          </span>
          <button onClick={() => setActiveQuickAction(null)} className="ml-2 text-gray-400 hover:text-white">✕</button>
        </div>
      )}
    </div>
  );
}
