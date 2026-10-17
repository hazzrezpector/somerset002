import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function PengurusProfile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState('');
  
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editAddress, setEditAddress] = useState(user?.address || '');
  const [editPassword, setEditPassword] = useState('');
  const [editPosition, setEditPosition] = useState(user?.position || '');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSave = () => {
    if (!user) return;
    const updated = {
      ...user,
      name: editName,
      phone: editPhone,
      email: editEmail,
      address: editAddress,
      position: editPosition,
    };
    if (editPassword) {
      updated.password = editPassword;
    }
    updateUser(updated);
    setIsEditing(false);
    setEditPassword('');
    showToast('Profil berhasil diperbarui!');
  };

  const handleStartEdit = () => {
    setEditName(user?.name || '');
    setEditPhone(user?.phone || '');
    setEditEmail(user?.email || '');
    setEditAddress(user?.address || '');
    setEditPosition(user?.position || '');
    setEditPassword('');
    setIsEditing(true);
  };

  const positionIcon = (pos?: string) => {
    switch (pos) {
      case 'Ketua RT': return '👔';
      case 'Bendahara': return '💰';
      case 'Sekretaris': return '📝';
      case 'Seksi Keamanan': return '🛡️';
      case 'Seksi Sosial': return '🤝';
      default: return '👤';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Profil & Pengaturan</h2>
        <p className="text-gray-500 text-sm">Kelola informasi akun pengurus Anda</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold">{user?.name}</h3>
              <p className="text-emerald-100 flex items-center gap-1">
                <span>{positionIcon(user?.position)}</span>
                {user?.position}
              </p>
              <p className="text-emerald-200 text-sm mt-1">RT 05 - RW 03, Kelurahan Sukamaju</p>
            </div>
          </div>
        </div>

        {/* Info */}
        {!isEditing ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800">Informasi Akun</h4>
              <button
                onClick={handleStartEdit}
                className="text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-1"
              >
                ✏️ Edit Profil
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">👤</span>
                  <span className="text-sm text-gray-500">Nama Lengkap</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{user?.name}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">💼</span>
                  <span className="text-sm text-gray-500">Jabatan</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{user?.position}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📧</span>
                  <span className="text-sm text-gray-500">Email</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📱</span>
                  <span className="text-sm text-gray-500">No. HP</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{user?.phone}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🏠</span>
                  <span className="text-sm text-gray-500">Alamat</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{user?.address || '-'}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🔒</span>
                  <span className="text-sm text-gray-500">Password</span>
                </div>
                <span className="text-sm font-medium text-gray-800">••••••••</span>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Form */
          <div className="p-6">
            <h4 className="font-bold text-gray-800 mb-4">Edit Informasi Akun</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
                <select value={editPosition} onChange={(e) => setEditPosition(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>Ketua RT</option>
                  <option>Bendahara</option>
                  <option>Sekretaris</option>
                  <option>Seksi Keamanan</option>
                  <option>Seksi Sosial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
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
            <div className="flex gap-3 mt-6 justify-end">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={handleSave} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Simpan Perubahan</button>
            </div>
          </div>
        )}
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-bold text-gray-800 mb-4">🔐 Pengaturan Keamanan</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-800">Notifikasi Email</p>
              <p className="text-xs text-gray-500">Terima notifikasi via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-800">Notifikasi WhatsApp</p>
              <p className="text-xs text-gray-500">Terima notifikasi via WhatsApp</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-800">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500">Keamanan ekstra untuk akun Anda</p>
            </div>
            <button className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-200">Aktifkan</button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
        <h4 className="font-bold text-red-700 mb-4">⚠️ Zona Berbahaya</h4>
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
          <div>
            <p className="text-sm font-medium text-gray-800">Hapus Akun</p>
            <p className="text-xs text-gray-500">Tindakan ini tidak dapat dibatalkan</p>
          </div>
          <button
            onClick={() => showToast('Fitur hapus akun dinonaktifkan')}
            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700"
          >
            Hapus Akun
          </button>
        </div>
      </div>

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
