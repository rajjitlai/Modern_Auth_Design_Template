import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Home/Home';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AppLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<AppLayout><Login /></AppLayout>} />
          <Route path="/register" element={<AppLayout><Register /></AppLayout>} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
