import { useState, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, ExternalLink, Github, CheckCircle2 
} from 'lucide-react';

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
  "Firebase": "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-original.svg",
};

/**
 * Calculates the shortest distance between two indices in a circular array
 */
const getOffset = (index, currentIndex, total) => {
  let diff = index - currentIndex;
  const half = Math.floor(total / 2);
  
  // Wrap around
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  
  return diff;
};

const ProjectCube = ({ projects, category, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useCallback((direction) => {
    setCurrentIndex((prev) => {
      let next = prev + direction;
      if (next < 0) next = projects.length - 1;
      if (next >= projects.length) next = 0;
      return next;
    });
  }, [projects.length]);

  if (!projects || projects.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 overflow-hidden font-sans">
      {/* Backdrop */}
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
      />

      {/* Main Container - establishes 3D perspective */}
      <div 
        className="relative w-full max-w-[100vw] h-[85vh] sm:h-[80vh] flex items-center justify-center" 
        style={{ perspective: "1500px" }}
      >
        
        {/* Navigation & Header Layer */}
        <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4 pointer-events-none max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <h2 className="text-slate-800 font-black uppercase tracking-widest text-sm md:text-base bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
              {category}
            </h2>
            <div className="text-white bg-slate-800/50 backdrop-blur-md px-3 py-1 rounded-full text-sm font-mono font-bold">
              {currentIndex + 1} / {projects.length}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition-all pointer-events-auto shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* 3D Coverflow Wrapper */}
        <div className="relative w-full h-full pt-16 pb-20 sm:pb-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          
          {projects.map((project, index) => {
             const offset = getOffset(index, currentIndex, projects.length);
             const isCenter = offset === 0;
             // Only render items that are somewhat visible to save performance
             const isVisible = Math.abs(offset) <= 3;

             if (!isVisible) return null;

             const rotateY = offset * -35; 
             const z = Math.abs(offset) * -400;
             const x = `${offset * 75}%`; 
             const opacity = isCenter ? 1 : Math.max(0, 0.7 - Math.abs(offset) * 0.2);
             const scale = 1 - Math.abs(offset) * 0.05;

             return (
               <m.div
                 key={project.id || index}
                 initial={false}
                 animate={{
                   rotateY,
                   z,
                   x,
                   scale,
                   opacity,
                 }}
                 transition={{ 
                   type: "spring", 
                   stiffness: 250, 
                   damping: 30,
                   mass: 0.8
                 }}
                 style={{
                   position: "absolute",
                   width: "100%",
                   maxWidth: "900px",
                   height: "100%",
                   transformStyle: "preserve-3d",
                   zIndex: 50 - Math.abs(offset),
                 }}
                 className="flex items-center justify-center"
               >
                 {/* Card Face */}
                 <div 
                   className={`relative w-full h-full bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl transition-colors duration-300 ${!isCenter ? 'hover:border-sky-300 cursor-pointer' : 'shadow-sky-500/10 border-sky-100'}`}
                   onClick={() => {
                     if (!isCenter) navigate(offset);
                   }}
                 >
                   {/* Invisible overlay for background cards to catch clicks and prevent interaction with inside buttons */}
                   {!isCenter && <div className="absolute inset-0 z-50" />}

                   {/* Image Section */}
                   <div className="relative w-full lg:w-[45%] h-64 lg:h-full shrink-0 overflow-hidden bg-slate-100">
                     <img 
                       src={project.image || '/api/placeholder/800/600'} 
                       alt={project.title}
                       className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-white/20" />
                     
                     {/* Tech Tags Overlay */}
                     <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                       {project.techStack?.map((tag) => (
                         <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200 text-[10px] font-bold text-slate-700 tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                           {skillIcons[tag] && (
                             <img src={skillIcons[tag]} alt="" className="w-3 h-3 object-contain" />
                           )}
                           {tag}
                         </span>
                       ))}
                     </div>
                   </div>

                   {/* Content Section */}
                   <div className="flex-1 flex flex-col p-6 sm:p-10 lg:p-12 overflow-y-auto custom-scrollbar bg-white">
                     <h3 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight mb-6">
                       {project.title}
                     </h3>
                     
                     <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 font-medium">
                       {project.fullDescription || project.description}
                     </p>

                     {/* Highlights / Key Results */}
                     {project.highlights && project.highlights.length > 0 && (
                       <div className="mb-10 space-y-3">
                         <h4 className="text-xs font-black tracking-[0.2em] uppercase text-sky-500 mb-4">Key Results</h4>
                         {project.highlights.map((item, idx) => (
                           <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-colors">
                             <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                             <span className="text-sm text-slate-600 leading-relaxed font-medium">{item}</span>
                           </div>
                         ))}
                       </div>
                     )}

                     {/* Actions */}
                     <div className="mt-auto pt-8 border-t border-slate-100 flex flex-wrap gap-4">
                       {project.link && (
                         <a 
                           href={project.link} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-widest shadow-sm transition-all pointer-events-auto"
                         >
                           Launch Project <ExternalLink size={16} />
                         </a>
                       )}
                       {project.github && (
                         <a 
                           href={project.github} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest hover:bg-slate-200 hover:border-slate-300 transition-all pointer-events-auto"
                         >
                           <Github size={16} /> Source Code
                         </a>
                       )}
                     </div>
                   </div>

                 </div>
               </m.div>
             );
          })}
        </div>

        {/* Navigation Buttons */}
        {projects.length > 1 && (
          <>
            <button 
              onClick={() => navigate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/80 hover:bg-white border border-slate-200 text-slate-600 shadow-md transition-all backdrop-blur-md hidden sm:block"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => navigate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/80 hover:bg-white border border-slate-200 text-slate-600 shadow-md transition-all backdrop-blur-md hidden sm:block"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Mobile Nav Indicators */}
            <div className="absolute bottom-6 left-0 right-0 z-50 flex justify-center gap-6 sm:hidden pointer-events-none">
               <button onClick={() => navigate(-1)} className="pointer-events-auto p-4 rounded-full bg-white shadow-md text-slate-600 border border-slate-200"><ChevronLeft size={20} /></button>
               <button onClick={() => navigate(1)} className="pointer-events-auto p-4 rounded-full bg-white shadow-md text-slate-600 border border-slate-200"><ChevronRight size={20} /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCube;
