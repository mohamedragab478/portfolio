import { m } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const GlobalBackground = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-500" style={{ backgroundColor: 'var(--darkNav)' }}>
      {/* Dynamic Luminous Glows */}
      <m.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[0%] left-[-10%] w-[50%] h-[50%] bg-[#7c3aed]/30 rounded-full blur-[150px]"
      />
      <m.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15], x: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-[#06b6d4]/20 rounded-full blur-[150px]"
      />
      <m.div
        animate={{ scale: [1.1, 1.4, 1.1], opacity: [0.1, 0.25, 0.1], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute top-[40%] right-[10%] w-[40%] h-[40%] bg-[#ec4899]/20 rounded-full blur-[150px]"
      />
      <m.div
        animate={{ scale: [1.3, 1.1, 1.3], opacity: [0.1, 0.2, 0.1], x: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[30%] left-[10%] w-[45%] h-[45%] bg-[#10b981]/20 rounded-full blur-[150px]"
      />

      {/* Center Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#d8b4fe]/5 blur-[200px] opacity-80 mix-blend-screen" />


      {/* Premium Texture & Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12] brightness-110 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,148,136,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,148,136,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Subtle Floating Essence */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <m.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-accent/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3
            }}
            animate={{ 
              y: [null, "-100%"],
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: Math.random() * 15 + 15, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobalBackground;
