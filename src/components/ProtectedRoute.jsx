import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requirePremium = false }) {
  const { user, isPremium, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requirePremium && !isPremium) {
    alert("Maaf, area ini khusus Admin VIP. Silakan berlangganan dulu!"); 
    return <Navigate to="/" replace />; 
  }

  return children;
}