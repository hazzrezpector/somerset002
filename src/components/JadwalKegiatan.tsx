import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  attendees: number;
}

const initialEvents: Event[] = [
  { id: 1, title: 'Kerja Bakti Bulanan', date: '15 Jan 2026', time: '07:00 - 10:00', location: 'Lingkungan RT 05', type: 'Kegiatan', description: 'Kerja bakti membersihkan lingkungan RT', attendees: 45 },
  { id: 2, title: 'Rapat RT Bulanan', date: '20 Jan 2026', time: '19:30 - 21:00', location: 'Balai Warga', type: 'Rapat', description: 'Rapat bulanan membahas program dan evaluasi', attendees: 30 },
  { id: 3, title: 'Poskamling Bersama', date: '22 Jan 2026', time: '20:00 - 05:00', location: 'Pos Security', type: 'Keamanan', description: 'Jadwal poskamling rutin mingguan', attendees: 8 },
  { id: 4, title: 'Arisan Warga', date: '25 Jan 2026', time: '10:00 - 12:00', location: 'Rumah Bu Sari', type: 'Sosial', description: 'Arisan bulanan warga RT 05', attendees: 35 },
  { id: 5, title: 'Pengajian Rutin', date: '28 Jan 2026', time: '19:00 - 20:30', location: 'Musholla Al-Ikhlas', type: 'Keagamaan', description: 'Pengajian rutin mingguan', attendees: 50 },
  { id: 6, title: 'Senam Pagi Bersama', date: '1 Feb 2026', time: '06:00 - 07:00', location: 'Lapangan RT', type: 'Olahraga', description: 'Senam pagi bersama warga', attendees: 25 },
  { id: 7, title: 'Rapat Persiapan 17 Agustus', date: '5 Feb 2026', time: '19:30 - 21:00', location: 'Balai Warga', type: 'Rapat', description: 'Persiapan lomba dan acara HUT RI', attendees: 40 },
];

const scheduleGrid = [
  { day: 'Senin', tasks: ['Ronda malam (Pak Ahmad)'] },
  { day: 'Selasa', tasks: ['Ronda malam (Pak Budi)'] },
  { day: 'Rabu', tasks: ['Ronda malam (Pak Eko)'] },
  { day: 'Kamis', tasks: ['Ronda malam (Pak Gunawan)'] },
  { day: 'Jumat', tasks: ['Ronda malam (Pak Irfan)', 'Pengajian'] },
  { day: 'Sabtu', tasks: ['Ronda malam (Pak Joko)'] },
  { day: 'Minggu', tasks: ['Kerja bakti (jika ada)'] },
];

