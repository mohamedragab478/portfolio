import { useState, useEffect } from 'react';
import { Menu, X, Zap, User, Code2, Briefcase, Mail } from 'lucide-react';
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
    { name: 'About', href: '#about', icon: <User size={14} /> },
    { name: 'Skills', href: '#skills', icon: <Code2 size={14} /> },
    { name: 'Projects', href: '#projects', icon: <Briefcase size={14} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={14} /> },
  ];

  return (
    <nav className="fixed w-full z-50 flex justify-center pt-6 transition-all duration-500">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`flex items-center justify-between px-8 py-3 rounded-full border transition-all duration-500 ${
          scrolled 
            ? 'bg-black/60 backdrop-blur-xl w-[90%] md:w-[65%] border-primary/40 shadow-[0_0_30px_rgba(124,58,237,0.15)] ring-1 ring-white/5' 
            : 'bg-transparent w-[95%] border-transparent'
        }`}
      >
        <a href="#" className="flex items-center gap-2 group">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-all">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-white">
            Amir<span className="text-primary italic">.Aura</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-secondary hover:text-white transition-all py-2"
            >
              <span className="text-primary/50 group-hover:text-primary transition-colors">
                {link.icon}
              </span>
              {link.name}
            </a>
          ))}
          <div className="h-6 w-[1px] bg-white/10 mx-2" />
          <a
            href="#contact"
            className="px-6 py-2 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
          >
            Connect
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[90%] glass-card p-8 flex flex-col gap-4 z-50 border-primary/20 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center justify-center gap-3 text-lg font-black uppercase tracking-widest py-4 border-b border-white/5 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-primary">{link.icon}</span>
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-primary text-white py-5 rounded-2xl text-center font-black uppercase tracking-[0.3em] mt-4"
              onClick={() => setIsOpen(false)}
            >
              HIRE ME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
