import { m, AnimatePresence } from 'framer-motion';
import { useState, useMemo, memo } from 'react';
import { useSkills } from '../hooks/useData';
import NeuralSkillsCore from './NeuralSkillsCore';
import {
  Brain, Eye, Code, Terminal,
  Sparkles, Grid3X3, Layers, Cpu, ShieldCheck
} from 'lucide-react';

/* ═══════════════════════════════════════════
   CATEGORY CONFIG
   ═══════════════════════════════════════════ */

const CATEGORIES = [
  { id: 'all', label: 'All Stack', icon: Grid3X3 },
  { id: 'deep_learning', label: 'Deep Learning', icon: Brain },
  { id: 'computer_vision', label: 'Computer Vision', icon: Eye },
  { id: 'nlp_ai', label: 'NLP & Gen AI', icon: Sparkles },
  { id: 'development', label: 'Development', icon: Code },
  { id: 'devops', label: 'DevOps & Tools', icon: Terminal },
];

/* Default Preset Technologies per Category */
const PRESET_SKILLS = {
  computer_vision: [
    { name: 'OpenCV' },
    { name: 'YOLO' },
    { name: 'TensorFlow' },
    { name: 'PyTorch' },
    { name: 'ONNX' },
    { name: 'MediaPipe' },
  ],
  nlp_ai: [
    { name: 'LangChain' },
    { name: 'ChromaDB' },
    { name: 'Hugging Face' },
    { name: 'LlamaIndex' },
    { name: 'Pinecone' },
    { name: 'OpenAI' },
  ],
  development: [
    { name: 'FastAPI' },
    { name: 'Next.js' },
    { name: 'Docker' },
    { name: 'PostgreSQL' },
    { name: 'React' },
    { name: 'Python' },
    { name: 'C++' },
  ],
  deep_learning: [
    { name: 'PyTorch' },
    { name: 'TensorFlow' },
    { name: 'Keras' },
    { name: 'ONNX' },
    { name: 'Python' },
    { name: 'Scikit-Learn' },
  ],
  devops: [
    { name: 'Docker' },
    { name: 'Linux' },
    { name: 'Git' },
    { name: 'UV' },
    { name: 'PostgreSQL' },
    { name: 'MongoDB' },
  ],
  all: [
    { name: 'PyTorch' },
    { name: 'TensorFlow' },
    { name: 'OpenCV' },
    { name: 'YOLO' },
    { name: 'LangChain' },
    { name: 'ChromaDB' },
    { name: 'LlamaIndex' },
    { name: 'FastAPI' },
    { name: 'Next.js' },
    { name: 'Docker' },
    { name: 'Python' },
    { name: 'C++' },
  ]
};

function categorizeSkill(name) {
  const n = name.toLowerCase();
  if (['pytorch', 'tensorflow', 'keras', 'unet', 'vgg', 'resnet', 'neural', 'cnn', 'gan'].some(k => n.includes(k))) return 'deep_learning';
  if (['opencv', 'yolo', 'mediapipe', 'detectron', 'vision', 'image process', 'ssd'].some(k => n.includes(k))) return 'computer_vision';
  if (['numpy', 'pandas', 'scikit', 'sklearn', 'matplotlib', 'data'].some(k => n.includes(k))) return 'deep_learning';
  if (['langchain', 'pinecone', 'gradio', 'hugging', 'openai', 'llm', 'rag', 'nlp', 'llamaindex', 'chromadb'].some(k => n.includes(k))) return 'nlp_ai';
  if (['python', 'c++', 'react', 'fastapi', 'flask', 'javascript', 'next', 'mongo', 'sql', 'postgres'].some(k => n.includes(k))) return 'development';
  return 'devops';
}

const tween = { type: 'tween', duration: 0.3, ease: 'easeOut' };

/* ═══════════════════════════════════════════
   MINIMALIST PREMIUM SKILLS SECTION
   - Apple Vision Pro & AI OS Dashboard Style
   - Clean 2-Ring AI Core Visualization
   - Zero flashy noise, Production Ready
   ═══════════════════════════════════════════ */

