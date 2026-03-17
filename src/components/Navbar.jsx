import { useState, useEffect } from 'react';
import { Menu, X, Zap, Briefcase, Layers, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services', icon: <Layers size={14} /> },
    { name: 'Projects', href: '#projects', icon: <Briefcase size={14} /> },
    { name: 'Certifications', href: '#certifications', icon: <Award size={14} /> },
  ];

  return (
    <nav className="fixed w-full z-50 flex justify-center pt-6 transition-all duration-500">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center justify-between px-10 py-4 rounded-full border transition-all duration-700 ${
          scrolled 
            ? 'bg-[#030014]/40 backdrop-blur-2xl w-[92%] md:w-[70%] border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ring-1 ring-white/5' 
            : 'bg-transparent w-[95%] border-transparent'
        }`}
      >
        <a href="#" className="flex items-center gap-3 group relative">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary transition-all duration-500"
          >
            <Zap className="w-5 h-5 text-primary group-hover:text-white" />
          </motion.div>
          <span className="text-2xl font-black tracking-tighter uppercase text-white group-hover:text-primary transition-colors duration-500">
            Amir<span className="text-primary italic group-hover:text-white">.Aura</span>
          </span>
          <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500 opacity-50" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-secondary hover:text-white transition-all py-2 relative"
            >
              <span className="text-primary/40 group-hover:text-primary transition-all duration-300 transform group-hover:scale-110">
                {link.icon}
              </span>
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <div className="h-6 w-[1px] bg-white/10 mx-2" />
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-primary text-white text-[11px] font-black uppercase tracking-widest shadow-[0_5px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_8px_25px_rgba(124,58,237,0.5)] transition-all"
          >
            Connect
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            {/* Sidebar */}
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 right-0 h-screen w-[300px] bg-[#030014]/90 backdrop-blur-2xl border-l border-white/10 p-8 flex flex-col z-[70] shadow-[-10px_0_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-black tracking-tighter uppercase text-white">
                  Menu<span className="text-primary italic">.</span>
                </span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-white/5 rounded-full text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] py-5 border-b border-white/5 text-secondary hover:text-white group transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-primary/50 group-hover:text-primary transition-colors">{link.icon}</span>
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="#contact"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto bg-primary text-white py-5 rounded-2xl text-center font-black uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_40px_rgba(124,58,237,0.5)] transition-all"
                onClick={() => setIsOpen(false)}
              >
                HIRE ME
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
