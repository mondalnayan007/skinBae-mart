import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Secure Authentication Engine Triggered...", formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFF6F6] via-[#FAF6FF] to-[#F1E4FF] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans select-none antialiased">

            {/* ==================================================================
        MAIN CONTAINER (With Ultra-Premium Drop Shadow & Glass Borders)
        ==================================================================
      */}
            <div className="w-full max-w-4xl bg-white rounded-[28px] shadow-[0_32px_64px_-16px_rgba(124,77,255,0.14)] border border-white overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">

                {/* ======================================================== */}
                {/* LEFT COLUMN: Premium Skincare Image Background Panel */}
                {/* ======================================================== */}
                <div
                    className="hidden md:flex md:col-span-5 p-8 flex-col justify-between relative overflow-hidden bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80')`
                    }}
                >
                    {/* Subtle Dark Layer for Text Contrast & Glow */}
                    <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] bg-gradient-to-t from-black/60 via-transparent to-black/20 z-0"></div>

                    {/* Top Brand Logo Node */}
                    <div className="flex items-center gap-2 relative z-10 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 w-fit">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#FF2E63] flex items-center justify-center text-white font-black text-xs">S</span>
                        <span className="text-[10px] font-black tracking-widest uppercase text-white">Skinbae Mart</span>
                    </div>

                    {/* Core Aesthetic Banner Content */}
                    <div className="mt-auto mb-6 relative z-10 text-white">
                        <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight mb-3">
                            Embrace Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] to-[#FFE3E3] underline decoration-[#FF2E63] decoration-2 underline-offset-4">True Glow</span>
                        </h2>
                        <p className="text-[11px] text-gray-200 font-medium leading-relaxed max-w-[220px]">
                            Unlock curated skincare systems, routine builders, and elite membership drops.
                        </p>
                    </div>

                    {/* Bottom Trust Badge */}
                    <div className="text-[9px] font-bold tracking-widest text-gray-300 uppercase relative z-10 flex items-center gap-1">
                        <span className="text-emerald-400 font-bold">✓</span> 100% Certified Skin Wellness
                    </div>
                </div>


                {/* ======================================================== */}
                {/* RIGHT COLUMN: Enhanced Premium Form Panel */}
                {/* ======================================================== */}
                <div className="col-span-1 md:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white relative">

                    {/* Form Header */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-black text-gray-950 tracking-tight">Welcome Back</h3>
                        <p className="text-xs text-gray-400 font-medium mt-1">
                            Log in to manage your premium beauty essentials.
                        </p>
                    </div>

                    {/* Interactive Form Core */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        {/* Ultra-Premium Email Input */}
                        <div className="flex flex-col gap-1.5 group">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-colors group-focus-within:text-[#7C4DFF]">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="name@example.com"
                                    className="w-full h-12 px-4 text-sm font-semibold text-gray-900 border border-gray-200 bg-gray-50/20 rounded-xl focus:outline-none focus:border-[#7C4DFF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,77,255,0.08)] transition-all placeholder:text-gray-300 font-mono tracking-tight"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#7C4DFF] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Ultra-Premium Password Input */}
                        <div className="flex flex-col gap-1.5 group">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-colors group-focus-within:text-[#7C4DFF]">
                                    Password
                                </label>
                                <a href="#forgot" className="text-xs font-bold text-[#7C4DFF] hover:text-[#6236ff] transition-colors tracking-tight">Forgot?</a>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="w-full h-12 pl-4 pr-12 text-sm font-bold text-gray-900 border border-gray-200 bg-gray-50/20 rounded-xl focus:outline-none focus:border-[#7C4DFF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,77,255,0.08)] transition-all placeholder:text-gray-300 font-mono tracking-widest"
                                />
                                {/* Toggle Password Visibility SVG Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me Checkbox Selector */}
                        <div className="flex items-center gap-2.5 mt-1">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 text-[#7C4DFF] border-gray-200 rounded-lg focus:ring-[#7C4DFF] cursor-pointer"
                            />
                            <label htmlFor="remember" className="text-xs text-gray-500 font-bold cursor-pointer select-none">
                                Keep me signed in
                            </label>
                        </div>

                        {/* Submit Control Button */}
                        <button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-[#7C4DFF] to-[#6236ff] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_6px_24px_rgba(124,77,255,0.25)] hover:shadow-[0_6px_30px_rgba(124,77,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all mt-2"
                        >
                            Sign In Securely
                        </button>
                    </form>

                    {/* Social Divider */}
                    <div className="relative my-7 text-center">
                        <hr className="border-gray-100" />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-black tracking-widest text-gray-300 uppercase">OR</span>
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 rounded-xl border border-pink-100 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:border-pink-300 hover:shadow-md hover:bg-pink-50 active:scale-[0.98]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            className="h-5 w-5"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                            />
                            <path
                                fill="#FF3D00"
                                d="M6.3 14.7l6.6 4.8C14.7 15.3 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7z"
                            />
                            <path
                                fill="#4CAF50"
                                d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.6 5.1C9.5 39.6 16.2 44 24 44z"
                            />
                            <path
                                fill="#1976D2"
                                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.9 7.1l6.2 5.2C38.4 37 44 31.1 44 24c0-1.3-.1-2.3-.4-3.5z"
                            />
                        </svg>

                        <span>Continue with Google</span>
                    </button>

                    {/* Bottom Footer Navigation */}
                    <p className="text-center text-xs text-gray-400 font-bold mt-8">
                        New to our circle? <a href="#signup" className="text-[#FF2E63] hover:underline font-black tracking-tight">Create Account</a>
                    </p>

                </div>
            </div>

        </div>
    );
};

export default Login;