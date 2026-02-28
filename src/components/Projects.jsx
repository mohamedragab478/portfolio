import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Github, X, Code2, Database, Cpu, 
  Globe, ChevronDown, ChevronUp, ArrowRight, Info,
  Layers, Settings, Box, Workflow, Monitor, Server,
  Terminal, Search, Activity, Share2, Zap, CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { projectsData as projects } from '../data/projectsData';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);

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

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
             <Zap className="w-4 h-4 text-primary" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Selected Works</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none mb-6">
            Featured <span className="gradient-text">Exploits.</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            className="grid lg:grid-cols-2 gap-8"
            layout
          >
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className={`group flex flex-col md:flex-row overflow-hidden rounded-[1.2rem] border-2 ${project.border} ${project.glow} hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 bg-[#05011a]/80 backdrop-blur-xl h-full md:h-[240px]`}
            >
              <div className="relative w-full md:w-[38%] h-[160px] md:h-full overflow-hidden shrink-0">
                 <img 
                   src={project.image} 
                   alt={project.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
                 <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30 group-hover:opacity-10 transition-opacity`} />
              </div>

              <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
                 <div>
                    <div className="flex justify-between items-start mb-2">
                       <div>
                          <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${project.accent}`}>{project.category}</span>
                          <h4 className="text-lg font-black uppercase mt-1 text-white tracking-tight">{project.title}</h4>
                       </div>
                       <button 
                         onClick={() => setSelectedProject(project)}
                         className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-full transition-all text-[8px] font-black uppercase tracking-wider shadow-lg shadow-primary/20"
                       >
                          Details
                          <ArrowRight size={12} />
                       </button>
                    </div>
                    
                    <p className="text-secondary text-[12px] leading-tight line-clamp-2 md:line-clamp-3 mb-4 font-medium">
                      {project.description}
                    </p>
                 </div>

                 <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {project.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1.5 px-2 py-1 text-[8px] font-black uppercase bg-white/5 border border-white/10 rounded-md text-white/80 transition-all hover:border-primary/30">
                        {skillIcons[tag] ? (
                          <img src={skillIcons[tag]} alt={tag} className="w-3 h-3 object-contain" />
                        ) : (
                          <Code2 size={10} />
                        )}
                        {tag}
                      </span>
                    ))}
                 </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-14 text-center">
         <button 
           onClick={() => setShowAll(!showAll)}
           className="px-10 py-4 bg-primary rounded-full shadow-[0_10px_30px_rgba(124,58,237,0.3)] hover:shadow-primary/50 text-white text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 mx-auto transition-all"
         >
           {showAll ? "Show Less" : "Discover More"}
           {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
         </button>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex justify-center p-4 overflow-y-auto pt-32 pb-12">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedProject(null)}
               className="fixed inset-0 bg-black/95 backdrop-blur-xl"
             />
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 40 }}
               className="relative w-full max-w-4xl h-fit bg-[#030014] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] flex flex-col"
             >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-50 p-3 bg-black/50 backdrop-blur-md hover:bg-black/70 border border-white/10 rounded-2xl text-white transition-all group/close"
                >
                  <X size={20} className="group-hover/close:rotate-90 transition-transform duration-300" />
                </button>

                 {/* Image Header - Full Width & Clean */}
                 <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden shrink-0">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60`} />
                 </div>

                 <div className="p-8 md:p-12 flex flex-col bg-[#030014]">
                    {/* Title & Category - Moved below image */}
                    <div className="mb-12">
                       <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${selectedProject.accent} mb-3`}>{selectedProject.category}</p>
                       <h3 className="text-4xl md:text-6xl font-black italic uppercase text-white tracking-tight leading-none">{selectedProject.title}</h3>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                       {/* Left Column: Description & Highlights */}
                       <div className="space-y-10">
                          <div>
                             <h5 className="text-[10px] font-black uppercase text-white/30 mb-4 tracking-[0.2em] flex items-center gap-2">
                                <span className="w-6 h-[1px] bg-primary" />
                                Mission Overview
                             </h5>
                             <p className="text-secondary text-lg leading-relaxed font-medium">{selectedProject.fullDescription}</p>
                          </div>

                          <div>
                             <h5 className="text-[10px] font-black uppercase text-white/30 mb-6 tracking-[0.2em] flex items-center gap-2">
                                <span className="w-6 h-[1px] bg-primary" />
                                Key Achievements
                             </h5>
                             <div className="space-y-3">
                                {selectedProject.highlights.map((item, i) => (
                                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group/item">
                                     <CheckCircle2 size={20} className="text-primary shrink-0 group-hover/item:scale-110 transition-transform" />
                                     <p className="text-secondary text-[15px] font-medium leading-snug">{item}</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>

                       {/* Right Column: Stack & Actions */}
                       <div className="space-y-10">
                          <div>
                             <h5 className="text-[10px] font-black uppercase text-white/30 mb-6 tracking-[0.2em] flex items-center gap-2">
                                <span className="w-6 h-[1px] bg-primary" />
                                Core Architecture
                             </h5>
                             <div className="grid grid-cols-2 gap-3">
                               {selectedProject.tags.map(tag => (
                                 <div key={tag} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-white/80 hover:border-primary/30 hover:bg-white/10 transition-all">
                                   {skillIcons[tag] ? (
                                     <img src={skillIcons[tag]} alt={tag} className="w-6 h-6 object-contain" />
                                   ) : (
                                     <Code2 size={16} />
                                   )}
                                   {tag}
                                 </div>
                               ))}
                             </div>
                          </div>

                          <div className="pt-10 border-t border-white/5">
                             <div className="flex flex-col gap-4">
                                <a href={selectedProject.link} target="_blank" className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-[0.2em] hover:brightness-110 shadow-2xl shadow-primary/30 transition-all group/btn">
                                   Launch Project
                                   <ExternalLink size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </a>
                                <a href={selectedProject.github} target="_blank" className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl border-2 border-white/10 hover:border-white/20 text-white text-xs font-black uppercase tracking-[0.2em] bg-white/5 transition-all">
                                   <Github size={18} />
                                   Source Protocol
                                </a>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