export default function JadwalKegiatan() {
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState<Event | null>(null);
  const [showDelete, setShowDelete] = useState<Event | null>(null);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [events, setEvents] = useState(initialEvents);
  const [toast, setToast] = useState('');

  const typeColors: Record<string, string> = {
    'Kegiatan': 'bg-emerald-100 text-emerald-700',
    'Rapat': 'bg-blue-100 text-blue-700',
    'Keamanan': 'bg-red-100 text-red-700',
    'Sosial': 'bg-purple-100 text-purple-700',
    'Keagamaan': 'bg-amber-100 text-amber-700',
    'Olahraga': 'bg-cyan-100 text-cyan-700',
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (event: Event) => {
    setEvents(events.filter(e => e.id !== event.id));
    setShowDelete(null);
    showToast('Jadwal kegiatan berhasil dihapus');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Jadwal Kegiatan</h2>
          <p className="text-gray-500 text-sm">Kalender kegiatan dan jadwal rutin RT 05</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setView('list')}
              className={`px-3 py-2 text-sm font-medium ${view === 'list' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
            >
              📋 List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-2 text-sm font-medium ${view === 'calendar' ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
            >
              📅 Kalender
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <span>+</span> Tambah Jadwal
          </button>
        </div>
      </div>

      {/* Poskamling Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-4">📋 Jadwal Ronda / Poskamling</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {scheduleGrid.map(day => (
            <div key={day.day} className="bg-gray-50 rounded-xl p-3 text-center hover:bg-emerald-50 transition-colors cursor-pointer">
              <p className="font-bold text-gray-700 text-sm">{day.day}</p>
              <div className="mt-2 space-y-1">
                {day.tasks.map((task, i) => (
                  <p key={i} className="text-xs text-gray-500 bg-white rounded-lg px-2 py-1">{task}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      {view === 'list' ? (
        <div className="space-y-3">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex flex-col items-center justify-center text-emerald-700 shrink-0 cursor-pointer" onClick={() => setShowDetail(event)}>
                  <span className="text-xs font-medium">{event.date.split(' ')[1]}</span>
                  <span className="text-lg font-bold leading-tight">{event.date.split(' ')[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-gray-800">{event.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[event.type] || 'bg-gray-100 text-gray-600'}`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <span className="text-xs text-gray-400">🕐 {event.time}</span>
                    <span className="text-xs text-gray-400">📍 {event.location}</span>
                    <span className="text-xs text-gray-400">👥 {event.attendees} peserta</span>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setShowDetail(event)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600" title="Detail">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button onClick={() => setShowModal(true)} className="p-2 rounded-lg hover:bg-amber-50 text-amber-600" title="Edit">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => setShowDelete(event)} className="p-2 rounded-lg hover:bg-red-50 text-red-600" title="Hapus">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Calendar View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Januari 2026</h3>
            <div className="flex gap-1">
              <button className="p-2 rounded-lg hover:bg-gray-100">←</button>
              <button className="p-2 rounded-lg hover:bg-gray-100">→</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (
              <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
            ))}
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const hasEvent = events.some(e => parseInt(e.date) === day);
              const isToday = day === 13;
              return (
                <div
                  key={day}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm cursor-pointer transition-colors ${
                    isToday ? 'bg-emerald-600 text-white font-bold' :
                    hasEvent ? 'bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-100' :
                    'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    if (hasEvent) {
                      const event = events.find(e => parseInt(e.date) === day);
                      if (event) setShowDetail(event);
                    }
                  }}
                >
                  <span>{day}</span>
                  {hasEvent && !isToday && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-0.5"></span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Detail Kegiatan</h3>
              <button onClick={() => setShowDetail(null)} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex flex-col items-center justify-center text-emerald-700">
                  <span className="text-xs font-medium">{showDetail.date.split(' ')[1]}</span>
                  <span className="text-lg font-bold">{showDetail.date.split(' ')[0]}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{showDetail.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[showDetail.type]}`}>{showDetail.type}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{showDetail.description}</p>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Waktu</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.time}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Lokasi</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.location}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-500">Peserta</span>
                  <span className="text-sm font-medium text-gray-800">{showDetail.attendees} orang</span>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowDetail(null)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Tutup</button>
              <button onClick={() => { setShowDetail(null); setShowModal(true); }} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Edit</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">⚠️</div>
            <h3 className="text-lg font-bold text-gray-800">Hapus Jadwal?</h3>
            <p className="text-sm text-gray-500 mt-2">Jadwal "<strong>{showDelete.title}</strong>" akan dihapus</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowDelete(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={() => handleDelete(showDelete)} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium">Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Tambah Jadwal Kegiatan</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kegiatan</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama kegiatan" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                  <input type="date" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
                  <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="07:00 - 10:00" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <input type="text" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Lokasi kegiatan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kegiatan</label>
                <select className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>Kegiatan</option>
                  <option>Rapat</option>
                  <option>Keamanan</option>
                  <option>Sosial</option>
                  <option>Keagamaan</option>
                  <option>Olahraga</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" rows={3} placeholder="Deskripsi kegiatan" />
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 font-medium">Batal</button>
              <button onClick={() => { setShowModal(false); showToast('Jadwal kegiatan berhasil ditambahkan'); }} className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium">Simpan</button>
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
