import React from 'react';
import { useAuth } from '../AuthContext';
import { LogOut, User, LayoutDashboard, Settings, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 rounded-3xl w-full max-w-4xl border border-white/10 relative z-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, {user?.name}!</h1>
              <p className="text-slate-400">You are successfully logged in as {user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: LayoutDashboard, title: 'Dashboard', desc: 'Overview of your activities' },
            { icon: Bell, title: 'Notifications', desc: '3 new updates available' },
            { icon: Settings, title: 'Settings', desc: 'Manage your account preferences' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/20">
          <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            System Status
          </h4>
          <p className="text-slate-300 text-sm">All systems are operational. Your secure session is active.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
