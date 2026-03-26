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
    <div
      className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/5 hover:border-accent/20 transition-all duration-500 bg-surface/30 glass-card h-full relative"
    >
      {/* Dynamic Glow Effect */}
      <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${project.color || 'from-purple-500/20 to-blue-500/20'} blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700`} />
      
      <div className="relative w-full aspect-video overflow-hidden shrink-0">
         <img 
           src={project.image} 
           alt={project.title} 
           loading="lazy"
           decoding="async"
           referrerPolicy="no-referrer"
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
         
         <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <button 
              onClick={(e) => { e.stopPropagation(); onSelect(project); }}
              className="p-3 bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black text-white rounded-2xl transition-all duration-300 shadow-xl"
            >
               <ArrowRight size={18} />
            </button>
         </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
         <div className="mb-6">
            {(() => {
              const catInfo = CATEGORY_MAP[project.category] || { icon: 'Code2', color: 'text-gray-400', bg: 'bg-gray-400/10', border: 'border-gray-400/30', shadow: 'shadow-none', label: project.category };
              const IconComp = {
                BrainCircuit, Eye, Layers, Database, Zap, Sparkles, Code2
              }[catInfo.icon] || Code2;
              return (
                <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl border ${catInfo.bg} ${catInfo.border} shadow-sm transition-all duration-500 group-hover:rotate-12`}>
                        <IconComp className={`w-4 h-4 ${catInfo.color}`} />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] font-mono ${catInfo.color}`}>{catInfo.label}</span>
                   </div>
                   <h4 className="text-2xl font-black uppercase text-white group-hover:text-accent transition-colors duration-300 leading-tight">
                      {project.title}
                   </h4>
                </div>
              );
            })()}
         </div>
         
         <p className="text-muted text-[14px] leading-relaxed line-clamp-3 mb-8 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
           {project.description}
         </p>

         <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2">
            {project.tags?.slice(0, 5).map((tag) => (
              <span key={tag} className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-white hover:border-white/20 transition-all group/tag">
                {skillIcons[tag] ? (
                  <img 
                    src={skillIcons[tag]} 
                    alt={tag} 
                    className="w-3.5 h-3.5 object-contain opacity-60 group-hover/tag:opacity-100 transition-opacity" 
                  />
                ) : (
                  <Code2 size={12} className="opacity-60 group-hover/tag:opacity-100" />
                )}
                {tag}
              </span>
            ))}
            {project.tags?.length > 5 && (
              <span className="px-3 py-1.5 text-[10px] font-bold uppercase bg-white/5 border border-white/10 rounded-lg text-white/30">
                +{project.tags.length - 5}
              </span>
            )}
         </div>
      </div>
    </div>
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
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
             <Zap className="w-4 h-4 text-accent" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Selected Works</span>
          </div>
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
              className="grid md:grid-cols-2 gap-8"
            >
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex flex-col rounded-[2rem] bg-surface/40 border border-white/5 h-[500px] animate-pulse">
                  <div className="w-full aspect-video bg-surface/60 rounded-t-[2rem]" />
                  <div className="p-8 space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 bg-surface/60 rounded-xl" />
                       <div className="w-24 h-3 bg-surface/60 rounded" />
                    </div>
                    <div className="w-3/4 h-8 bg-surface/60 rounded-lg" />
                    <div className="space-y-3">
                      <div className="w-full h-3 bg-surface/60 rounded" />
                      <div className="w-5/6 h-3 bg-surface/60 rounded" />
                    </div>
                    <div className="flex gap-2 pt-6">
                      <div className="w-16 h-8 bg-surface/60 rounded-lg" />
                      <div className="w-16 h-8 bg-surface/60 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </m.div>
          ) : (
            <m.div 
              key="projects"
              className="grid md:grid-cols-2 gap-10"
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
