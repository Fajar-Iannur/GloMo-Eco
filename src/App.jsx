import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

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

        {/* === Private lane (login & VIP needed) === */}
        
        {/* HR admin Area */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDash />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard/eco-metrics" 
          element={
            <ProtectedRoute>
              <EcoMetrics />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-dashboard/employees" 
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          } 
        />

        {/* Portal Area (employee) */}
        <Route 
          path="/employee-portal" 
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;