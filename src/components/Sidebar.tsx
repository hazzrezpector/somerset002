interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'data-warga', label: 'Data Warga', icon: '👥' },
  { id: 'pengumuman', label: 'Pengumuman', icon: '📢' },
  { id: 'kas-rt', label: 'Kas RT', icon: '💰' },
  { id: 'layanan', label: 'Layanan Warga', icon: '📋' },
  { id: 'jadwal', label: 'Jadwal Kegiatan', icon: '📅' },
  { id: 'keamanan', label: 'Keamanan', icon: '🛡️' },
  { id: 'profil', label: 'Profil & Pengaturan', icon: '⚙️' },
];

export default function Sidebar({ activePage, setActivePage, isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Logo */}
      <div className="p-5 border-b border-emerald-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
            🏘️
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">RT Digital</h2>
            <p className="text-emerald-200 text-xs">Sistem Informasi Warga</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
              activePage === item.id
                ? 'bg-white/20 text-white shadow-lg'
                : 'text-emerald-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-emerald-700">
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-xs text-emerald-200">Versi 1.0.0</p>
          <p className="text-xs text-emerald-300 mt-1">© 2026 RT 05 Digital</p>
        </div>
      </div>
    </aside>
  );
}
