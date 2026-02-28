import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Activity, Cpu, Scan, Box } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "ThyraX",
      category: "AI Medical Research",
      description: "Next-gen feature fusion pipeline for diagnostic precision in high-resolution medical imaging.",
      icon: <Activity />,
      tags: ["PyTorch", "Medical", "ResNet"]
    },
    {
      title: "Vision Pipeline",
      category: "Vision Ecosystem",
      description: "Gesture-based biometric control system integrating real-time detection on low-latency edge nodes.",
      icon: <Scan />,
      tags: ["OpenCV", "C++", "RT-Detection"]
    },
    {
      title: "Edge Engine",
      category: "Embedded AI",
      description: "Optimized YOLOv11 deployment on Jetson platforms for high-fidelity real-time tracking.",
      icon: <Cpu />,
      tags: ["TensorRT", "Edge", "YOLOv11"]
    },
    {
      title: "Aura MLOps",
      category: "Infrastructure",
      description: "Automated end-to-end data processing for high-volume vision and multi-modal datasets.",
      icon: <Box />,
      tags: ["Docker", "MLOps", "Automated"]
    }
  ];

  return (
    <section id="projects" className="section-padding bg-transparent">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
        <div className="max-w-3xl">
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-6">Research Portfolio</h2>
          <h3 className="text-4xl md:text-6xl font-black italic">Advanced <br /><span className="gradient-text">Deployments.</span></h3>
          <p className="text-secondary mt-8 text-lg font-medium leading-relaxed">
            Pioneering engineering solutions through rigorous prototyping and field-tested architectural deployments.
          </p>
        </div>
        <a href="https://github.com/amerelfalwo" target="_blank" rel="noopener" className="px-10 py-5 glass-card border-primary/30 hover:bg-primary/10 flex items-center gap-3 font-black uppercase text-xs tracking-widest transition-all">
           Archives <Github size={20} />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="group glass-card overflow-hidden border-white/5 hover:border-primary/30"
          >
             <div className="p-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-10">
                   <div className="p-5 bg-primary/10 rounded-3xl text-primary group-hover:bg-primary group-hover:glow-aura group-hover:text-white transition-all">
                      {p.icon}
                   </div>
                   <a href="#" className="p-4 glass-card border-white/10 hover:border-primary transition-all">
                     <ArrowUpRight size={22} className="text-secondary group-hover:text-primary" />
                   </a>
                </div>
                
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-3">{p.category}</span>
                <h4 className="text-3xl font-black mb-6 group-hover:text-white transition-colors uppercase italic tracking-tighter">{p.title}</h4>
                <p className="text-secondary text-base font-medium mb-12 leading-relaxed flex-grow">{p.description}</p>
                
                <div className="flex flex-wrap gap-3 pt-10 border-t border-white/5">
                   {p.tags.map((t, ti) => (
                     <span key={ti} className="text-[10px] font-black px-4 py-1.5 bg-white/5 rounded-full text-secondary/60 border border-white/5">
                        {t}
                     </span>
                   ))}
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
