import React, { useState } from 'react';
import api from '../api/client';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Lock, Mail, User, Phone, MapPin, Briefcase, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import '../index.css';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [job, setJob] = useState('');
    const [image, setImage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/auth/signup', {
                name, email, password, phone, address, gender, age, job, image
            });
            sessionStorage.setItem('user', JSON.stringify(response.data));
            sessionStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (err) {
            const msg = err.response?.data?.message;
            const status = err.response?.status;
            if (msg) {
                setError(msg);
            } else if (status === 400) {
                setError('Invalid input or user already exists.');
            } else if (status >= 500) {
                setError('Server error. Please try again later.');
            } else {
                setError('Signup failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3.5 rounded-xl border border-white/15 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-[#C3965A]/60 focus:ring-2 focus:ring-[#C3965A]/20 transition-all";
    const labelClass = "block text-xs uppercase tracking-wider text-white/60 mb-2 font-medium flex items-center gap-2";
    const iconClass = "text-[#C3965A]";

    return (
        <main className="min-h-screen bg-[#080706] text-white flex flex-col">
            <Navbar />

            <div
                className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 relative"
                style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(8,7,6,0.95) 40%, #080706 100%), url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="w-full max-w-[560px] relative">
                    <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-gradient-to-r from-transparent via-[#C3965A] to-transparent" />
                        <p className="text-[#C3965A] text-xs uppercase tracking-[0.2em] font-medium text-center mb-2">
                            LF Collection
                        </p>
                        <h1 className="font-serif text-2xl sm:text-3xl tracking-tight text-white text-center mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                            Create Account
                        </h1>

                        {error && (
                            <div className="mb-6 py-3 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="sm:col-span-2">
                                    <label className={labelClass}><User size={14} className={iconClass} /> Profile image URL (optional)</label>
                                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." className={inputClass} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={labelClass}><User size={14} className={iconClass} /> Full name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" className={inputClass} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={labelClass}><Mail size={14} className={iconClass} /> Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@example.com" className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}><Phone size={14} className={iconClass} /> Phone</label>
                                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+251..." className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}><User size={14} className={iconClass} /> Age</label>
                                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" className={inputClass} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={labelClass}><MapPin size={14} className={iconClass} /> Address</label>
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Addis Ababa, Bole" className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}><User size={14} className={iconClass} /> Gender</label>
                                    <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputClass}>
                                        <option value="">Select</option>
                                        <option value="Male" className="bg-[#111] text-white">Male</option>
                                        <option value="Female" className="bg-[#111] text-white">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClass}><Briefcase size={14} className={iconClass} /> Job</label>
                                    <input type="text" value={job} onChange={(e) => setJob(e.target.value)} placeholder="Software Engineer" className={inputClass} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className={labelClass}><Lock size={14} className={iconClass} /> Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="••••••••"
                                            className={`${inputClass} pr-12`}
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
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl font-medium uppercase tracking-wider bg-[#C3965A] text-black hover:bg-[#d4a96a] focus:outline-none focus:ring-2 focus:ring-[#C3965A] focus:ring-offset-2 focus:ring-offset-[#080706] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:shadow-[#C3965A]/20"
                            >
                                {loading ? 'Creating account…' : 'Sign Up'}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-white/60">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#C3965A] font-medium hover:underline">
                                Sign in
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

export default SignupPage;
