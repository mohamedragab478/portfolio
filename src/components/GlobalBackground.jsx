import { m } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const GlobalBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-500" style={{ backgroundColor: 'var(--darkNav)' }}>
      {/* Dynamic Luminous Glows - Optimized: Removed infinite animations and reduced blur */}
      <div className="absolute top-[0%] left-[-10%] w-[40%] h-[40%] bg-[#7c3aed]/15 rounded-full blur-[80px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-[#06b6d4]/10 rounded-full blur-[80px]" />
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-[#ec4899]/10 rounded-full blur-[80px]" />

      {/* Center Ambient Glow - Simplified */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#d8b4fe]/3 blur-[120px] opacity-60" />

      {/* Premium Texture & Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] brightness-110 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,148,136,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,148,136,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Subtle Floating Essence - Reduced count and simplified */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <m.div
            key={i}
            className="absolute w-[1.5px] h-[1.5px] bg-accent/15 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.2
            }}
            animate={{ 
              y: [null, "-20%"],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobalBackground;
