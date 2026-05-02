import { m } from 'framer-motion';

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#06060e]">
      {/* Primary animated orb — neon purple */}
      <m.div
        className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#a855f7]/15 blur-[120px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary orb — cyan accent */}
      <m.div
        className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#06b6d4]/10 blur-[120px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Tertiary subtle orb — fuchsia */}
      <div className="absolute top-[50%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#d946ef]/5 blur-[100px]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 60%, transparent 100%)',
        }}
      />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Subtle floating particles */}
      {[...Array(6)].map((_, i) => (
        <m.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-purple-400/20 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
};

export default GlobalBackground;
