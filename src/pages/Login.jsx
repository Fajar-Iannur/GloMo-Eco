import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { signIn } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      // ca;;inmg supabase
      const { error } = await signIn(email, password);
      
      if (error) {
        setErrorMsg(error.message);
        setIsLoading(false);
        return; 
      }

      if (email.includes('admin')) {
        navigate('/admin-dashboard');
      } else {
        navigate('/employee-portal');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan yang tidak terduga.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      
      {/* left form login */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 bg-white">
        <div className="max-w-md w-full mx-auto">
          
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 bg-green-500 rounded-bl-full rounded-tr-full rounded-tl-sm rounded-br-sm rotate-45"></div>
            <span className="font-bold text-gray-900 text-xl">SustainaTrack Hub</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-500 text-sm mb-8">Please enter your details to sign in.</p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Error notif */}
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
                {errorMsg}
              </div>
            )}

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600" />
                <span className="text-sm text-gray-600">Remember for 30 days</span>
              </label>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#3B82F6] hover:bg-blue-600 disabled:bg-blue-400 flex justify-center items-center text-white py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm mt-4"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

        </div>
      </div>

      {/* branding area */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F172A] relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30"></div>
        
        <div className="relative z-10 mt-10">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Track, report, and <br/> reduce your company's <br/> carbon footprint.
          </h2>
          <p className="text-gray-400 text-lg max-w-md">
            The all-in-one platform designed for European B2B compliance and sustainable workforce management.
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md">
          <p className="text-white text-sm leading-relaxed mb-4">
            "SustainaTrack Hub has completely transformed how we calculate our hybrid-work emissions. The employee onboarding is seamless."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
              ED
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Elena Dubois</p>
              <p className="text-gray-400 text-xs">Sustainability Director, TechCorp EU</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}