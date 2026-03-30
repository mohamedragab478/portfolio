import { useState, useEffect } from 'react';
import { Menu, X, Zap, Briefcase, Layers, Award, User } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [siteLogoUrl, setSiteLogoUrl] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch site logo from Firebase
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const snap = await getDoc(doc(db, "site_config", "hero"));
        if (snap.exists() && snap.data().siteLogoUrl) {
          const logoUrl = snap.data().siteLogoUrl;
          setSiteLogoUrl(logoUrl);
          // Also update favicon dynamically
          const favicon = document.querySelector("link[rel='icon']");
          if (favicon) favicon.href = logoUrl;
        }
      } catch (err) {
        console.warn("Could not fetch site logo:", err);
      }
    };
    fetchLogo();
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services', icon: <Layers size={14} /> },
    { name: 'Projects', href: '#projects', icon: <Briefcase size={14} /> },
    { name: 'Certifications', href: '#education', icon: <Award size={14} /> },
  ];

  return (
    <nav className="fixed w-full z-50 flex justify-center pt-6 transition-all duration-500">
      <m.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-700 ${
          scrolled 
            ? 'glass-card border-white/5 w-[92%] md:w-[80%] glow-aura ring-1 ring-white/5' 
            : 'bg-transparent w-[95%] md:w-[85%] border-transparent'
        }`}
      >
        <div className="flex-1">
          <a href="#" className="flex items-center gap-1 group relative w-fit">
            {siteLogoUrl ? (
              <img src={siteLogoUrl} alt="Logo" referrerPolicy="no-referrer" className="h-10 md:h-12 w-auto object-contain rounded" onError={(e) => { e.target.style.display='none'; e.target.nextElementSibling.style.display='block'; }} />
            ) : null}
            {!siteLogoUrl && <Zap className="w-8 h-8 md:w-10 md:h-10 text-[#7c3aed]" />}
            <span className="text-2xl md:text-3xl font-black tracking-widest uppercase text-white drop-shadow-md">
              AMIR<span className="text-[#7c3aed]">.AURA</span>
            </span>
          </a>
        </div>

        {/* Desktop Nav - Centered Pills */}
        <div className="hidden md:flex items-center gap-2 px-2 py-1.5 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md transition-all duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-center gap-2.5 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#94a3b8] hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <span className="text-[#94a3b8]/50 group-hover:text-[#7c3aed] transition-colors duration-300">
                {link.icon}
              </span>
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Right - Connect Button */}
        <div className="hidden md:flex flex-1 justify-end items-center">
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-[#7c3aed] text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 hover:brightness-110 shadow-lg shadow-[#7c3aed]/20"
          >
            Connect
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-accent p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </m.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-surface/40 backdrop-blur-sm z-[60]"
            />
            
            {/* Sidebar */}
            <m.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-screen w-[300px] bg-background/90 backdrop-blur-2xl border-l border-borderColor p-8 flex flex-col z-[70] shadow-[-10px_0_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-black tracking-tighter uppercase text-accent">
                  Menu<span className="text-accent italic">.</span>
                </span>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-surface/20 rounded-full text-accent hover:bg-surface/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <m.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] py-5 border-b border-borderColor text-muted hover:text-accent group transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-accent/50 group-hover:text-accent transition-colors">{link.icon}</span>
                    {link.name}
                  </m.a>
                ))}
              </div>

              <m.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto border border-[#7c3aed] text-white bg-[#7c3aed] hover:bg-white hover:text-[#7c3aed] py-5 rounded-2xl text-center font-black uppercase tracking-[0.3em] shadow-lg shadow-[#7c3aed]/20 transition-all"
                onClick={() => setIsOpen(false)}
              >
                HIRE ME
              </m.a>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
