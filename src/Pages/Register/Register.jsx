import React, { use, useState } from 'react';
import { Link } from 'react-router';
import logo from '/logo-footer.png'
import AuthContext from '../../Context/AuthContext';

const Register = () => {


  const {handleGoogle,user,loading,handleRegister} = use(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formData.fullName;
    const email = formData.email;
    const password = formData.password;
    const terms = formData.agreeTerms;
    console.log(name,email,password,terms);
    handleRegister(email,password)
    .then(res => {
    
      console.log(res);})
    .catch(err =>{console.log(err);})
    
  };

  const handleGoogleRegister = ()=>{
    handleGoogle()
    .then(res => {console.log(res);})
    .catch(err => {console.log(err);})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF6F6] via-[#FAF6FF] to-[#F1E4FF] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans select-none antialiased">
      
      {/* ==================================================================
        MAIN CONTAINER (Ultra-Premium 3D Shadow with Modified Mirror Grid)
        ==================================================================
      */}
      <div className="w-full max-w-4xl bg-white rounded-[28px] shadow-[0_32px_64px_-16px_rgba(124,77,255,0.14)] border border-white overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Premium Form Panel (Now on Left Side) */}
        {/* ======================================================== */}
        <div className="col-span-1 md:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white relative order-2 md:order-1">
          
          {/* Form Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-black text-gray-950 tracking-tight">Create Account</h3>
            <p className="text-xs text-gray-400 font-medium mt-1">
              Join our beauty circle and personalize your skincare profile today.
            </p>
          </div>

          {/* Interactive Form Core */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Full Name Input */}
            <div className="flex flex-col gap-1.5 group">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-colors group-focus-within:text-[#7C4DFF]">
                Full Name
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full h-12 px-4 text-sm font-semibold text-gray-900 border border-gray-200 bg-gray-50/20 rounded-xl focus:outline-none focus:border-[#7C4DFF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(124,77,255,0.08)] transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Email Input */}
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
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5 group">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest transition-colors group-focus-within:text-[#7C4DFF]">
                Password
              </label>
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

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-2.5 mt-1">
              <input 
                type="checkbox" 
                name="agreeTerms"
                id="agreeTerms" 
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                className="w-4 h-4 text-[#7C4DFF] border-gray-200 rounded-lg focus:ring-[#7C4DFF] cursor-pointer mt-0.5"
              />
              <label htmlFor="agreeTerms" className="text-xs text-gray-500 font-semibold cursor-pointer select-none leading-normal">
                I agree to the <a href="#terms" className="text-[#7C4DFF] font-bold hover:underline">Terms of Service</a> & <a href="#privacy" className="text-[#7C4DFF] font-bold hover:underline">Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full h-12 cursor-pointer bg-gradient-to-r from-[#7C4DFF] to-[#6236ff] text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_6px_24px_rgba(124,77,255,0.25)] hover:shadow-[0_6px_30px_rgba(124,77,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all mt-1"
            >
              Create Account 
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <hr className="border-gray-100" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-black tracking-widest text-gray-300 uppercase">-----OR-----</span>
          </div>

          {/* OFFICIAL STANDARD GOOGLE SIGN-UP BUTTON */}
          <button 
            type="button" 
            onClick={handleGoogleRegister}
            className="w-full h-11 cursor-pointer bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] active:bg-[#F1F3F4] text-[#3C4043] font-medium text-sm rounded-xl flex items-center justify-center gap-3 transition-colors shadow-sm px-4"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.96 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="tracking-wide">Sign up with Google</span>
          </button>

          {/* Bottom Redirect */}
          <p className="text-center text-xs text-gray-400  mt-6">
            Already Registered? <Link to={'/login'} className="text-blue-500 underline ">Log in</Link>
          </p>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Authentic Skincare Image Background Panel (Now on Right) */}
        {/* ======================================================== */}
        <div 
          className="hidden md:flex md:col-span-5 p-8 flex-col justify-between relative overflow-hidden bg-cover bg-center order-1 md:order-2"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1631730486572-226d1f595b68?q=80&w=775&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` 
          }}
        >
          {/* Gentle Dark Overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] bg-gradient-to-t from-black/60 via-transparent to-black/20 z-0"></div>

          {/* Top Brand Logo Node */}
          <Link to={'/'} className="flex items-center gap-2 relative z-10 bg-white/10 backdrop-blur-md px-2 rounded-full border border-white/20 w-fit">
                        <span className='h-10 w-10'><img src={logo} alt="" /></span>
                        <span className="text-[10px] font-black tracking-widest uppercase text-black font-bold">SkinBae Mart</span>
                    </Link>


          {/* Core Banner Content */}
          <div className="mt-auto mb-6 relative z-10 text-white">
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight mb-3">
              Start Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF] to-[#FFE3E3] underline decoration-[#7C4DFF] decoration-2 underline-offset-4">Glow Journey</span>
            </h2>
            <p className="text-[11px] text-gray-200 font-medium leading-relaxed max-w-[220px]">
              Create an account to unlock personalized routine setups, instant reward tracking, and early checkout drops.
            </p>
          </div>

          {/* Bottom Trust Badge */}
          <div className="text-[9px] font-bold tracking-widest text-gray-300 uppercase relative z-10 flex items-center gap-1">
            <span className="text-[#7C4DFF] font-black">✦</span> Pure, Clean & Authentic Skincare
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default Register;