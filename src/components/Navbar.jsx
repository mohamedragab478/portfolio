import { useState, useEffect } from 'react';
import { Menu, X, Zap, Briefcase, Layers, Award, Code } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const spring = { type: 'spring', stiffness: 200, damping: 20 };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [siteLogoUrl, setSiteLogoUrl] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const snap = await getDoc(doc(db, 'site_config', 'hero'));
        if (snap.exists() && snap.data().siteLogoUrl) {
          const logoUrl = snap.data().siteLogoUrl;
          setSiteLogoUrl(logoUrl);
          const favicon = document.querySelector("link[rel='icon']");
          if (favicon) favicon.href = logoUrl;
        }
      } catch (err) {
        console.warn('Could not fetch site logo:', err);
      }
    };
    fetchLogo();
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services', icon: <Layers size={13} /> },
    { name: 'Skills', href: '#skills', icon: <Code size={13} /> },
    { name: 'Projects', href: '#projects', icon: <Briefcase size={13} /> },
    { name: 'Credentials', href: '#education', icon: <Award size={13} /> },
  ];

  return (
    <nav className="fixed w-full z-50 flex justify-center pt-5 transition-all duration-500">
      <m.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center justify-between px-5 py-2.5 rounded-full transition-all duration-700 ${
          scrolled
            ? 'bg-[#06060e]/80 backdrop-blur-2xl border border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)] w-[92%] md:w-[75%]'
            : 'bg-transparent w-[95%] md:w-[85%]'
        }`}
      >
        {/* Logo */}
        <div className="flex-1">
          <a href="#" className="flex items-center gap-2 group w-fit">
            {siteLogoUrl ? (
              <img
                src={siteLogoUrl}
                alt="Logo"
                referrerPolicy="no-referrer"
                className="h-9 md:h-10 w-auto object-contain rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <Zap className="w-7 h-7 md:w-8 md:h-8 text-purple-400" />
            )}
            <span className="text-xl md:text-2xl font-black tracking-widest uppercase text-white">
              AMIR<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">.AURA</span>
            </span>
          </a>
        </div>

        {/* Desktop Nav Pills */}
        <div className="hidden md:flex items-center gap-1 px-1.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 hover:text-white hover:bg-white/[0.05] transition-all duration-300"
            >
              <span className="text-white/20 group-hover:text-purple-400 transition-colors duration-300">
                {link.icon}
              </span>
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex flex-1 justify-end items-center">
          <a
            href="#contact"
            className="px-7 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)]"
          >
            Connect
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-purple-400 p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </m.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-[#06060e]/60 backdrop-blur-sm z-[60]"
            />

            <m.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={spring}
              className="md:hidden fixed top-0 right-0 h-screen w-[280px] bg-[#0c0c1d]/95 backdrop-blur-2xl border-l border-purple-500/10 p-8 flex flex-col z-[70] shadow-[-10px_0_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between mb-14">
                <span className="text-lg font-black tracking-tight uppercase text-white/80">
                  Menu<span className="text-purple-400">.</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-white/[0.03] rounded-full text-white/40 hover:text-white border border-white/[0.06] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navLinks.map((link, idx) => (
                  <m.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ ...spring, delay: 0.05 + idx * 0.08 }}
                    className="flex items-center gap-4 text-sm font-bold uppercase tracking-[0.15em] py-4 border-b border-white/[0.04] text-white/40 hover:text-purple-300 group transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-white/15 group-hover:text-purple-400 transition-colors">{link.icon}</span>
                    {link.name}
                  </m.a>
                ))}
              </div>

              <m.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.4 }}
                className="mt-auto bg-gradient-to-r from-purple-600 to-purple-500 text-white py-4 rounded-2xl text-center font-bold uppercase tracking-[0.2em] text-sm shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                onClick={() => setIsOpen(false)}
              >
                Get In Touch
              </m.a>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
