import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created successfully!');
      navigate('/home');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
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
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-slate-400">Join us to get started with your new account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors z-10" />
            <input
              type="text"
              required
              className="input-field pl-14"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3 mt-4"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Sign Up
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-400 transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
