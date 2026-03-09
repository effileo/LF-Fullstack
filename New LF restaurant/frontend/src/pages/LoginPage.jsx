import React, { useState } from 'react';
import api from '../api/client';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import '../index.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            sessionStorage.setItem('user', JSON.stringify(response.data));
            sessionStorage.setItem('token', response.data.token);

            if (response.data.role === 'SUPER_ADMIN') {
                navigate('/admin/super');
            } else if (response.data.role === 'HOTEL_ADMIN') {
                navigate('/admin/hotel');
            } else {
                navigate('/');
            }
        } catch (err) {
            const msg = err.response?.data?.message;
            const status = err.response?.status;
            if (msg) {
                setError(msg);
            } else if (status === 401) {
                setError('Invalid email or password.');
            } else if (status >= 500) {
                setError('Server error. Please try again later.');
            } else if (!err.response) {
                setError('Cannot reach server. Open your backend URL in a new tab to wake it up, then try again.');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#080706] text-white flex flex-col">
            <Navbar />

            <div
                className="flex-1 flex items-center justify-center p-4 sm:p-6 relative"
                style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(8,7,6,0.95) 50%, #080706 100%), url("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="w-full max-w-[420px] relative">
                    {/* Card */}
                    <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#C3965A] to-transparent" />
                        <p className="text-[#C3965A] text-xs uppercase tracking-[0.2em] font-medium text-center mb-2">
                            LF Collection
                        </p>
                        <h1 className="font-serif text-2xl sm:text-3xl tracking-tight text-white text-center mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                            Welcome Back
                        </h1>

                        {error && (
                            <div className="mb-6 py-3 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium flex items-center gap-2">
                                    <Mail size={14} className="text-[#C3965A]" /> Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="name@example.com"
                                    className="w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-[#C3965A]/60 focus:ring-2 focus:ring-[#C3965A]/20 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium flex items-center gap-2">
                                    <Lock size={14} className="text-[#C3965A]" /> Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3.5 pr-12 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-[#C3965A]/60 focus:ring-2 focus:ring-[#C3965A]/20 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/50 hover:text-white transition-colors"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="text-right">
                                <Link to="/forgot-password" className="text-sm text-[#C3965A] hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl font-medium uppercase tracking-wider bg-[#C3965A] text-black hover:bg-[#d4a96a] focus:outline-none focus:ring-2 focus:ring-[#C3965A] focus:ring-offset-2 focus:ring-offset-[#080706] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:shadow-[#C3965A]/20"
                            >
                                {loading ? 'Signing in…' : 'Sign In'}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-white/60">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[#C3965A] font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    <Link
                        to="/"
                        className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to home
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
