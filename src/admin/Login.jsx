import { useState } from 'react';
import { login } from '../api';
import { m } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldAlert, Hexagon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      console.log("Login Success");
      navigate('/admin');
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4 font-sans selection:bg-accent/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <m.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#7c3aed]/5 backdrop-blur-xl border border-[#7c3aed]/20 p-8 md:p-10 rounded-[2.5rem] shadow-[0_0_80px_rgba(124,58,237,0.15)] relative z-10"
      >
        <div className="text-center mb-10">
          <m.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-16 h-16 bg-[#7c3aed]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#7c3aed]/30 shadow-[0_0_30px_rgba(124,58,237,0.2)]"
          >
            <Hexagon className="text-white w-8 h-8" />
          </m.div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe] uppercase tracking-widest mb-2">Aura Access</h2>
          <p className="text-muted/60 text-xs font-bold tracking-[0.2em] uppercase">CMS Authorization Protocol</p>
        </div>

        {error && (
          <m.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-xs font-bold tracking-widest uppercase"
          >
            <ShieldAlert className="w-5 h-5 shrink-0" />
            {error}
          </m.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-muted/60 tracking-[0.2em] ml-2">Secure Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/40 group-focus-within:text-white transition-colors" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="admin@protocol.com" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-muted/60 tracking-[0.2em] ml-2">Passkey</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/40 group-focus-within:text-white transition-colors" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="••••••••••••" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-5 mt-8 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] hover:opacity-90 text-white rounded-xl font-black uppercase tracking-[0.4em] text-[11px] flex items-center justify-center gap-3 transition-all outline-none disabled:opacity-50 group border-none shadow-lg shadow-[#ec4899]/20 hover:scale-[1.02] active:scale-[0.98]">
            {loading ? "Authenticating..." : "Initialize Session"}
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </m.div>
    </div>
  );
};

export default Login;
