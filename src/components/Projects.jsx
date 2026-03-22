import { m, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Github, X, Code2, Database, Cpu, 
  Globe, ChevronDown, ChevronUp, ArrowRight, Info,
  Layers, Settings, Box, Workflow, Monitor, Server,
  Terminal, Search, Activity, Share2, Zap, CheckCircle2, Loader,
  BrainCircuit, Eye, Sparkles
} from 'lucide-react';
import { useState, useEffect, memo, useCallback, useMemo } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const skillIcons = {
  "PyTorch": "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg",
  "TensorFlow": "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg",
  "OpenCV": "https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg",
  "YOLO v11": "https://cdn.simpleicons.org/ultralytics/white",
  "Python": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  "MediaPipe": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/google.svg",
  "C++": "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
  "Docker": "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
  "Kubernetes": "https://raw.githubusercontent.com/devicons/devicon/master/icons/server/server-original.svg",
  "LangChain": "https://cdn.simpleicons.org/langchain/white",
  "React": "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  "FastAPI": "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg",
  "NumPy": "https://raw.githubusercontent.com/devicons/devicon/master/icons/numpy/numpy-original.svg",
  "Pandas": "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg",
  "Keras": "https://cdn.simpleicons.org/keras/white",
  "Pinecone": "https://cdn.simpleicons.org/pinecone/white",
  "UNet++": "https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg",
  "VGG16": "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg",
  "ResNet50": "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg",
  "ngrok": "https://cdn.simpleicons.org/ngrok/white",
  "Render": "https://cdn.simpleicons.org/render/white",
  "Scikit-learn": "https://cdn.simpleicons.org/scikitlearn/white",
  "Gradio": "https://cdn.simpleicons.org/gradio/white"
};

