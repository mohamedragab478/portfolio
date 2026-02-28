import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Github, Linkedin, Send, X, Share2 } from 'lucide-react';

const SocialFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { 
      icon: <MessageCircle size={22} />, 
      label: 'WhatsApp', 
      href: 'https://wa.me/201204040156', 
      color: 'bg-[#25D366]',
      hover: 'shadow-[0_0_20px_rgba(37,211,102,0.4)]',
      angle: -90 // Top
    },
    { 
      icon: <Linkedin size={22} />, 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/amir-elrefai-658b16260/', 
      color: 'bg-[#0077B5]',
      hover: 'shadow-[0_0_20px_rgba(0,119,181,0.4)]',
      angle: -45 // Top-Right
    },
    { 
      icon: <Github size={22} />, 
      label: 'GitHub', 
      href: 'https://github.com/amirelrefai', 
      color: 'bg-[#333]',
      hover: 'shadow-[0_0_20px_rgba(51,51,51,0.4)]',
      angle: 0 // Right
    },
    { 
      icon: <Send size={22} />, 
      label: 'Telegram', 
      href: 'https://t.me/amirelrefai', 
      color: 'bg-[#0088cc]',
      hover: 'shadow-[0_0_20px_rgba(0,136,204,0.4)]',
      angle: -135 // Top-Left
    },
  ];

  const radius = 90; // Distance from center

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {/* Social Icons (Radial) */}
      <AnimatePresence>
        {isOpen && socials.map((social, index) => {
          const x = Math.cos((social.angle * Math.PI) / 180) * radius;
          const y = Math.sin((social.angle * Math.PI) / 180) * radius;

          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: 1, scale: 1, x, y }}
              exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: index * 0.05 
              }}
              whileHover={{ scale: 1.2 }}
              className={`absolute p-4 rounded-full text-white shadow-xl border border-white/20 flex items-center justify-center group ${social.color} ${social.hover}`}
              title={social.label}
            >
              <div className="relative z-10">{social.icon}</div>
              {/* Tooltip */}
              <span className="absolute left-14 px-3 py-1 bg-white text-black text-[10px] font-black uppercase rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-black/5">
                {social.label}
              </span>
            </motion.a>
          );
        })}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative z-20 p-5 rounded-full shadow-2xl border border-white/20 transition-all duration-300 flex items-center justify-center ${
          isOpen 
            ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.4)]' 
            : 'bg-primary text-white shadow-[0_0_30px_rgba(124,58,237,0.4)]'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Share2 size={26} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default SocialFloatingButton;