const Skills = memo(() => {
  const { skills: rawSkills, isLoading } = useSkills();
  const [activeCategory, setActiveCategory] = useState('all');

  const processedSkills = useMemo(() => {
    if (!rawSkills || rawSkills.length === 0) return PRESET_SKILLS;

    const map = {
      all: [],
      deep_learning: [],
      computer_vision: [],
      nlp_ai: [],
      development: [],
      devops: [],
    };

    // Deduplicate
    const unique = Array.from(new Map(rawSkills.map((s) => [s.name, s])).values());

    unique.forEach((s) => {
      const cat = s.category || categorizeSkill(s.name);
      const skillObj = { ...s, _category: cat };
      map.all.push(skillObj);
      if (map[cat]) map[cat].push(skillObj);
    });

    // Merge missing preset items to guarantee rich 2-ring orbits
    Object.keys(PRESET_SKILLS).forEach((catKey) => {
      const existingNames = new Set((map[catKey] || []).map((x) => x.name.toLowerCase()));
      PRESET_SKILLS[catKey].forEach((preset) => {
        if (!existingNames.has(preset.name.toLowerCase())) {
          map[catKey].push(preset);
        }
      });
    });

    return map;
  }, [rawSkills]);

  /* Total unique technologies count across all categories */
  const totalCount = useMemo(() => {
    return (processedSkills.all || PRESET_SKILLS.all).length || 21;
  }, [processedSkills]);

  /* Filtered skills for current active category */
  const activeSkills = useMemo(() => {
    return processedSkills[activeCategory] || PRESET_SKILLS[activeCategory] || PRESET_SKILLS.all;
  }, [activeCategory, processedSkills]);

  const activeCategoryObj = useMemo(() => {
    return CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  }, [activeCategory]);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ── Section header ── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px' }}
          transition={tween}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-slate-800 bg-slate-900/60 mb-6 backdrop-blur-md">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-300 font-mono">
              AI CORE VISUALIZATION :: SYSTEM ACTIVE
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 text-slate-100 uppercase">
            Technical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              Arsenal
            </span>
          </h2>

          <p className="text-slate-400 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Minimalist, production-ready AI stack matrix powered by autonomous deep learning models and high-performance neural architecture.
          </p>
        </m.div>

        {/* ── Category tabs ── */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...tween, delay: 0.05 }}
          className="flex flex-wrap justify-center gap-2.5 md:gap-3.5 mb-10"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            const count = (processedSkills[cat.id] || PRESET_SKILLS[cat.id] || []).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border backdrop-blur-md cursor-pointer ${
                  isActive
                    ? 'bg-slate-900/90 border-cyan-400/70 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.2)] ring-1 ring-cyan-400/40'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-cyan-400' : 'text-slate-500'} />
                <span className="tracking-wide font-mono">{cat.label}</span>
                <span className={`text-[10px] md:text-xs font-mono tabular-nums px-2 py-0.5 rounded-md ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800/50 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </m.div>

        {/* ── 2-Ring Interactive AI Core Orbit ── */}
        <AnimatePresence mode="wait">
          <m.div
            key={`neural-core-${activeCategory}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full flex justify-center"
          >
            <NeuralSkillsCore 
              skills={activeSkills} 
              activeCategory={activeCategory} 
              categoryLabel={activeCategoryObj.label}
            />
          </m.div>
        </AnimatePresence>

        {/* Professional AI System Readout Footer */}
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-900/60 border border-slate-800 backdrop-blur-md">
            <ShieldCheck size={15} className="text-emerald-400" />
            <span className="text-[11px] font-bold text-slate-300 tracking-widest uppercase font-mono">
              AI CORE ACTIVE • {totalCount} TECHNOLOGIES • PRODUCTION READY
            </span>
          </div>
        </div>

      </div>
    </section>
  );
});

Skills.displayName = 'Skills';
export default Skills;
