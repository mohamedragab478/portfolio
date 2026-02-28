import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, Zap, Cpu, Sparkles, Code, Terminal, Globe, Database } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 bg-transparent"
    >
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-[11px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Sparkles size={14} className="text-white/60" />
            AI Research & Innovation <ChevronRight size={14} className="text-white/40" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-[85px] font-black mb-6 tracking-tighter uppercase leading-[0.9] text-white whitespace-nowrap"
          >
            AMIR <span className="text-primary drop-shadow-[0_0_30px_rgba(124,58,237,0.4)]">ELREFAI</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-5 mb-10 w-full"
          >
            <h2 className="text-xs md:text-base lg:text-lg font-bold tracking-[0.2em] md:tracking-[0.4em] lg:tracking-[0.5em] text-secondary/60 uppercase whitespace-nowrap">
              AI ARCHITECT & RESEARCHER
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-lg text-secondary/80 text-lg md:text-xl mb-12 font-medium leading-relaxed tracking-tight"
          >
            Architecting the next generation of <span className="text-white">autonomous intelligence</span>. Specializing in high-performance neural infrastructures and production-scale <span className="text-primary font-bold">AI ecosystems</span>.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black rounded-2xl border-2 border-white/10 shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px]"
            >
              Start Project <ArrowRight size={18} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="w-full sm:w-auto px-10 py-5 glass-card font-black border-2 border-white/10 text-white transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px]"
            >
              Browse Work <Globe size={18} />
            </motion.a>
          </div>

          {/* Micro Stats/Quick Expertise */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/5 pt-6 w-full max-w-md">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-primary/10 rounded-lg border border-primary/20">
                <Cpu className="text-primary w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-black text-[11px] uppercase tracking-tighter">Inference</h4>
                <p className="text-secondary text-[10px] font-bold">Latency Focused</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-primary/10 rounded-lg border border-primary/20">
                <Zap className="text-primary w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-black text-[11px] uppercase tracking-tighter">Scalability</h4>
                <p className="text-secondary text-[10px] font-bold">Cloud-Ready</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Architectural Image Container with 3D Parallax */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative group lg:justify-self-end flex items-center justify-center"
        >
          {/* Luminous Glow - Reduced Intensity */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none opacity-40">
             <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px]" />
          </div>

          {/* Integrated Infinity Container (Ghost Mode) */}
     <div 
  className="relative z-10 w-full max-w-[500px] aspect-[4/5] overflow-hidden"
  style={{
    maskImage: `
      linear-gradient(to bottom, black 65%, transparent 100%),
      linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)
    `,
    WebkitMaskImage: `
      linear-gradient(to bottom, black 65%, transparent 100%),
      linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)
    `,
    maskComposite: 'intersect',
    WebkitMaskComposite: 'source-in'
  }}
>
            <motion.img 
              src="/hero1.png" 
              alt="Amir Elrefai" 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 mix-blend-lighten"
            />
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
