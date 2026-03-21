import { Zap, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-20 border-t border-[#7c3aed]/20 bg-transparent overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7c3aed]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Left: Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-3 text-white">
              Amir<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">.Aura</span>
            </h2>
            <p className="text-[#d8b4fe]/60 text-[10px] font-black uppercase tracking-[0.5em]">Visionary AI Architecture</p>
          </div>

          {/* Right: Tagline & Copyright */}
          <div className="text-center md:text-right">
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-4 italic flex items-center justify-center md:justify-end gap-2">
              Engineering Reality, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">One Neuron</span> at a Time.
              <Zap className="w-3 h-3 text-[#d8b4fe]/50" />
            </p>
            <p className="text-[#7c3aed]/30 text-[10px] uppercase font-black tracking-widest">
              © {new Date().getFullYear()} Amir Elrefai. All Space Reserved.
            </p>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-[#7c3aed]/30 shadow-[0_0_10px_rgba(124,58,237,0.3)]" />
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed]/20 to-transparent" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
