import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi ngecek user dan status VIP
    const checkUserStatus = async (currentSession) => {
      const currentUser = currentSession?.user;
      
      setSession(currentSession);
      setUser(currentUser ?? null);

      if (currentUser) {
        // Cek status VIP di database
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('email', currentUser.email)
          .single();

        setIsPremium(subData?.status === 'active');
      } else {
        setIsPremium(false);
      }
      
      setLoading(false);
    };

    // 1. Cek saat pertama kali web dibuka
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkUserStatus(session);
    });

    // 2. Pasang pendengar (listener) kalau user tiba-tiba login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkUserStatus(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Kumpulkan semua state yang mau dibagikan ke komponen lain
  const value = {
    session,
    user,
    isPremium, // SEKARANG SATPAM BISA BACA INI
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};