import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  role: 'pengurus' | 'warga';
  position?: string;
  address?: string;
  phone: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers = [
  // Pengurus RT
  { id: 1, name: 'Budi Santoso', role: 'pengurus' as const, position: 'Ketua RT', phone: '081234567801', email: 'ketua@rt05.id', password: 'ketua123' },
  { id: 2, name: 'Ratna Dewi', role: 'pengurus' as const, position: 'Bendahara', phone: '081234567802', email: 'bendahara@rt05.id', password: 'bendahara123' },
  { id: 3, name: 'Eko Prasetyo', role: 'pengurus' as const, position: 'Sekretaris', phone: '081234567803', email: 'sekretaris@rt05.id', password: 'sekretaris123' },
  { id: 4, name: 'Ahmad Suryadi', role: 'pengurus' as const, position: 'Seksi Keamanan', phone: '081234567804', email: 'keamanan@rt05.id', password: 'keamanan123' },
  { id: 5, name: 'Sari Wulandari', role: 'pengurus' as const, position: 'Seksi Sosial', phone: '081234567805', email: 'sosial@rt05.id', password: 'sosial123' },
  
  // Warga
  { id: 6, name: 'Dewi Lestari', role: 'warga' as const, address: 'Jl. Melati No. 5', phone: '081234567893', email: 'dewi@email.com', password: 'warga123' },
  { id: 7, name: 'Fitri Handayani', role: 'warga' as const, address: 'Jl. Anggrek No. 7', phone: '081234567895', email: 'fitri@email.com', password: 'warga123' },
  { id: 8, name: 'Gunawan Wibowo', role: 'warga' as const, address: 'Jl. Dahlia No. 2', phone: '081234567896', email: 'gunawan@email.com', password: 'warga123' },
  { id: 9, name: 'Heni Susanti', role: 'warga' as const, address: 'Jl. Dahlia No. 4', phone: '081234567897', email: 'heni@email.com', password: 'warga123' },
  { id: 10, name: 'Irfan Hakim', role: 'warga' as const, address: 'Jl. Kenanga No. 1', phone: '081234567898', email: 'irfan@email.com', password: 'warga123' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: string): boolean => {
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password && u.role === role
    );
    
    if (foundUser) {
      const { password: _, ...userData } = foundUser;
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
