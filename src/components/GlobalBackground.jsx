/* ═══════════════════════════════════════════
   GLOBAL BACKGROUND — GPU-Optimized
   Pure CSS animations, zero React re-renders.
   ═══════════════════════════════════════════ */

const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#06060e]">
      {/* Primary orb — CSS-only animation, GPU-accelerated */}
      <div
        className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#a855f7]/15 blur-[120px] animate-orb-primary"
        style={{ willChange: 'transform, opacity', transform: 'translate3d(0,0,0)' }}
      />

      {/* Secondary orb — CSS-only animation, GPU-accelerated */}
      <div
        className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#06b6d4]/10 blur-[120px] animate-orb-secondary"
        style={{ willChange: 'transform, opacity', transform: 'translate3d(0,0,0)' }}
      />

      {/* Tertiary static orb — no animation needed */}
      <div className="absolute top-[50%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#d946ef]/5 blur-[100px]" />

      {/* Grid overlay — pure CSS, no JS */}
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
    </div>
  );
};

export default GlobalBackground;
