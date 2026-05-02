import { m, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo, memo } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  Zap, Brain, Eye, BarChart3, Code, Terminal,
  Sparkles, Grid3X3, Layers,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════ */

const CATEGORIES = [
  { id: 'all', label: 'All', icon: Grid3X3 },
  { id: 'deep_learning', label: 'Deep Learning', icon: Brain },
  { id: 'computer_vision', label: 'Computer Vision', icon: Eye },
  { id: 'data_science', label: 'Data Science', icon: BarChart3 },
  { id: 'nlp_ai', label: 'NLP & Gen AI', icon: Sparkles },
  { id: 'development', label: 'Development', icon: Code },
  { id: 'devops', label: 'DevOps & Tools', icon: Terminal },
];

const CATEGORY_COLORS = {
  deep_learning: { border: 'border-purple-500/30', hoverBorder: 'group-hover:border-purple-500/50', bg: 'bg-purple-500/10', text: 'text-purple-300', dropShadow: 'drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]', glowRGB: '168, 85, 247' },
  computer_vision: { border: 'border-emerald-500/30', hoverBorder: 'group-hover:border-emerald-500/50', bg: 'bg-emerald-500/10', text: 'text-emerald-300', dropShadow: 'drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]', glowRGB: '16, 185, 129' },
  data_science: { border: 'border-amber-500/30', hoverBorder: 'group-hover:border-amber-500/50', bg: 'bg-amber-500/10', text: 'text-amber-300', dropShadow: 'drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]', glowRGB: '245, 158, 11' },
  nlp_ai: { border: 'border-pink-500/30', hoverBorder: 'group-hover:border-pink-500/50', bg: 'bg-pink-500/10', text: 'text-pink-300', dropShadow: 'drop-shadow-[0_0_12px_rgba(236,72,153,0.5)]', glowRGB: '236, 72, 153' },
  development: { border: 'border-cyan-500/30', hoverBorder: 'group-hover:border-cyan-500/50', bg: 'bg-cyan-500/10', text: 'text-cyan-300', dropShadow: 'drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]', glowRGB: '6, 182, 212' },
  devops: { border: 'border-orange-500/30', hoverBorder: 'group-hover:border-orange-500/50', bg: 'bg-orange-500/10', text: 'text-orange-300', dropShadow: 'drop-shadow-[0_0_12px_rgba(249,115,22,0.5)]', glowRGB: '249, 115, 22' },
};

const FEATURED = ['pytorch', 'tensorflow', 'python', 'opencv', 'langchain', 'docker', 'react', 'yolo'];

function categorizeSkill(name) {
  const n = name.toLowerCase();
  if (['pytorch', 'tensorflow', 'keras', 'unet', 'vgg', 'resnet', 'inception', 'efficientnet', 'transformer', 'neural', 'cnn', 'rnn', 'lstm', 'gan'].some(k => n.includes(k))) return 'deep_learning';
  if (['opencv', 'yolo', 'mediapipe', 'detectron', 'vision', 'image process', 'ssd', 'faster rcnn'].some(k => n.includes(k))) return 'computer_vision';
  if (['numpy', 'pandas', 'scikit', 'sklearn', 'matplotlib', 'seaborn', 'plotly', 'jupyter', 'scipy', 'statsmodel', 'data'].some(k => n.includes(k))) return 'data_science';
  if (['langchain', 'pinecone', 'gradio', 'hugging', 'openai', 'llm', 'rag', 'nlp', 'spacy', 'nltk', 'whisper', 'gemini', 'gpt', 'bert', 'llama', 'groq'].some(k => n.includes(k))) return 'nlp_ai';
  if (['python', 'c++', 'react', 'fastapi', 'flask', 'firebase', 'vite', 'tailwind', 'javascript', 'html', 'css', 'node', 'next', 'mongo', 'sql', 'django', 'streamlit'].some(k => n.includes(k))) return 'development';
  return 'devops';
}

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const tween = { type: 'tween', duration: 0.3, ease: 'easeOut' };

const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: tween },
  exit: { opacity: 0, y: -6, transition: { duration: 0.1 } },
};

/* Check for touch device to skip expensive mouse-tracking */
const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);


/* ═══════════════════════════════════════════
   SKILL CARD (bento item)
   ═══════════════════════════════════════════ */

