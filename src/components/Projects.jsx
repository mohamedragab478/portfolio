import { m, AnimatePresence } from 'framer-motion';
import { 
  Code2, Database, Zap, Sparkles, Layers, Eye, BrainCircuit, ChevronDown, ChevronUp 
} from 'lucide-react';
import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProjectCube from './ProjectCube';

const CATEGORY_MAP = {
  nlp: { icon: 'BrainCircuit', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', label: 'NLP' },
  cv: { icon: 'Eye', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', label: 'Computer Vision' },
  dl: { icon: 'Layers', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', label: 'Deep Learning' },
  ds: { icon: 'Database', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', label: 'Data Science' },
  agents: { icon: 'Zap', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', label: 'AI Agents' },
  gen_ai: { icon: 'Sparkles', color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20', label: 'Generative AI' }
};

const CategoryStack = memo(({ category, items, onSelect }) => {
  const catInfo = CATEGORY_MAP[category] || { icon: 'Code2', color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/30', label: category };
  const IconComp = { BrainCircuit, Eye, Layers, Database, Zap, Sparkles, Code2 }[catInfo.icon] || Code2;
  
  const displayItems = items.slice(0, 3); // Show up to 3 cards in stack

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      className="group relative w-full h-[400px] cursor-pointer perspective-[1000px]"
      onClick={() => onSelect(category, items)}
    >
      <div className="absolute inset-0 flex items-end justify-center pb-6">
        {displayItems.map((project, idx) => {
          const isTop = idx === 0;
          const translateY = isTop ? 'translate-y-0' : idx === 1 ? 'translate-y-4 scale-95 opacity-80' : 'translate-y-8 scale-90 opacity-60';
          const zIndex = 30 - idx;
          
          return (
            <div 
              key={project.id || idx}
              className={`absolute top-0 w-full h-full rounded-3xl bg-slate-900/80 md:bg-slate-900/40 border border-slate-700/50 shadow-[0_0_15px_rgba(168,85,247,0.05)] md:backdrop-blur-md transition-all duration-300 group-hover:-translate-y-6 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover:border-purple-500/40 overflow-hidden ${translateY}`}
              style={{ zIndex }}
            >
              {isTop && (
                <div className="flex flex-col h-full">
                  <div className="relative w-full h-48 shrink-0 overflow-hidden bg-slate-900/50">
                    <img src={project.image} alt={project.title} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col bg-slate-900/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-xl border ${catInfo.bg} ${catInfo.border}`}>
                        <IconComp className={`w-4 h-4 ${catInfo.color}`} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${catInfo.color}`}>{catInfo.label}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white/80 mb-2 leading-tight group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-white/30 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-700/50">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{items.length} Projects</span>
                       <span className="text-purple-300/70 text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">Explore Stack &rarr;</span>
                    </div>
                  </div>
                </div>
              )}
              {/* Background cards just show a solid color/gradient or image preview */}
              {!isTop && (
                 <div className="w-full h-full bg-slate-900/80 relative">
                    <img src={project.image} alt="" className="w-full h-full object-cover opacity-15 grayscale mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90" />
                 </div>
              )}
            </div>
          );
        })}
      </div>
    </m.div>
  );
});

CategoryStack.displayName = 'CategoryStack';

const Projects = memo(() => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const groupedProjects = useMemo(() => {
    const groups = {};
    projects.forEach(p => {
      const cat = p.category || 'other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return Object.entries(groups).map(([category, items]) => ({
      category,
      items
    }));
  }, [projects]);

  const handleSelectStack = useCallback((category, items) => {
    setSelectedCategory(category);
    setSelectedItems(items);
  }, []);

  const handleCloseCube = useCallback(() => {
    setSelectedCategory(null);
    setSelectedItems([]);
  }, []);

  const visibleGroups = useMemo(() => showAll ? groupedProjects : groupedProjects.slice(0, 4), [showAll, groupedProjects]);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-purple-500/15 bg-purple-500/5 mb-8">
             <Zap className="w-3.5 h-3.5 text-cyan-400" />
             <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-purple-300/70 font-mono">Selected Works</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.03em] mb-5 text-white">
            Core{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">Projects</span>
          </h2>
          <p className="text-white/35 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A curated collection of impactful solutions, grouped by domain to explore the depth of my expertise.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-[3px] border-purple-500/20 border-t-purple-400 rounded-full animate-spin" />
              <p className="text-white/30 tracking-[0.3em] uppercase text-[10px] font-bold font-mono">Loading Projects</p>
            </div>
          ) : (
            <m.div 
              key="project-stacks"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
            >
              {visibleGroups.map((group) => (
                <CategoryStack 
                  key={group.category}
                  category={group.category}
                  items={group.items}
                  onSelect={handleSelectStack}
                />
              ))}
            </m.div>
          )}
        </AnimatePresence>

        {!isLoading && groupedProjects.length > 4 && (
          <div className="mt-20 text-center">
             <button 
               onClick={() => setShowAll(!showAll)}
               className="px-10 py-4 rounded-full bg-slate-900/80 md:bg-slate-900/40 border border-slate-700/50 text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 mx-auto transition-colors duration-200 md:backdrop-blur-md"
             >
               {showAll ? "Show Less" : "Discover More"}
               {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
             </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <ProjectCube 
            category={CATEGORY_MAP[selectedCategory]?.label || selectedCategory}
            projects={selectedItems} 
            onClose={handleCloseCube} 
          />
        )}
      </AnimatePresence>
    </section>
  );
});

export default Projects;
