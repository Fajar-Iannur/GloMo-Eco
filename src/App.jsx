import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';


// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard (Admin)
import AdminDash from './pages/dashboard/AdminDash';
import EcoMetrics from './pages/dashboard/EcoMetrics';
import EmployeeList from './pages/dashboard/EmployeeList';

// Portal (Employee)
import Onboarding from './pages/portal/Onboarding';

function App() {
  return (
    <Router>
      <Routes>
        {/* === Public lane === */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* === Private lane (login & VIP needed) === */}
        
        {/* HR admin Area */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute requirePremium={true}>
              <AdminDash />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard/eco-metrics" 
          element={
            <ProtectedRoute requirePremium={true}>
              <EcoMetrics />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard/employees" 
          element={
            <ProtectedRoute requirePremium={true}>
              <EmployeeList />
            </ProtectedRoute>
          } 
        />

        {/* Portal Area (employee) */}
        <Route 
          path="/employee-portal" 
          element={
            <ProtectedRoute requirePremium={false}>
              <Onboarding />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;