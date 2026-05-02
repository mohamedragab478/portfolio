import { m } from 'framer-motion';
import { ArrowRight, Code, Terminal, Award, Brain, Cpu, Zap } from 'lucide-react';
import { useState, useEffect, useMemo, memo } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ICON_MAP = { Terminal, Award, Brain, Code, Cpu, Zap };

const spring = { type: 'spring', stiffness: 200, damping: 20 };

/* ─── Typewriter ─── */
const TypewriterText = ({ words }) => {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = words[wordIdx];
    const speed = deleting ? 40 : 80;
    const pause = text === full ? 2200 : speed;

    const id = setTimeout(() => {
      if (!deleting) {
        setText(full.substring(0, text.length + 1));
        if (text === full) setDeleting(true);
      } else {
        setText(full.substring(0, text.length - 1));
        if (text === '') {
          setDeleting(false);
          setWordIdx((p) => (p + 1) % words.length);
        }
      }
    }, pause);
    return () => clearTimeout(id);
  }, [text, deleting, wordIdx, words]);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 font-black">
        {text}
      </span>
      <span className="w-[3px] h-[1em] bg-cyan-400 ml-1 animate-pulse rounded-full inline-block translate-y-[2px]" />
    </span>
  );
};

/* ─── Stat Card ─── */
const StatCard = memo(({ stat, index }) => {
  const IconComp = ICON_MAP[stat.iconName] || Terminal;
  const isEven = index % 2 === 0;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: 0.8 + index * 0.1 }}
      className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-colors duration-500"
    >
      <div className={`shrink-0 p-2.5 rounded-xl border border-white/[0.06] ${isEven ? 'bg-purple-500/10' : 'bg-cyan-500/10'}`}>
        <IconComp className={`w-5 h-5 ${isEven ? 'text-purple-400' : 'text-cyan-400'}`} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-white/90 leading-tight truncate">{stat.title}</p>
        <p className="text-[11px] font-medium text-white/40 leading-tight mt-0.5 truncate">{stat.description}</p>
      </div>
    </m.div>
  );
});
StatCard.displayName = 'StatCard';

/* ─── Hero ─── */
const Hero = memo(() => {
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const snap = await getDoc(doc(db, 'site_config', 'hero'));
        if (snap.exists()) setHeroData(snap.data());
      } catch (err) {
        console.error('Error fetching hero config:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHero();
  }, []);

  const rawName = useMemo(() => (heroData?.name || 'AMIR ELREFAI').trim().split(' '), [heroData?.name]);
  const displayLastName = rawName.length > 1 ? rawName[rawName.length - 1] : '';
  const displayName = rawName.slice(0, rawName.length > 1 ? -1 : 1).join(' ');
  const displayBio = heroData?.bio || 'Passionate AI Engineer specializing in Deep Learning, Computer Vision, and Generative AI. Focused on architecting intelligent AI Agents, building robust RAG systems, and deploying production-ready models.';
  const cvUrl = heroData?.cvUrl || 'https://drive.google.com/file/d/1vdfjkWTQ_1l7Jugs-vbgyxbe_0DTe4pk/view?usp=sharing';
  const githubUrl = heroData?.githubUrl || 'https://github.com/amerelfalwo';
  const profileImage = heroData?.profileImageUrl?.trim() ? heroData.profileImageUrl : '/hero1.png';

  const stats = useMemo(() => {
    const base = heroData?.heroStats?.length > 0
      ? heroData.heroStats
      : [
          { title: '1+ Year XP', description: 'AI & CV Specialist', iconName: 'Brain' },
          { title: '8+ Certifications', description: 'Industry credentials', iconName: 'Award' },
          { title: 'Linux Admin', description: 'Systems Optimization', iconName: 'Terminal' },
          { title: 'IoT & Edge AI', description: 'Smart Ecosystems', iconName: 'Cpu' },
        ];
    return base;
  }, [heroData?.heroStats]);

  if (isLoading) {
    return (
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-32 pb-20">
        <div className="w-full max-w-7xl px-6 md:px-12 grid lg:grid-cols-2 gap-8 items-center animate-pulse">
          <div className="flex flex-col gap-6">
            <div className="h-8 w-48 bg-white/5 rounded-full" />
            <div className="h-20 w-3/4 bg-white/5 rounded-2xl" />
            <div className="h-24 w-full bg-white/5 rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-36 pb-20 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* ── Left Column ── */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start text-left"
        >
          {/* Eyebrow */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-purple-300/80 font-mono">
              AI Command Center
            </span>
          </m.div>

          {/* Name */}
          <m.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.35 }}
            className="text-5xl md:text-7xl lg:text-[88px] font-black mb-6 tracking-[-0.04em] uppercase leading-[0.9] text-white"
          >
            {displayName}
            <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              {displayLastName}
            </span>
          </m.h1>

          {/* Typewriter titles */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-6 min-h-[72px]"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="h-[2px] w-10 bg-gradient-to-r from-purple-500 to-transparent" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-300/60 font-mono">Expertise</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <TypewriterText words={['AI & ML Engineer', 'Deep Learning Specialist', 'Computer Vision Expert', 'Data Architect']} />
            </h2>
          </m.div>

          {/* Bio */}
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-white/40 text-sm md:text-base leading-relaxed max-w-lg mb-10 font-medium"
          >
            {displayBio}
          </m.p>

          {/* CTAs */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-12"
          >
            <m.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-sm shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]"
            >
              Download CV <ArrowRight size={16} />
            </m.a>
            <m.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-3 text-sm hover:bg-white/[0.03]"
            >
              View GitHub <Code size={16} />
            </m.a>
          </m.div>

          {/* Stats row */}
          <div className="w-full grid grid-cols-2 gap-3 max-w-lg">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </m.div>

        {/* ── Right Column: Profile Image ── */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          {/* Ambient glow behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] -z-10 pointer-events-none rounded-full blur-[100px] opacity-30 bg-gradient-to-br from-purple-600/40 to-cyan-500/20" />

          <div className="relative z-10 w-full max-w-[550px] flex items-center justify-center">
            {profileImage && (
              <m.img
                src={profileImage}
                alt={displayName}
                className="w-full h-auto max-h-[750px] object-contain drop-shadow-[0_0_60px_rgba(168,85,247,0.35)]"
                fetchPriority="high"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.target.src !== window.location.origin + '/hero1.png') {
                    e.target.src = '/hero1.png';
                  }
                }}
              />
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
});

export default Hero;