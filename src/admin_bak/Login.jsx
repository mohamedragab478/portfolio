import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Zap } from 'lucide-react';
import GlobalBackground from '../components/GlobalBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // TODO: Inject Firebase/Supabase Auth SignIn Logic Here
    // e.g. await signInWithEmailAndPassword(auth, email, password);
    
    // Abstract success navigation
    if (email && password) {
       navigate('/admin/projects');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4">
      <GlobalBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-10 bg-[#05011a]/60 border border-borderColor rounded-[2rem] backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-accent/10 rounded-2xl mb-6">
            <Zap className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-accent mb-2">
            System <span className="text-accent italic">Access</span>
          </h2>
          <p className="text-muted/60 text-xs font-bold uppercase tracking-widest">
            Authenticate to manage portfolio
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase tracking-widest text-muted/80 ml-2">Admin Email</label>
             <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/40" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface/20 border-2 border-borderColor rounded-2xl py-4 pl-12 pr-4 text-accent font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-accent/20"
                  placeholder="admin@example.com"
                />
             </div>
          </div>
          
          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase tracking-widest text-muted/80 ml-2">Passcode</label>
             <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent/40" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface/20 border-2 border-borderColor rounded-2xl py-4 pl-12 pr-4 text-accent font-medium focus:border-accent focus:outline-none transition-colors placeholder:text-accent/20"
                  placeholder="••••••••"
                />
             </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-accent text-accent font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:shadow-[0_0_30px_rgba(13,148,136,0.4)] transition-all flex items-center justify-center gap-3 group mt-4"
          >
            Authenticate <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
