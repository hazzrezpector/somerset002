import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<'pengurus' | 'warga'>('pengurus');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password, activeTab);
      if (!success) {
        setError('Email atau password salah. Silakan coba lagi.');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      const success = login(demoEmail, demoPassword, activeTab);
      if (!success) {
        setError('Login demo gagal. Silakan coba lagi.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <span className="text-4xl">🏘️</span>
          </div>
          <h1 className="text-3xl font-bold text-white">RT Digital</h1>
          <p className="text-emerald-100 mt-2">Sistem Informasi Warga RT 05</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => { setActiveTab('pengurus'); setError(''); }}
              className={`flex-1 py-4 text-sm font-semibold transition-all ${
                activeTab === 'pengurus'
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">👔</span>
              Pengurus RT
            </button>
            <button
              onClick={() => { setActiveTab('warga'); setError(''); }}
              className={`flex-1 py-4 text-sm font-semibold transition-all ${
                activeTab === 'warga'
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">👤</span>
              Warga
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab === 'pengurus' ? 'Login Pengurus' : 'Login Warga'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === 'pengurus'
                  ? 'Masuk untuk mengelola sistem RT'
                  : 'Masuk untuk mengakses layanan warga'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    📧
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={activeTab === 'pengurus' ? 'ketua@rt05.id' : 'dewi@email.com'}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔒
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-sm text-gray-600">Ingat saya</span>
                </label>
                <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Lupa password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>Masuk</>
                )}
              </button>
            </form>

            {/* Demo Login */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center mb-3">
                Akun Demo - Klik untuk login otomatis:
              </p>
              <div className="space-y-2">
                {activeTab === 'pengurus' ? (
                  <>
                    <button
                      onClick={() => handleDemoLogin('ketua@rt05.id', 'ketua123')}
                      className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-emerald-50 rounded-lg text-sm transition-colors border border-gray-100 hover:border-emerald-200"
                    >
                      <span className="font-medium text-gray-700">👔 Ketua RT</span>
                      <span className="text-gray-400 text-xs block">ketua@rt05.id / ketua123</span>
                    </button>
                    <button
                      onClick={() => handleDemoLogin('bendahara@rt05.id', 'bendahara123')}
                      className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-emerald-50 rounded-lg text-sm transition-colors border border-gray-100 hover:border-emerald-200"
                    >
                      <span className="font-medium text-gray-700">💰 Bendahara</span>
                      <span className="text-gray-400 text-xs block">bendahara@rt05.id / bendahara123</span>
                    </button>
                    <button
                      onClick={() => handleDemoLogin('sekretaris@rt05.id', 'sekretaris123')}
                      className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-emerald-50 rounded-lg text-sm transition-colors border border-gray-100 hover:border-emerald-200"
                    >
                      <span className="font-medium text-gray-700">📝 Sekretaris</span>
                      <span className="text-gray-400 text-xs block">sekretaris@rt05.id / sekretaris123</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleDemoLogin('dewi@email.com', 'warga123')}
                      className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-emerald-50 rounded-lg text-sm transition-colors border border-gray-100 hover:border-emerald-200"
                    >
                      <span className="font-medium text-gray-700">👤 Dewi Lestari</span>
                      <span className="text-gray-400 text-xs block">dewi@email.com / warga123</span>
                    </button>
                    <button
                      onClick={() => handleDemoLogin('fitri@email.com', 'warga123')}
                      className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-emerald-50 rounded-lg text-sm transition-colors border border-gray-100 hover:border-emerald-200"
                    >
                      <span className="font-medium text-gray-700">👤 Fitri Handayani</span>
                      <span className="text-gray-400 text-xs block">fitri@email.com / warga123</span>
                    </button>
                    <button
                      onClick={() => handleDemoLogin('gunawan@email.com', 'warga123')}
                      className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-emerald-50 rounded-lg text-sm transition-colors border border-gray-100 hover:border-emerald-200"
                    >
                      <span className="font-medium text-gray-700">👤 Gunawan Wibowo</span>
                      <span className="text-gray-400 text-xs block">gunawan@email.com / warga123</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-emerald-100 text-sm mt-6">
          © 2026 RT 05 Digital - RW 03, Kelurahan Sukamaju
        </p>
      </div>
    </div>
  );
}
