import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { MessageCircle, Github, Linkedin, Send, X, Share2, Facebook, Instagram, Twitter } from 'lucide-react';
import { getContactRelay } from '../api';

const SocialFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await getContactRelay();
        if (data) setContactData(data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchContactData();
  }, []);

  let socials = [];

  if (contactData) {
    if (contactData.linkedin) {
      socials.push({ label: 'LinkedIn', icon: <Linkedin size={22} />, href: contactData.linkedin, color: 'bg-[#0077B5]', hover: 'shadow-[0_0_20px_rgba(0,119,181,0.4)]' });
    }
    if (contactData.phone) {
      socials.push({ label: 'WhatsApp', icon: <MessageCircle size={22} />, href: `https://wa.me/${contactData.phone.replace(/[^0-9]/g, '')}`, color: 'bg-[#25D366]', hover: 'shadow-[0_0_20px_rgba(37,211,102,0.4)]' });
    }
    if (contactData.github) {
      socials.push({ label: 'GitHub', icon: <Github size={22} />, href: contactData.github, color: 'bg-[#333]', hover: 'shadow-[0_0_20px_rgba(51,51,51,0.4)]' });
    }
    if (contactData.facebook) {
      socials.push({ label: 'Facebook', icon: <Facebook size={22} />, href: contactData.facebook, color: 'bg-[#1877F2]', hover: 'shadow-[0_0_20px_rgba(24,119,242,0.4)]' });
    }
    if (contactData.instagram) {
      socials.push({ label: 'Instagram', icon: <Instagram size={22} />, href: contactData.instagram, color: 'bg-[#E4405F]', hover: 'shadow-[0_0_20px_rgba(228,64,95,0.4)]' });
    }
    if (contactData.xTwitter) {
      socials.push({ label: 'X (Twitter)', icon: <Twitter size={22} />, href: contactData.xTwitter, color: 'bg-[#1DA1F2]', hover: 'shadow-[0_0_20px_rgba(29,161,242,0.4)]' });
    }
    if (contactData.khamsat) {
      socials.push({ label: 'Khamsat', icon: <Share2 size={22} />, href: contactData.khamsat, color: 'bg-[#f58220]', hover: 'shadow-[0_0_20px_rgba(245,130,32,0.4)]' });
    }
  } else {
    // Fallback if no data is loaded yet or it fails
    socials = [
      { icon: <Linkedin size={22} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/amir-elrefai-658b16260/', color: 'bg-[#0077B5]', hover: 'shadow-[0_0_20px_rgba(0,119,181,0.4)]' },
      { icon: <MessageCircle size={22} />, label: 'WhatsApp', href: 'https://wa.me/201023524477', color: 'bg-[#25D366]', hover: 'shadow-[0_0_20px_rgba(37,211,102,0.4)]' },
      { icon: <Send size={22} />, label: 'Telegram', href: 'https://t.me/Amirelfalw', color: 'bg-[#0088cc]', hover: 'shadow-[0_0_20px_rgba(0,136,204,0.4)]' },
      { icon: <Github size={22} />, label: 'GitHub', href: 'https://github.com/amerelfalwo', color: 'bg-[#333]', hover: 'shadow-[0_0_20px_rgba(51,51,51,0.4)]' },
    ];
  }

  // Distribute angles evenly from 15 to -105 degrees based on the number of items
  const startAngle = 15;
  const endAngle = -105;
  const totalItems = socials.length;
  
  socials.forEach((social, index) => {
    social.angle = totalItems > 1 
      ? startAngle + (index * (endAngle - startAngle) / (totalItems - 1))
      : -45;
  });

  const radius = 115; // Distance from center

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {/* Social Icons (Radial) */}
      <AnimatePresence>
        {isOpen && socials.map((social, index) => {
          const x = Math.cos((social.angle * Math.PI) / 180) * radius;
          const y = Math.sin((social.angle * Math.PI) / 180) * radius;

          return (
            <m.a
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
              className={`absolute p-3.5 rounded-full text-white shadow-xl border border-white/10 flex items-center justify-center group ${social.color} ${social.hover}`}
              title={social.label}
            >
              <div className="relative z-10">{social.icon}</div>
              {/* Tooltip */}
              <span className="absolute left-14 px-3 py-1.5 bg-[#0a0a0a]/90 backdrop-blur-md text-[#d8b4fe] text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-white/10">
                {social.label}
              </span>
            </m.a>
          );
        })}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <m.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative z-[100] w-14 h-14 rounded-full border transition-all duration-300 flex items-center justify-center backdrop-blur-xl ${
          isOpen 
            ? 'bg-[#7c3aed]/20 border-[#d8b4fe]/50 shadow-[0_0_30px_rgba(124,58,237,0.4)]' 
            : 'bg-[#0a0a0a]/80 border-white/10 hover:border-[#d8b4fe]/50 hover:bg-[#7c3aed]/20 shadow-[0_0_30px_rgba(124,58,237,0.15)]'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <m.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="text-[#d8b4fe] w-6 h-6 drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]" />
            </m.div>
          ) : (
            <m.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Share2 className="text-[#d8b4fe] w-6 h-6 drop-shadow-[0_0_8px_rgba(216,180,254,0.5)]" />
            </m.div>
          )}
        </AnimatePresence>
      </m.button>
    </div>
  );
};

export default SocialFloatingButton;
