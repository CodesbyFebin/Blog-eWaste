import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, User, ShieldCheck, HelpCircle, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { email: string; name: string; isAdmin: boolean }) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDemoAdminLogin = () => {
    setEmail('admin@ewastekochi.com');
    setPassword('admin123');
    setIsSignUp(false);
    setError(null);
  };

  const handleDemoUserLogin = () => {
    setEmail('suresh.k@gmx.com');
    setPassword('suresh123');
    setIsSignUp(false);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim() || !password.trim()) {
      setError('Please provide your corporate or standard email and password.');
      return;
    }

    if (isSignUp && !name.trim()) {
      setError('Please provide your full legal name for authentication logging.');
      return;
    }

    // Load existing users
    const usersRaw = localStorage.getItem('ewastekochi_users_list');
    let users = [];
    if (usersRaw) {
      try {
        users = JSON.parse(usersRaw);
      } catch (err) {
        users = [];
      }
    }

    // Default registered demo keys in case they are not in local storage yet
    const hasAdmin = users.some((u: any) => u.email === 'admin@ewastekochi.com');
    if (!hasAdmin) {
      users.push({
        email: 'admin@ewastekochi.com',
        name: 'Sanoop Mathew (Lead Moderator)',
        password: 'admin123',
        isAdmin: true
      });
      users.push({
        email: 'suresh.k@gmx.com',
        name: 'Suresh Kumar',
        password: 'suresh123',
        isAdmin: false
      });
      localStorage.setItem('ewastekochi_users_list', JSON.stringify(users));
    }

    if (isSignUp) {
      // Check if user exists
      const userExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (userExists) {
        setError('A member folder is already registered with this email.');
        return;
      }

      // Admin rule: email containing 'admin' or matching admin email generates admin privilege
      const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase() === 'admin@ewastekochi.com';

      const newUser = {
        email: email.toLowerCase(),
        name: name.trim(),
        password,
        isAdmin
      };

      users.push(newUser);
      localStorage.setItem('ewastekochi_users_list', JSON.stringify(users));
      setSuccess('Account created and verified! Standard regulatory ID provisioned.');
      
      setTimeout(() => {
        onLoginSuccess({ email: newUser.email, name: newUser.name, isAdmin: newUser.isAdmin });
        onClose();
        setName('');
        setEmail('');
        setPassword('');
        setSuccess(null);
      }, 1500);

    } else {
      // Login
      const matchedUser = users.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (matchedUser) {
        setSuccess(`Authentication successful. Welcoming ${matchedUser.name}!`);
        setTimeout(() => {
          onLoginSuccess({
            email: matchedUser.email,
            name: matchedUser.name,
            isAdmin: matchedUser.isAdmin
          });
          onClose();
          setEmail('');
          setPassword('');
          setSuccess(null);
        }, 1200);
      } else {
        // Check hardcoded defaults if local storage was cleared
        if (email.toLowerCase() === 'admin@ewastekochi.com' && password === 'admin123') {
          onLoginSuccess({
            email: 'admin@ewastekochi.com',
            name: 'Sanoop Mathew (Lead Moderator)',
            isAdmin: true
          });
          onClose();
          return;
        }
        if (email.toLowerCase() === 'suresh.k@gmx.com' && password === 'suresh123') {
          onLoginSuccess({
            email: 'suresh.k@gmx.com',
            name: 'Suresh Kumar',
            isAdmin: false
          });
          onClose();
          return;
        }
        setError('Invalid credentials. Check spelling or try using our verified demo buttons below.');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#020703]/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="bg-[#030c05] border border-emerald-900 rounded-2xl w-full max-w-md p-6 sm:p-8 relative z-10 shadow-2xl shadow-emerald-950/50 text-slate-100"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-emerald-950/50 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header branding info */}
            <div className="text-center mb-6">
              <div className="h-12 w-12 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="h-6 w-6 text-[#5ce625]" />
              </div>
              <h3 className="font-sans font-black text-xl text-white">
                {isSignUp ? 'Create Corporate ID' : 'Sign In To Account'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Access authenticated waste audits, buyback calculations & moderation logs
              </p>
            </div>

            {/* Feedback states */}
            {error && (
              <div className="bg-red-950/50 border border-red-900/40 text-red-300 rounded-lg p-3 text-xs mb-4 text-center font-sans">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-950/50 border border-emerald-900/40 text-[#5ce625] rounded-lg p-3 text-xs mb-4 text-center font-sans flex items-center justify-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>{success}</span>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Legal Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand R. Pillai"
                      className="w-full bg-emerald-950/20 border border-emerald-900/50 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5ce625] transition-colors font-sans"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. anand@company.in"
                    className="w-full bg-emerald-950/20 border border-emerald-900/50 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5ce625] transition-colors font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-emerald-950/20 border border-emerald-900/50 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5ce625] transition-colors font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5ce625] hover:bg-[#4dd31a] text-slate-950 font-sans font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-md shadow-emerald-500/20 mt-2 cursor-pointer"
              >
                {isSignUp ? 'Verify & Create ID' : 'Validate Authenticated Access'}
              </button>
            </form>

            {/* Switch sign up / login */}
            <div className="text-center mt-5 text-xs text-slate-400 font-sans">
              {isSignUp ? (
                <p>
                  Already have a clean clearance account?{' '}
                  <button onClick={() => setIsSignUp(false)} className="text-[#5ce625] hover:underline font-bold bg-transparent border-none cursor-pointer">
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  New to Kochi's legal recycling mesh?{' '}
                  <button onClick={() => setIsSignUp(true)} className="text-[#5ce625] hover:underline font-bold bg-transparent border-none cursor-pointer">
                    Create Member ID
                  </button>
                </p>
              )}
            </div>

            {/* Quick Demo Assist Block */}
            <div className="mt-6 pt-5 border-t border-emerald-950/80 space-y-2.5">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 text-center">
                Auditor Demo Access Box
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={handleDemoAdminLogin}
                  className="bg-emerald-950/40 hover:bg-emerald-900/30 border border-emerald-800/60 rounded-lg p-2 text-emerald-400 transition-colors cursor-pointer text-center font-sans font-semibold"
                >
                  Fill Admin Auditor
                </button>
                <button
                  type="button"
                  onClick={handleDemoUserLogin}
                  className="bg-emerald-950/40 hover:bg-emerald-900/30 border border-emerald-800/60 rounded-lg p-2 text-slate-300 transition-colors cursor-pointer text-center font-sans font-semibold"
                >
                  Fill Regular Citizen
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
