export default function Dashboard() {
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

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold">Selamat Datang, Pak Budi! 👋</h2>
        <p className="text-emerald-100 mt-1">Berikut ringkasan kegiatan RT 05 hari ini, Senin 13 Januari 2026</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
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
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg">Aktivitas Terkini</h3>
          </div>
          <div className="p-5 space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
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
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg">Jadwal Mendatang</h3>
          </div>
          <div className="p-5 space-y-4">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 transition-colors">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="text-emerald-700 font-bold text-xs text-center leading-tight">
                    {event.date.split(' ')[0]}<br/>{event.date.split(' ')[1]}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Buat Pengumuman', icon: '📢', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
            { label: 'Input Kas', icon: '💰', color: 'bg-amber-50 hover:bg-amber-100 text-amber-700' },
            { label: 'Tambah Warga', icon: '👤', color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700' },
            { label: 'Laporan Tamu', icon: '🚗', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
          ].map((action) => (
            <button
              key={action.label}
              className={`p-4 rounded-xl text-center transition-colors ${action.color}`}
            >
              <span className="text-2xl block mb-2">{action.icon}</span>
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
