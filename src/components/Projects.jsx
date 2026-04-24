import { m, AnimatePresence } from 'framer-motion';
import { 
  Code2, Database, Zap, Sparkles, Layers, Eye, BrainCircuit, ChevronDown, ChevronUp 
} from 'lucide-react';
import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProjectCube from './ProjectCube';

const skillIcons = {
  "PyTorch": "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg",
  "TensorFlow": "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg",
  "OpenCV": "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg",
  "YOLO v11": "https://cdn.simpleicons.org/ultralytics/white",
  "Python": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  "MediaPipe": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/google.svg",
  "C++": "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
  "Docker": "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
  "React": "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  "FastAPI": "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg",
  "NumPy": "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg",
  "Pandas": "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg",
};

const CATEGORY_MAP = {
  nlp: { icon: 'BrainCircuit', color: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-100', label: 'NLP' },
  cv: { icon: 'Eye', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'Computer Vision' },
  dl: { icon: 'Layers', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100', label: 'Deep Learning' },
  ds: { icon: 'Database', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', label: 'Data Science' },
  agents: { icon: 'Zap', color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-100', label: 'AI Agents' },
  gen_ai: { icon: 'Sparkles', color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-100', label: 'Generative AI' }
};

const CategoryStack = memo(({ category, items, onSelect }) => {
  const catInfo = CATEGORY_MAP[category] || { icon: 'Code2', color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200', label: category };
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
              className={`absolute top-0 w-full h-full rounded-[2rem] bg-white border border-slate-200 shadow-sm transition-all duration-500 group-hover:-translate-y-6 group-hover:shadow-xl overflow-hidden ${translateY}`}
              style={{ zIndex }}
            >
              {isTop && (
                <div className="flex flex-col h-full">
                  <div className="relative w-full h-48 shrink-0 overflow-hidden bg-slate-100">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col bg-white">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-xl border ${catInfo.bg} ${catInfo.border}`}>
                        <IconComp className={`w-4 h-4 ${catInfo.color}`} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${catInfo.color}`}>{catInfo.label}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{items.length} Projects</span>
                       <span className="text-sky-500 text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">Explore Stack &rarr;</span>
                    </div>
                  </div>
                </div>
              )}
              {/* Background cards just show a solid color/gradient or image preview */}
              {!isTop && (
                 <div className="w-full h-full bg-slate-50">
                    <img src={project.image} alt="" className="w-full h-full object-cover opacity-50 grayscale" />
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
    <section id="projects" className="py-32 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-6 shadow-sm">
             <Zap className="w-4 h-4 text-sky-500" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Selected Works</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-slate-800">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-300">Projects</span>
          </h2>
          <p className="text-slate-500 font-medium tracking-tight max-w-2xl mx-auto text-lg leading-relaxed">
            A curated collection of impactful solutions, grouped by domain to explore the depth of my expertise.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
              <p className="text-slate-400 tracking-[0.3em] uppercase text-[10px] font-bold animate-pulse">Loading Projects</p>
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
               className="px-10 py-4 rounded-full shadow-sm bg-white border border-slate-200 text-slate-600 hover:text-sky-500 hover:border-sky-200 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 mx-auto transition-all"
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
