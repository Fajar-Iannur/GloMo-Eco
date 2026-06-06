import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // goes back to login page
      navigate('/login');
    } catch (error) {
      console.error("Gagal logout:", error.message);
      alert("Terjadi kesalahan saat logout.");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-green-500 rounded-bl-full rounded-tr-full rounded-tl-sm rounded-br-sm rotate-45"></div>
        <span className="font-bold text-gray-900 text-lg tracking-tight">GloMo Eco</span>
      </div>

      <div className="flex items-center gap-6">
        {/* Notification */}
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </button>

        {/* Profil and Logout */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            HR
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin Portal</span>
          <button 
            onClick={handleLogout}
            className="ml-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}