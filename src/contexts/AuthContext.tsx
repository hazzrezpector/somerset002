import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: number;
  name: string;
  role: 'pengurus' | 'warga';
  position?: string;
  address?: string;
  phone: string;
  email: string;
  nik?: string;
  password: string;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
}

interface AppContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string, role: string) => boolean;
  logout: () => void;
  register: (data: RegisterData) => boolean;
  isAuthenticated: boolean;
  updateUser: (updatedUser: User) => void;
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  kasBalance: number;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  nik: string;
}

const AuthContext = createContext<AppContextType | undefined>(undefined);

const initialUsers: User[] = [
  // Pengurus RT
  { id: 1, name: 'Budi Santoso', role: 'pengurus', position: 'Ketua RT', phone: '081234567801', email: 'ketua@rt05.id', password: 'ketua123', address: 'Jl. Melati No. 5', nik: '3201012345670003' },
  { id: 2, name: 'Ratna Dewi', role: 'pengurus', position: 'Bendahara', phone: '081234567802', email: 'bendahara@rt05.id', password: 'bendahara123', address: 'Jl. Mawar No. 10', nik: '3201012345670020' },
  { id: 3, name: 'Eko Prasetyo', role: 'pengurus', position: 'Sekretaris', phone: '081234567803', email: 'sekretaris@rt05.id', password: 'sekretaris123', address: 'Jl. Anggrek No. 3', nik: '3201012345670005' },
  { id: 4, name: 'Ahmad Suryadi', role: 'pengurus', position: 'Seksi Keamanan', phone: '081234567804', email: 'keamanan@rt05.id', password: 'keamanan123', address: 'Jl. Mawar No. 1', nik: '3201012345670001' },
  { id: 5, name: 'Sari Wulandari', role: 'pengurus', position: 'Seksi Sosial', phone: '081234567805', email: 'sosial@rt05.id', password: 'sosial123', address: 'Jl. Dahlia No. 8', nik: '3201012345670030' },
  // Warga
  { id: 6, name: 'Dewi Lestari', role: 'warga', address: 'Jl. Melati No. 5', phone: '081234567893', email: 'dewi@email.com', password: 'warga123', nik: '3201012345670004' },
  { id: 7, name: 'Fitri Handayani', role: 'warga', address: 'Jl. Anggrek No. 7', phone: '081234567895', email: 'fitri@email.com', password: 'warga123', nik: '3201012345670006' },
  { id: 8, name: 'Gunawan Wibowo', role: 'warga', address: 'Jl. Dahlia No. 2', phone: '081234567896', email: 'gunawan@email.com', password: 'warga123', nik: '3201012345670007' },
  { id: 9, name: 'Heni Susanti', role: 'warga', address: 'Jl. Dahlia No. 4', phone: '081234567897', email: 'heni@email.com', password: 'warga123', nik: '3201012345670008' },
  { id: 10, name: 'Irfan Hakim', role: 'warga', address: 'Jl. Kenanga No. 1', phone: '081234567898', email: 'irfan@email.com', password: 'warga123', nik: '3201012345670009' },
];

const initialTransactions: Transaction[] = [
  { id: 1, date: '12 Jan 2026', description: 'Iuran Bulanan - Ahmad Suryadi', type: 'income', amount: 70000, category: 'Iuran' },
  { id: 2, date: '12 Jan 2026', description: 'Iuran Bulanan - Budi Santoso', type: 'income', amount: 70000, category: 'Iuran' },
  { id: 3, date: '11 Jan 2026', description: 'Pembelian bahan kebersihan kerja bakti', type: 'expense', amount: 150000, category: 'Kegiatan' },
  { id: 4, date: '10 Jan 2026', description: 'Iuran Bulanan - Eko Prasetyo', type: 'income', amount: 70000, category: 'Iuran' },
  { id: 5, date: '10 Jan 2026', description: 'Iuran Bulanan - Dewi Lestari', type: 'income', amount: 70000, category: 'Iuran' },
  { id: 6, date: '9 Jan 2026', description: 'Perbaikan lampu jalan', type: 'expense', amount: 200000, category: 'Infrastruktur' },
  { id: 7, date: '8 Jan 2026', description: 'Iuran Bulanan - Fitri Handayani', type: 'income', amount: 70000, category: 'Iuran' },
  { id: 8, date: '7 Jan 2026', description: 'Konsumsi rapat RT', type: 'expense', amount: 75000, category: 'Kegiatan' },
  { id: 9, date: '6 Jan 2026', description: 'Donasi warga untuk perbaikan masjid', type: 'income', amount: 500000, category: 'Donasi' },
  { id: 10, date: '5 Jan 2026', description: 'Iuran Bulanan - Gunawan Wibowo', type: 'income', amount: 70000, category: 'Iuran' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const login = (email: string, password: string, role: string): boolean => {
    const foundUser = users.find(
      u => u.email === email && u.password === password && u.role === role
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (data: RegisterData): boolean => {
    const exists = users.find(u => u.email === data.email);
    if (exists) return false;
    
    const newUser: User = {
      id: users.length + 1,
      name: data.name,
      role: 'warga',
      email: data.email,
      phone: data.phone,
      password: data.password,
      address: data.address,
      nik: data.nik,
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const updateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (user && user.id === updatedUser.id) {
      setUser(updatedUser);
    }
  };

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    setTransactions([{ ...t, id: transactions.length + 1 }, ...transactions]);
  };

  const kasBalance = transactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);

  return (
    <AuthContext.Provider value={{
      user, users, login, logout, register, isAuthenticated: !!user,
      updateUser, transactions, addTransaction, kasBalance
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
