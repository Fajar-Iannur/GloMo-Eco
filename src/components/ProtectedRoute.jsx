import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, isPremium } = useAuth();

  // login needed
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isPremium) {
    alert("Bosku belum langganan VIP nih. Silakan Start Free Trial dulu ya!"); 
    return <Navigate to="/" replace />; 
  }

  return children;
}