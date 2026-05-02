import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-20 border-t border-purple-500/10 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tight uppercase mb-2 text-white">
              Amir<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">.Aura</span>
            </h2>
            <p className="text-purple-300/30 text-[10px] font-bold uppercase tracking-[0.4em] font-mono">
              AI Architecture & Engineering
            </p>
          </div>

          {/* Tagline & Copyright */}
          <div className="text-center md:text-right">
            <p className="text-white/25 text-xs font-bold uppercase tracking-[0.2em] mb-3 flex items-center justify-center md:justify-end gap-2">
              Engineering Reality,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">One Neuron</span>{' '}
              at a Time.
              <Zap className="w-3 h-3 text-purple-400/40" />
            </p>
            <p className="text-white/15 text-[10px] uppercase font-bold tracking-[0.3em] font-mono">
              © {new Date().getFullYear()} Amir Elrefai. All Space Reserved.
            </p>
          </div>
        </div>

        {/* Decorative line */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500/20 shadow-[0_0_8px_rgba(168,85,247,0.2)]" />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
