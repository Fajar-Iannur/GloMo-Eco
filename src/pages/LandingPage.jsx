import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setupPaddle } from '../services/paddleConfig';
import Modal from '../components/Modal';

export default function LandingPage() {
  const [paddle, setPaddle] = useState(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isDemoSubmitted, setIsDemoSubmitted] = useState(false);

  useEffect(() => {
    setupPaddle().then((instance) => {
      if (instance) setPaddle(instance);
    });
  }, []);

const handleDemoSubmit = (e) => {
    e.preventDefault();
    setIsDemoSubmitted(true);

    setTimeout(() => {
      setIsDemoOpen(false);
      setIsDemoSubmitted(false);
    }, 3000);
  };

  const handleCheckout = () => {
    if (!paddle) {
      alert("Mesin kasir belum siap, tunggu sebentar!");
      return;
    }

    paddle.Checkout.open({
      items: [
        {
          priceId: 'pri_01ktbfdqexv0qrtkce79p2crab',
          quantity: 1
        }
      ]
    });
  };
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden relative">

      {/* --- BACKGROUND DECORATION (ANIMATED MOTIFS) --- */}

      {/* Daun */}
      <div className="absolute top-20 left-10 md:left-32 opacity-20 animate-float text-green-500 z-0">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C17 8 13 3 8 4C3 5 3 10 3 10C3 10 6 15 11 15C16 15 17 8 17 8ZM11 13C8 13 5 9.5 5 9.5C5 9.5 5 6.5 7.5 6C10 5.5 14 9 14 9C14 9 14 13 11 13Z" /><path d="M12 12L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </div>

      {/* Globe */}
      <div className="absolute top-24 right-10 md:right-24 opacity-15 animate-float-slow text-blue-500 z-0">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
      </div>

      {/* Windmill */}
      <div className="absolute top-1/2 left-4 md:left-16 opacity-10 animate-float text-teal-600 z-0">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10m0 0l4.5-8M12 12L7.5 4m4.5 8v10M10 22h4"></path></svg>
      </div>

      {/* Charger */}
      <div className="absolute top-2/3 right-8 md:right-32 opacity-15 animate-float text-green-600 z-0 rotate-12">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4m8-4v4M5 8h14a2 2 0 0 1 2 2v2a6 6 0 0 1-6 6h-6a6 6 0 0 1-6-6v-2a2 2 0 0 1 2-2zm7 10v4"></path></svg>
      </div>

      {/* Bicycle */}
      <div className="absolute bottom-32 left-10 md:left-32 opacity-20 animate-float-slow text-blue-400 z-0 -rotate-6">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="18.5" cy="17.5" r="3.5"></circle><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"></path></svg>
      </div>

      {/* Cloud */}
      <div className="absolute bottom-1/4 right-1/4 opacity-10 animate-float text-gray-400 z-0">
        <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19C19.985 19 22 16.985 22 14.5 22 12.133 20.177 10.21 17.859 10.021 17.389 6.621 14.394 4 10.8 4 7.037 4 3.966 6.945 3.806 10.67 1.651 11.233 0 13.167 0 15.5 0 18.069 2.158 20 4.8 20H17.5V19Z"></path></svg>
      </div>

      {/* Navbar Minimalis */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto lg:px-8 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded-bl-full rounded-tr-full rounded-tl-sm rounded-br-sm rotate-45"></div>
          <span className="font-bold text-gray-900 text-xl tracking-tight">GloMo Eco</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Features</a>
          <a href="#compliance" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">EU Compliance</a>
          <a href="#pricing" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
            Sign in
          </Link>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center lg:px-8 lg:pt-32 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700 text-xs font-semibold mb-8">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          Ready for EU CSRD Reporting 2026
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.1]">
          Enterprise Carbon Tracking, <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-green-500">
            Simplified for European B2B.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Automate your workforce emission calculations, stay compliant with EU environmental regulations, and seamlessly onboard employees into your sustainability goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCheckout}
            className="w-full sm:w-auto bg-[#3B82F6] hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors shadow-lg shadow-blue-500/30">
            Start Your Subscription
          </button>
          <button
            onClick={() => setIsDemoOpen(true)}
            className="w-full sm:w-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-medium text-lg transition-colors shadow-sm">
            Book a Demo
          </button>
        </div>

        {/* Dekorasi Visual / Mockup Placeholder */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-linear-to-t from-white via-white/50 to-transparent z-10 h-full pointer-events-none"></div>

          <div className="bg-gray-50 border border-gray-200 rounded-t-2xl shadow-2xl overflow-hidden relative z-0">
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            <div className="aspect-video bg-[#F0F4F8] p-8 flex flex-col gap-6">
              <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex gap-6">
                <div className="h-32 flex-1 bg-white rounded-xl border border-gray-200 animate-pulse"></div>
                <div className="h-32 flex-1 bg-white rounded-xl border border-gray-200 animate-pulse"></div>
              </div>
              <div className="h-64 w-full bg-white rounded-xl border border-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
      {/* --- MODAL BOOK A DEMO --- */}
      <Modal 
        isOpen={isDemoOpen} 
        onClose={() => {
          setIsDemoOpen(false);
          setIsDemoSubmitted(false);
        }} 
        title={isDemoSubmitted ? "" : "Book a Live Demo"}
      >
        {isDemoSubmitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
            <p className="text-gray-600 text-sm">
              Thank you! Our team will contact you shortly via email to schedule your personalized demo.
            </p>
          </div>
        ) : (
          // Form input
          <form onSubmit={handleDemoSubmit} className="space-y-4 mt-2">
            <p className="text-sm text-gray-600 mb-4">
              See how GlowMo Eco can help your enterprise track EU B2B carbon emissions seamlessly.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" 
                placeholder="John Doe" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" 
                placeholder="john@company.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white">
                <option>1-50 Employees</option>
                <option>51-200 Employees</option>
                <option>201-500 Employees</option>
                <option>500+ Employees</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-6"
            >
              Request Demo
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}