const CATEGORY_MAP = {
  nlp: { icon: 'BrainCircuit', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', shadow: 'shadow-[0_0_15px_rgba(96,165,250,0.3)]', label: 'NLP' },
  cv: { icon: 'Eye', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20', shadow: 'shadow-[0_0_15px_rgba(52,211,153,0.3)]', label: 'Computer Vision' },
  dl: { icon: 'Layers', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', shadow: 'shadow-[0_0_15px_rgba(192,132,252,0.3)]', label: 'Deep Learning' },
  ds: { icon: 'Database', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20', shadow: 'shadow-[0_0_15px_rgba(251,191,36,0.3)]', label: 'Data Science' },
  agents: { icon: 'Zap', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', shadow: 'shadow-[0_0_15px_rgba(250,204,21,0.3)]', label: 'AI Agents' },
  gen_ai: { icon: 'Sparkles', color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20', shadow: 'shadow-[0_0_15px_rgba(244,114,182,0.3)]', label: 'Generative AI' }
};

const ProjectCard = memo(({ project, onSelect, skillIcons }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, margin: "100px" }}
      className={`group flex flex-col md:flex-row overflow-hidden rounded-[1.2rem] border border-white/5 hover:border-white/10 glow-aura transition-all duration-500 bg-surface h-full md:h-[240px] glass-card`}
    >
      <div className="relative w-full md:w-[38%] h-[160px] md:h-full overflow-hidden shrink-0">
         <img 
           src={project.image} 
           alt={project.title} 
           loading="lazy"
           decoding="async"
           referrerPolicy="no-referrer"
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
         />
         <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 group-hover:opacity-10 transition-opacity`} />
      </div>

      <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
         <div>
            <div className="flex justify-between items-start mb-2">
               <div>
                  {(() => {
                    const catInfo = CATEGORY_MAP[project.category] || { icon: 'Code2', color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/30', shadow: 'shadow-none', label: project.category };
                    const IconComp = {
                      BrainCircuit, Eye, Layers, Database, Zap, Sparkles, Code2
                    }[catInfo.icon] || Code2;
                    return (
                      <div className="flex items-center gap-4">
                         <div className={`p-2.5 rounded-xl border ${catInfo.bg} ${catInfo.border} ${catInfo.shadow} transition-all duration-500 group-hover:scale-110`}>
                           <IconComp className={`w-5 h-5 ${catInfo.color}`} />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">{catInfo.label}</span>
                           <h4 className="text-lg font-black uppercase mt-1 text-[#f97316] tracking-tight leading-none">{project.title}</h4>
                         </div>
                      </div>
                    );
                  })()}
               </div>
               <button 
                 onClick={() => onSelect(project)}
                 className="flex items-center gap-2 px-4 py-2 bg-transparent border border-white/10 hover:border-white/20 text-white rounded-full transition-all text-[8px] font-black uppercase tracking-wider hover:bg-white/5"
               >
                  Details
                  <ArrowRight size={12} />
               </button>
            </div>
            
            <p className="text-muted text-[12px] leading-tight line-clamp-2 md:line-clamp-3 mb-4 font-medium">
              {project.description}
            </p>
         </div>

         <div className="flex flex-wrap gap-1.5 pt-3 border-t border-borderColor">
            {project.tags?.map((tag) => {
              const colorClass = "text-[#10b981] border-[#10b981]/30 bg-[#10b981]/5";
              return (
              <span key={tag} className={`flex items-center gap-1.5 px-2 py-1 text-[8px] font-black uppercase border rounded-md transition-all cursor-default ${colorClass}`}>
                {skillIcons[tag] ? (
                  <img src={skillIcons[tag]} alt={tag} loading="lazy" decoding="async" className="w-3 h-3 object-contain" />
                ) : (
                  <Code2 size={10} />
                )}
                {tag}
              </span>
            )})}
         </div>
      </div>
    </m.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Projects = memo(() => {
  const [selectedProject, setSelectedProject] = useState(null);
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

  const handleSelectProject = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const visibleProjects = useMemo(() => showAll ? projects : projects.slice(0, 4), [showAll, projects]);

  return (
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
             <Zap className="w-4 h-4 text-accent" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Selected Works</span>
          </m.div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Projects</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <m.div 
              key="skeletons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex flex-col md:flex-row rounded-[1.2rem] bg-surface/40 border-2 border-borderColor h-full md:h-[240px] animate-pulse">
                  <div className="w-full md:w-[38%] h-[160px] md:h-full bg-surface/60 rounded-t-[1.2rem] md:rounded-l-[1.2rem] md:rounded-tr-none" />
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                         <div className="w-16 h-3 bg-surface/60 rounded" />
                         <div className="w-20 h-6 bg-surface/60 rounded-full" />
                      </div>
                      <div className="w-3/4 h-6 bg-surface/60 rounded" />
                      <div className="space-y-2 mt-4">
                        <div className="w-full h-3 bg-surface/60 rounded" />
                        <div className="w-5/6 h-3 bg-surface/60 rounded" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-6">
                      <div className="w-16 h-6 bg-surface/60 rounded-md" />
                      <div className="w-16 h-6 bg-surface/60 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </m.div>
          ) : (
            <m.div 
              key="projects"
              className="grid lg:grid-cols-2 gap-8"
              layout
            >
              {visibleProjects.map((project) => (
                <ProjectCard 
                  key={project.id || project.title}
                  project={project}
                  onSelect={handleSelectProject}
                  skillIcons={skillIcons}
                />
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {!isLoading && (
        <div className="mt-14 text-center">
           <button 
             onClick={() => setShowAll(!showAll)}
             className="px-10 py-4 rounded-full shadow-lg shadow-[#7c3aed]/20 bg-[#7c3aed] text-white hover:bg-white hover:text-[#7c3aed] text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 mx-auto transition-all"
           >
             {showAll ? "Show Less" : "Discover More"}
             {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
           </button>
        </div>
      )}

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex justify-center p-4 overflow-y-auto pt-32 pb-12">
             <m.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedProject(null)}
               className="fixed inset-0 bg-surface/40 backdrop-blur-xl"
             />
             
             <m.div 
               initial={{ opacity: 0, scale: 0.9, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 40 }}
               className="relative w-full max-w-4xl h-fit bg-background rounded-[2.5rem] overflow-hidden border border-borderColor shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col"
             >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-50 p-3 bg-surface/40 backdrop-blur-md hover:bg-surface/40 border border-borderColor rounded-2xl text-accent transition-all group/close"
                >
                  <X size={20} className="group-hover/close:rotate-90 transition-transform duration-300" />
                </button>

                 {/* Image Header */}
                 <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden shrink-0">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover" 
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60`} />
                 </div>

                 <div className="p-8 md:p-12 flex flex-col bg-background">
                    <div className="mb-12">
                       {(() => {
                          const catInfo = CATEGORY_MAP[selectedProject.category] || { icon: 'Code2', color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/30', shadow: 'shadow-[0_0_15px_rgba(156,163,175,0.3)]', label: selectedProject.category };
                          const IconComp = {
                            BrainCircuit, Eye, Layers, Database, Zap, Sparkles, Code2
                          }[catInfo.icon] || Code2;
                          return (
                            <div className="flex items-center gap-6 mb-8">
                               <div className={`p-4 rounded-2xl border ${catInfo.bg} ${catInfo.border} ${catInfo.shadow}`}>
                                  <IconComp className={`w-7 h-7 ${catInfo.color}`} />
                               </div>
                               <div className="flex flex-col">
                                 <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white/50 mb-1">{catInfo.label}</span>
                                 <h3 className="text-3xl md:text-5xl font-black italic uppercase text-[#f97316] tracking-tight leading-none">{selectedProject.title}</h3>
                               </div>
                            </div>
                          );
                       })()}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                       <div className="space-y-10">
                          <div>
                             <h5 className="text-[10px] font-black uppercase text-accent/30 mb-4 tracking-[0.2em] flex items-center gap-2">
                                <span className="w-6 h-[1px] bg-accent" />
                                Mission Overview
                             </h5>
                             <p className="text-muted text-lg leading-relaxed font-medium">{selectedProject.fullDescription}</p>
                          </div>

                          <div>
                             <h5 className="text-[10px] font-black uppercase text-accent/30 mb-6 tracking-[0.2em] flex items-center gap-2">
                                <span className="w-6 h-[1px] bg-accent" />
                                Key Achievements
                             </h5>
                             <div className="space-y-3">
                                {selectedProject.highlights?.map((item, i) => (
                                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-surface/20 border border-borderColor hover:border-accent/20 transition-all group/item">
                                     <CheckCircle2 size={20} className="text-accent shrink-0 group-hover/item:scale-110 transition-transform" />
                                     <p className="text-muted text-[15px] font-medium leading-snug">{item}</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>

                       <div className="space-y-10">
                          <div>
                             <h5 className="text-[10px] font-black uppercase text-accent/30 mb-6 tracking-[0.2em] flex items-center gap-2">
                                <span className="w-6 h-[1px] bg-accent" />
                                Core Architecture
                             </h5>
                             <div className="grid grid-cols-2 gap-3">
                               {selectedProject.tags?.map((tag) => {
                                 const colorClass = "text-[#10b981] border-[#10b981]/30 hover:bg-[#10b981]/10 bg-[#10b981]/5";
                                 return (
                                 <div key={tag} className={`flex items-center gap-3 p-4 border rounded-2xl text-xs font-bold transition-all ${colorClass}`}>
                                   {skillIcons[tag] ? (
                                     <img src={skillIcons[tag]} alt={tag} loading="lazy" decoding="async" className="w-6 h-6 object-contain" />
                                   ) : (
                                     <Code2 size={16} />
                                   )}
                                   {tag}
                                 </div>
                               )})}
                             </div>
                          </div>

                          <div className="pt-10 border-t border-borderColor">
                             <div className="flex flex-col gap-4">
                                <a href={selectedProject.link} target="_blank" className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-[#7c3aed] text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-white hover:text-[#7c3aed] shadow-lg shadow-[#7c3aed]/20 transition-all group/btn">
                                   Launch Project
                                   <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </a>
                                <a href={selectedProject.github} target="_blank" className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl border border-white/10 hover:border-white/20 text-white text-xs font-black uppercase tracking-[0.2em] bg-transparent hover:bg-white/5 transition-all">
                                   <Github size={18} />
                                   Source Protocol
                                </a>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </m.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default Projects;
