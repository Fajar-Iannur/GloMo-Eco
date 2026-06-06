import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import EcoChart from '../../components/EcoChart';
import { supabase } from '../../services/supabaseClient';

export default function AdminDash() {
  const [stats, setStats] = useState({ totalEmployees: 0, totalCarbonMT: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const recentActivities = [
    { id: 1, initial: 'BH', name: 'Homart Bookner', time: '30 April, 2026 • 4 hours ago', color: 'bg-blue-100 text-blue-600' },
    { id: 2, initial: 'BR', name: 'Romerron Miana', time: '18 April, 2026 • 5 hours ago', color: 'bg-orange-100 text-orange-600' },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Data from Employee tab
        const { data, error } = await supabase
          .from('Employees')
          .select('emissions_mt');

        if (error) throw error;

        const totalEmp = data.length;

        const totalCarbon = data.reduce((sum, emp) => sum + (Number(emp.emissions_mt) || 0), 0);

        setStats({
          totalEmployees: totalEmp,
          totalCarbonMT: totalCarbon.toFixed(2)
        });
      } catch (err) {
        console.error("Gagal menarik data dashboard:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  const handleCopyLink = () => {
    navigator.clipboard.writeText("http://localhost:5173/employee-portal");
    alert("Link berhasil disalin! Bagikan ke karyawan Anda.");
    setIsInviteOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F0F4F8] font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">HR Admin Dashboard</h1>
              <p className="text-gray-500 text-sm">SaaS platform into European B2B</p>
            </div>
            <button
              onClick={() => setIsInviteOpen(true)}
              className="bg-[#3B82F6] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              Invite New Employee
            </button>
          </div>

          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-6">
              <button className="text-blue-600 border-b-2 border-blue-600 pb-3 font-medium text-sm">Overview</button>
              <button className="text-gray-500 pb-3 font-medium text-sm hover:text-gray-700">News</button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Card 1: Total Employees */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium mb-2">Total Employees Onboarded</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    {isLoading ? '...' : stats.totalEmployees}
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
            </div>

            {/* Card 2: Total Carbon */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-medium mb-2">Total Carbon Est. (MTCO2e)</h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    {isLoading ? '...' : stats.totalCarbonMT}
                  </span>
                </div>
              </div>
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
          </div>

          {/* Chart & Activity List */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-gray-900 font-semibold mb-6">Monthly Carbon Efficiency Trend</h3>
              <div className="h-64">
                <EcoChart />
              </div>
            </div>

            <div className="col-span-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
              <h3 className="text-gray-900 font-semibold mb-6">Recent Activity</h3>
              <div className="space-y-5 flex-1">
                {recentActivities.map((user) => (
                  <div key={user.id} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1 -mx-1 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${user.color}`}>
                        {user.initial}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- OVERLAY & MODAL INVITE --- */}
            {isInviteOpen && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Invite Employee</h3>
                  <p className="text-sm text-gray-500 mb-6">Share this secure link with your employees to start their carbon onboarding process.</p>

                  <div className="flex items-center gap-2 mb-6">
                    <input
                      type="text"
                      readOnly
                      value="http://localhost:5173/employee-portal"
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-600 outline-none"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      Copy
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsInviteOpen(false)}
                      className="text-gray-500 hover:text-gray-700 text-sm font-medium px-4 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* ----------------------------- */}
          </div>
        </main>
      </div>
    </div>
  );
}