const SkillCard = memo(({ skill, featured = false, index = 0 }) => {
  const cat = skill._category || 'devops';
  const colors = CATEGORY_COLORS[cat] || CATEGORY_COLORS.devops;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = isTouchDevice ? undefined : (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Asymmetrical Bento spans
  let spanClass = 'col-span-1 row-span-1';
  if (featured) {
    if (index % 3 === 0) spanClass = 'col-span-2 row-span-2';
    else if (index % 2 === 0) spanClass = 'col-span-2 row-span-1';
    else spanClass = 'col-span-1 row-span-2';
  }

  return (
    <m.div
      variants={gridItem}
      whileHover={isTouchDevice ? undefined : { scale: 1.02 }}
      transition={tween}
      onMouseMove={handleMouseMove}
      style={{ willChange: 'transform, opacity', transform: 'translate3d(0,0,0)' }}
      className={`group relative flex flex-col items-center justify-center gap-4 ${featured ? 'p-6 md:p-8' : 'p-5 md:p-6'} rounded-3xl bg-slate-900/80 md:bg-slate-900/40 border border-slate-700/50 ${colors.hoverBorder} transition-colors duration-300 overflow-hidden cursor-default md:backdrop-blur-md ${spanClass}`}
    >
      {/* Spotlight */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(${colors.glowRGB}, 0.15), transparent 100%)`
        }}
      />

      {/* Ambient gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-slate-800/50 to-transparent" />

      {/* Icon */}
      <div className={`relative z-10 flex items-center justify-center ${featured ? 'p-4 md:p-5' : 'p-3 md:p-4'} rounded-2xl border ${colors.border} ${colors.bg} transition-transform duration-500 group-hover:scale-110`}>
        <img
          src={skill.icon}
          alt={skill.name}
          className={`object-contain transition-all duration-500 ${colors.dropShadow} ${featured ? 'w-12 h-12 md:w-16 md:h-16' : 'w-8 h-8 md:w-10 md:h-10'}`}
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Name */}
      <span className={`relative z-10 font-bold text-slate-300 group-hover:text-white transition-colors text-center leading-tight ${featured ? 'text-lg md:text-xl' : 'text-sm md:text-base'}`}>
        {skill.name}
      </span>

      {/* Category badge — featured cards only */}
      {featured && (
        <span className={`relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.border} shadow-sm mt-1`}>
          {CATEGORIES.find(c => c.id === cat)?.label || cat}
        </span>
      )}
    </m.div>
  );
});
SkillCard.displayName = 'SkillCard';

/* ═══════════════════════════════════════════
   MAIN SKILLS COMPONENT
   ═══════════════════════════════════════════ */

const Skills = memo(() => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const snap = await getDocs(collection(db, 'skills'));
        const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Deduplicate
        const unique = Array.from(new Map(all.map((s) => [s.name, s])).values());
        // Attach resolved category
        const enriched = unique.map((s) => ({
          ...s,
          _category: s.category || categorizeSkill(s.name),
        }));
        setSkills(enriched);
      } catch (err) {
        console.error('Error fetching skills:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  /* Group by category */
  const grouped = useMemo(() => {
    const map = {};
    skills.forEach((s) => {
      const c = s._category;
      if (!map[c]) map[c] = [];
      map[c].push(s);
    });
    return map;
  }, [skills]);

  /* Available categories (non-empty) */
  const availableCats = useMemo(
    () => CATEGORIES.filter((c) => c.id === 'all' || (grouped[c.id] && grouped[c.id].length > 0)),
    [grouped],
  );

  /* Filtered list */
  const filtered = useMemo(() => {
    if (activeCategory === 'all') return skills;
    return grouped[activeCategory] || [];
  }, [activeCategory, skills, grouped]);


  /* Count for active */
  const activeCount = activeCategory === 'all' ? skills.length : (grouped[activeCategory]?.length || 0);

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Polish Grid */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)'
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Section header ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px' }}
          transition={tween}
          className="text-center mb-16"
        >
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8 backdrop-blur-md">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-300/80 font-mono">
            Technical Arsenal
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-slate-100">
          Powering the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Future
          </span>
        </h2>
        <p className="text-slate-400 font-medium max-w-2xl mx-auto text-base md:text-xl leading-relaxed">
          The meticulously curated stack I use to build scalable machine learning models and high-performance applications.
        </p>
        </m.div>

        {/* ── Category tabs ── */}
        {!isLoading && skills.length > 0 && (
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...tween, delay: 0.05 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14"
        >
          {availableCats.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            const count = cat.id === 'all' ? skills.length : (grouped[cat.id]?.length || 0);

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold transition-colors duration-200 border md:backdrop-blur-md ${
                  isActive
                    ? 'bg-slate-800/80 border-cyan-500/50 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                    : 'bg-slate-900/40 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-500 hover:bg-slate-800/50'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-cyan-400' : 'text-slate-500'} />
                <span className="tracking-wide">{cat.label}</span>
                <span className={`text-[10px] md:text-xs font-mono tabular-nums px-2 py-0.5 rounded-md ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800/50 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </m.div>
        )}

        {/* ── Loading state ── */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-[3px] border-purple-500/20 border-t-purple-400 rounded-full animate-spin" />
            <p className="text-white/30 tracking-[0.3em] uppercase text-[10px] font-bold font-mono">Initializing Arsenal</p>
          </div>
        )}

        {/* ── Bento grid ── */}
        {!isLoading && filtered.length > 0 && (
          <AnimatePresence mode="wait">
            <m.div
              key={activeCategory}
              variants={gridContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-10 grid-flow-dense"
            >
              {filtered.map((skill, i) => {
                const isFeat = FEATURED.some((k) => skill.name.toLowerCase().includes(k));
                return <SkillCard key={skill.id || skill.name} skill={skill} featured={isFeat} index={i} />;
              })}
            </m.div>
          </AnimatePresence>
        )}

        {/* Active count badge */}
        {!isLoading && filtered.length > 0 && (
          <div className="flex justify-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/40 border border-slate-700/50 backdrop-blur-md">
              <Layers size={14} className="text-cyan-400/70" />
              <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase font-mono">
                {activeCount} Technologies Loaded
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
});

export default Skills;
