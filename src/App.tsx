import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DataWarga from './components/DataWarga';
import Pengumuman from './components/Pengumuman';
import KasRT from './components/KasRT';
import Layanan from './components/Layanan';
import JadwalKegiatan from './components/JadwalKegiatan';
import Keamanan from './components/Keamanan';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'data-warga': return <DataWarga />;
      case 'pengumuman': return <Pengumuman />;
      case 'kas-rt': return <KasRT />;
      case 'layanan': return <Layanan />;
      case 'jadwal': return <JadwalKegiatan />;
      case 'keamanan': return <Keamanan />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                P
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">Pak Budi</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
