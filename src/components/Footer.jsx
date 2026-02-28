const Footer = () => {
  return (
    <footer className="py-24 border-t border-white/5 bg-transparent">
      <div className="section-padding py-0 flex flex-col md:flex-row justify-between items-center gap-12">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-3">Amir<span className="text-primary">.Aura</span></h2>
          <p className="text-secondary text-[10px] font-black uppercase tracking-[0.5em]">Visionary AI Architecture</p>
        </div>

        <div className="text-center md:text-right">
          <p className="text-secondary text-xs font-black uppercase tracking-[0.3em] mb-4 italic">
            Engineering Reality, <span className="text-white">One Neuron</span> at a Time.
          </p>
          <p className="text-white/20 text-[10px] uppercase font-black tracking-widest">
            © {new Date().getFullYear()} Amir Elrefai. All Space Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
