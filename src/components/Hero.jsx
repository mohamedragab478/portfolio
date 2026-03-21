import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, Code, Terminal, Database, Award, Briefcase, Zap, Brain, Star, User } from 'lucide-react';
import { useState, useEffect, useMemo, memo } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Lucide icon name string to actual component mapping
const ICON_MAP = { Terminal, Database, Award, Briefcase, Zap, Brain, Code, Star, User };

const Hero = memo(() => {
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const snap = await getDoc(doc(db, "site_config", "hero"));
        if (snap.exists()) setHeroData(snap.data());
      } catch (err) {
        console.error("Error fetching hero config:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHero();
  }, []);

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

  // Resolved dynamic values with fallbacks to original hardcoded content
  const rawName = useMemo(() => (heroData?.name || 'AMIR ELREFAI').trim().split(' '), [heroData?.name]);
  const displayLastName = rawName.length > 1 ? rawName[rawName.length - 1] : '';
  const displayName = rawName.slice(0, rawName.length > 1 ? -1 : 1).join(' ');
  const displayTitle = heroData?.title || 'AI ENGINEER';
  const displayBio = heroData?.bio || 'Passionate AI Engineer specializing in Deep Learning, Computer Vision, and Generative AI. Focused on architecting intelligent AI Agents, building robust RAG systems, and deploying production-ready models to solve complex, real-world challenges.';
  const cvUrl = heroData?.cvUrl || 'https://drive.google.com/file/d/1vdfjkWTQ_1l7Jugs-vbgyxbe_0DTe4pk/view?usp=sharing';
  const githubUrl = heroData?.githubUrl || 'https://github.com/amerelfalwo';
  const profileImage = heroData?.profileImageUrl || '/hero1.png';

  // Dynamic stats from Firestore or fallback
  const stats = useMemo(() => heroData?.heroStats?.length > 0
    ? heroData.heroStats
    : [
        { title: '1+ Year', description: 'AI & CV Experience', iconName: 'Terminal' },
        { title: '6+', description: 'Professional Certifications', iconName: 'Database' },
      ], [heroData?.heroStats]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (isLoading) {
    return (
      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 bg-transparent">
        <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col items-start gap-6 animate-pulse w-full">
            <div className="h-8 w-48 bg-surface/40 rounded-full" />
            <div className="h-20 w-3/4 bg-surface/40 rounded-2xl" />
            <div className="h-6 w-1/3 bg-surface/40 rounded-lg" />
            <div className="h-24 w-full bg-surface/40 rounded-2xl" />
            <div className="flex gap-4 w-full">
               <div className="h-14 w-40 bg-surface/40 rounded-xl" />
               <div className="h-14 w-40 bg-surface/40 rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-6 w-full mt-6">
               <div className="h-24 bg-surface/40 rounded-2xl" />
               <div className="h-24 bg-surface/40 rounded-2xl" />
            </div>
          </div>
          <div className="hidden lg:flex justify-end animate-pulse">
            <div className="w-[400px] aspect-[4/5] bg-surface/40 rounded-[2rem]" />
          </div>
        </div>
      </section>
    );
  }

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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 glass-card text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Sparkles size={14} className="text-secondary animate-pulse" />
            Deep Learning Engineer <ChevronRight size={14} className="text-secondary/60" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-[85px] font-black mb-4 tracking-tighter uppercase leading-[0.9] text-white whitespace-nowrap"
          >
            {displayName} <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #7c3aed, #d8b4fe)' }}>{displayLastName}</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-5 mb-10 w-full"
          >
            <h2 className="text-xs md:text-base lg:text-lg font-bold tracking-[0.4em] lg:tracking-[0.5em] text-white uppercase whitespace-nowrap">
              {displayTitle}
            </h2>
          </motion.div>

          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.4 }}
             className="max-w-lg text-muted/80 text-lg md:text-xl mb-12 font-medium leading-relaxed tracking-tight"
          >
             {displayBio}
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={cvUrl} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#7c3aed] text-white hover:bg-white hover:text-[#7c3aed] rounded-2xl font-black transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-[#7c3aed]/20"
            >
              Download CV <ArrowRight size={16} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black border border-white/20 text-white transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] hover:bg-white/5"
            >
              View GitHub <Code size={16} />
            </motion.a>
          </div>

           {/* Dynamic Stats Cards */}
           <motion.div 
             variants={containerVariants}
             initial="hidden"
             animate="visible"
             className="mt-12 grid grid-cols-2 gap-6 w-full max-w-md border-t border-white/5 pt-8"
           >
             {stats.map((stat, i) => {
               const IconComp = ICON_MAP[stat.iconName] || Terminal;
               const colors = [
                 "text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]", 
                 "text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 shadow-[0_0_15px_rgba(236,72,153,0.3)]",
               ];
               const colorClass = colors[i % colors.length];
               const iconColor = i % 2 === 0 ? "text-[#06b6d4]" : "text-[#ec4899]";
               return (
                 <motion.div
                   key={i}
                   variants={itemVariants}
                   className="flex flex-col xl:flex-row items-start xl:items-center gap-4 py-4 pr-6 border border-white/5 rounded-2xl group/stat glow-aura bg-surface hover:bg-surface/60 transition-colors"
                 >
                   <div className={`p-2.5 rounded-xl border ml-4 transition-all duration-500 group-hover/stat:scale-110 ${colorClass}`}>
                     <IconComp className={`${iconColor} w-5 h-5`} />
                   </div>
                   <div className="ml-4 xl:ml-0">
                     <h4 className="text-white font-black text-[13px] uppercase tracking-widest">{stat.title}</h4>
                     <p className="text-secondary text-[8px] font-bold uppercase tracking-widest mt-1">{stat.description}</p>
                   </div>
                 </motion.div>
               );
             })}
           </motion.div>
        </motion.div>

        {/* Right Side: Profile Image with 3D Parallax */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative group lg:justify-self-end flex items-center justify-center mt-12 lg:mt-0"
        >
          {/* Subtle Ambient Glow behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] -z-10 pointer-events-none glow-aura rounded-full" />

          {/* Refined Image Container - No borders, smooth fade using CSS Mask */}
          <div className="relative z-10 w-full max-w-[600px] aspect-[4/5] flex items-end justify-center">
            {profileImage && (
              <motion.img 
                src={profileImage}
                alt={`${displayName} ${displayLastName}`}
                className="w-full h-full object-cover object-top drop-shadow-2xl transition-all duration-700 pointer-events-none"
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
                fetchPriority="high"
                decoding="async"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

export default Hero;
