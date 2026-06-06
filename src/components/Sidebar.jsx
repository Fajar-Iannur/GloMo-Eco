import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#F8FAFC] border-r border-gray-200 flex flex-col">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-6 h-6 bg-green-500 rounded-bl-full rounded-tr-full rounded-tl-sm rounded-br-sm rotate-45"></div>
        <h1 className="font-bold text-gray-800 text-lg">GloMo Eco Hub</h1>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <Link to="/admin-dashboard" className="flex items-center gap-3 bg-blue-50 text-blue-600 px-4 py-2.5 rounded-lg font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
          Dashboard
        </Link>
        
        {/* Nonaktif menu */}
        <Link to="/admin-dashboard/employees" className="flex items-center gap-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          Employees
        </Link>
        
        <a href="#" className="flex items-center gap-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
          Reporting
        </a>
        
        <a href="#" className="flex items-center gap-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Compliance
        </a>
      </nav>
      
      {/* Settings at Bottom */}
      <div className="p-4 border-t border-gray-200">
        <a href="#" className="flex items-center gap-3 text-gray-500 hover:bg-gray-100 px-4 py-2.5 rounded-lg font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          Settings
        </a>
      </div>
    </aside>
  );
}