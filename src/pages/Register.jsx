import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        // Tembak fungsi bawaan Supabase untuk bikin akun baru
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
        } else {
            alert("Akun berhasil dibuat! Mengalihkan ke dashboard...");
            // Secara default, setelah signup Supabase akan otomatis me-login-kan user.
            // Kita langsung arahkan ke dashboard admin, nanti satpam kita yang nentuin dia udah bayar atau belum.
            navigate('/admin-dashboard');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Gunakan email yang sama saat Anda melakukan pembayaran
                    </p>
                </div>

                {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                        {errorMsg}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                required
                                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm mt-1"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                required
                                className="relative block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm mt-1"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}