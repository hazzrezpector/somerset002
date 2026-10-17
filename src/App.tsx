import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DataWarga from './components/DataWarga';
import Pengumuman from './components/Pengumuman';
import KasRT from './components/KasRT';
import Layanan from './components/Layanan';
import JadwalKegiatan from './components/JadwalKegiatan';
import Keamanan from './components/Keamanan';
import PengurusProfile from './components/PengurusProfile';
import WargaDashboard from './components/WargaDashboard';

function PengurusApp() {
  const { user, logout } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'data-warga': return <DataWarga />;
      case 'pengumuman': return <Pengumuman />;
      case 'kas-rt': return <KasRT />;
      case 'layanan': return <Layanan />;
      case 'jadwal': return <JadwalKegiatan />;
      case 'keamanan': return <Keamanan />;
      case 'profil': return <PengurusProfile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-800">RT 05 Digital</h1>
              <p className="text-xs text-gray-500">RW 03, Kelurahan Sukamaju</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors"
              >
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.position}</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-bold text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.position}</p>
                    <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => { setShowProfile(false); setActivePage('profil'); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                    >
                      <span>👤</span> Profil & Pengaturan
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                      <span>⚙️</span> Pengaturan Umum
                    </button>
                    <button
                      onClick={() => { setShowProfile(false); setShowLogoutConfirm(true); }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                    >
                      <span>🚪</span> Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
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
    </div>
  );
}

function AppContent() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  if (user?.role === 'warga') {
    return <WargaDashboard />;
  }

  return <PengurusApp />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
