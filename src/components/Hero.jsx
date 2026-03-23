import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, Sparkles, Code, Terminal, Database, Award, Briefcase, Zap, Brain, Star, User, Cpu, GitBranch, Layers, BarChart } from 'lucide-react';
import { useState, useEffect, useMemo, memo } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Lucide icon name string to actual component mapping
const ICON_MAP = { Terminal, Database, Award, Briefcase, Zap, Brain, Code, Star, User, Cpu, GitBranch, Layers, BarChart };

// Helper function for default detailed descriptions - Moved outside to prevent ReferenceError
const getDefaultDetailedDescription = (title) => {
  const descriptions = {
    '1+ Year': 'Hands-on experience with production-grade AI models, achieving 95%+ accuracy in computer vision tasks and reducing inference time by 40% through optimization.',
    '8': 'Comprehensive knowledge validated by industry leaders, covering everything from fundamental ML concepts to advanced generative AI and MLOps practices.',
    'AI & CV Experience': 'Developed and deployed multiple computer vision solutions including facial recognition, object detection, and image classification systems.',
    'Certifications': 'Continuous learning mindset with certifications from Google, AWS, DeepLearning.AI, and Stanford Online.',
    'Linux Admin': 'Proficient in managing high-performance computing clusters, automating workflows, and maintaining 99.9% system uptime.',
    'IoT': 'Architected end-to-end IoT solutions with edge AI capabilities, reducing latency by 60% and enabling real-time decision making.'
  };
  return descriptions[title] || 'Proven expertise with measurable results in production environments.';
};

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

  // Resolved dynamic values with fallbacks to original hardcoded content
  const rawName = useMemo(() => (heroData?.name || 'AMIR ELREFAI').trim().split(' '), [heroData?.name]);
  const displayLastName = rawName.length > 1 ? rawName[rawName.length - 1] : '';
  const displayName = rawName.slice(0, rawName.length > 1 ? -1 : 1).join(' ');
  const displayTitle = heroData?.title || 'AI ENGINEER';
  const displayBio = heroData?.bio || 'Passionate AI Engineer specializing in Deep Learning, Computer Vision, and Generative AI. Focused on architecting intelligent AI Agents, building robust RAG systems, and deploying production-ready models to solve complex, real-world challenges.';
  const cvUrl = heroData?.cvUrl || 'https://drive.google.com/file/d/1vdfjkWTQ_1l7Jugs-vbgyxbe_0DTe4pk/view?usp=sharing';
  const githubUrl = heroData?.githubUrl || 'https://github.com/amerelfalwo';
  const profileImage = heroData?.profileImageUrl || '/hero1.png';

  // Enhanced stats with more detailed content
  const stats = useMemo(() => {
    const baseStats = heroData?.heroStats?.length > 0
      ? heroData.heroStats
      : [
          { 
            title: '1+ Year XP', 
            description: 'AI & CV Specialist', 
            iconName: 'Brain',
            detailedDescription: 'Specialized in Computer Vision architectures including CNNs, Transformers, and YOLO models.'
          },
          { 
            title: '8+ Certifications', 
            description: 'Industry-recognized credentials', 
            iconName: 'Award',
            detailedDescription: 'Credentials in Deep Learning, TensorFlow, AWS AI Services, and Advanced ML from top institutions.'
          },
          { 
            title: 'Linux Admin', 
            description: 'Systems Optimization', 
            iconName: 'Terminal',
            detailedDescription: 'Expert in Linux server administration, shell scripting, and infrastructure optimization.'
          },
          { 
            title: 'IoT & Edge AI', 
            description: 'Smart Ecosystems', 
            iconName: 'Cpu',
            detailedDescription: 'Developing intelligent IoT solutions integrating edge AI and real-time data processing.'
          },
        ];

    return baseStats.map(stat => ({
      ...stat,
      detailedDescription: stat.detailedDescription || getDefaultDetailedDescription(stat.title)
    }));
  }, [heroData?.heroStats]);

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
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 bg-transparent">
        <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="flex flex-col items-start gap-6 animate-pulse w-full">
            <div className="h-8 w-48 bg-surface/40 rounded-full" />
            <div className="h-20 w-3/4 bg-surface/40 rounded-2xl" />
            <div className="h-6 w-1/3 bg-surface/40 rounded-lg" />
            <div className="h-24 w-full bg-surface/40 rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-36 pb-20 bg-transparent overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Content Column */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start text-left"
        >
          <m.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 glass-card text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Sparkles size={14} className="text-secondary" />
            Deep Learning Engineer <ChevronRight size={14} className="text-secondary/60" />
          </m.div>

          <m.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-[85px] font-black mb-4 tracking-tighter uppercase leading-[0.9] text-white whitespace-nowrap"
          >
            {displayName} <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(to right, #7c3aed, #d8b4fe)' }}>{displayLastName}</span>
          </m.h1>
          
          <m.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 md:gap-5 mb-8 w-full"
          >
            <h2 className="text-xs md:text-base lg:text-lg font-bold tracking-[0.4em] lg:tracking-[0.5em] text-white uppercase whitespace-nowrap">
              {displayTitle}
            </h2>
          </m.div>

          <m.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.4 }}
             className="max-w-lg text-muted/80 text-lg md:text-xl mb-10 font-medium leading-relaxed tracking-tight"
          >
             {displayBio}
          </m.p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <m.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={cvUrl} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#7c3aed] text-white hover:bg-white hover:text-[#7c3aed] rounded-2xl font-black transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-[#7c3aed]/20"
            >
              Download CV <ArrowRight size={16} />
            </m.a>
            <m.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black border border-white/20 text-white transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] hover:bg-white/5"
            >
              View GitHub <Code size={16} />
            </m.a>
          </div>

           {/* Professional Stats Slider - Compact Version */}
           <div className="w-full max-w-2xl border-t border-white/5 pt-8">
             <Swiper
               modules={[Autoplay, Pagination]}
               spaceBetween={16}
               slidesPerView={1}
               autoplay={{ delay: 4000, disableOnInteraction: false }}
               loop={true}
               breakpoints={{ 768: { slidesPerView: 2 } }}
               className="stats-swiper pb-8"
             >
               {stats.map((stat, i) => {
                 const IconComp = ICON_MAP[stat.iconName] || Terminal;
                 const gradientColors = [
                   "from-cyan-500/20 to-blue-500/20 shadow-cyan-500/10",
                   "from-pink-500/20 to-purple-500/20 shadow-pink-500/10",
                 ];
                 const iconGradient = i % 2 === 0 ? "text-cyan-400" : "text-pink-400";
                 
                 return (
                   <SwiperSlide key={i} className="h-auto">
                     <m.div
                       variants={itemVariants}
                       className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-4 h-full flex flex-col gap-3 hover:scale-[1.02] transition-all duration-500"
                     >
                        {/* Glow Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                        <div className="flex items-center gap-4 relative z-10">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradientColors[i % 2]} backdrop-blur-md border border-white/10`}>
                            <IconComp className={`${iconGradient} w-5 h-5`} />
                          </div>
                          <div className="flex-1">
                            <span className="text-lg font-black text-white leading-none">{stat.title}</span>
                            <h4 className="text-white/70 font-bold text-[10px] uppercase tracking-wider mt-1">
                              {stat.description}
                            </h4>
                          </div>
                        </div>
                     </m.div>
                   </SwiperSlide>
                 );
               })}
             </Swiper>
           </div>
        </m.div>

        {/* Right Side: Profile Image - Balanced Height */}
        {/* Right Side: Profile Image - Elevated for Alignment */}
        <m.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative group lg:justify-self-end flex items-start justify-center lg:-mt-32"
        >
          {/* Subtle Ambient Glow behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] -z-10 pointer-events-none glow-aura rounded-full blur-[100px] opacity-30" />

          <div className="relative z-10 w-full max-w-[550px] flex items-start justify-center overflow-hidden rounded-[3rem]">
            {profileImage && (
              <m.img 
                src={profileImage}
                alt={displayName}
                className="w-full h-auto max-h-[750px] object-contain object-top drop-shadow-2xl transition-all duration-700 pointer-events-none"
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                }}
                fetchPriority="high"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
          </div>
        </m.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stats-swiper .swiper-pagination-bullet { width: 8px; height: 8px; background: rgba(255, 255, 255, 0.2); opacity: 1; }
        .stats-swiper .swiper-pagination-bullet-active { width: 24px; border-radius: 4px; background: #7c3aed; box-shadow: 0 0 15px rgba(124, 58, 237, 0.5); }
      `}} />
    </section>
  );
});

export default Hero;