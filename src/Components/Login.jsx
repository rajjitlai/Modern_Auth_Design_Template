import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Mail, Lock, LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-8 rounded-2xl w-full border border-white/10 relative overflow-hidden"
    >
      {/* Template Ribbon */}
      <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 pointer-events-none">
        <div className="bg-blue-600 text-white text-[10px] font-bold uppercase py-1 w-32 text-center absolute top-4 -right-8 rotate-45 shadow-lg">
          Template
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-slate-400">Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors z-10" />
            <input
              type="email"
              required
              className="input-field pl-14"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors z-10" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="input-field pl-14 pr-12"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/50" />
            <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
          </label>
          <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">Forgot password?</a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Sign In
            </>
          )}
        </button>
      </form>

      {/* Dummy Data Info */}
      <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1 items-center">
        <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500">Demo Access</p>
        <div className="flex gap-4 text-xs text-slate-400">
          <span>User: <code className="text-blue-400">admin@demo.com</code></span>
          <span>Pass: <code className="text-blue-400">password123</code></span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
