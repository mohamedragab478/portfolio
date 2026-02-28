import { motion } from 'framer-motion';
import { ShieldCheck, Database, Layout, Globe, Command, Award, Layers } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding bg-transparent relative">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        {/* Left: Creative Image Display */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative px-8 md:px-0"
        >
          <div className="relative mx-auto w-full max-w-[500px]">
             {/* Background Layers */}
             <div className="absolute -inset-4 bg-primary/10 rounded-3xl -rotate-6 transition-transform group-hover:rotate-0 duration-700" />
             <div className="absolute -inset-4 border border-white/5 rounded-3xl rotate-3" />
             
             {/* Main Image Frame */}
             <div className="relative z-10 aspect-[4/5] rounded-3xl glass-card border-white/10 shadow-2xl group">
                <img 
                  src="/my_img.jpeg" 
                  alt="Amir Elrefai" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                />
                
                {/* Floating Tags/Labels */}
                <div className="absolute top-8 left-8 p-3 glass-card border-primary/30 backdrop-blur-md animate-bounce group-hover:animate-none">
                   <Award className="text-primary w-5 h-5" />
                </div>
                <div className="absolute bottom-8 right-8 p-3 glass-card border-indigo-500/30 backdrop-blur-md">
                   <Command className="text-white w-5 h-5" />
                </div>
                
                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-40" />
             </div>

             {/* Orbital Elements */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute -inset-16 border border-white/5 rounded-full pointer-events-none"
             >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full blur-[2px] shadow-[0_0_15px_rgba(124,58,237,0.8)]" />
             </motion.div>
          </div>

          {/* Floating Achievements/Tech Stack */}
          <div className="absolute -bottom-10 -left-6 z-20 flex flex-col gap-4">
             <motion.div 
               whileHover={{ x: 10 }}
               className="px-6 py-3 glass-card border-white/10 flex items-center gap-3 shadow-xl"
             >
                <Layers className="text-primary w-5 h-5" />
                <span className="text-[10px] items-center font-black uppercase tracking-[0.2em]">Full-Stack AI</span>
             </motion.div>
          </div>
        </motion.div>

        {/* Right: Expert Story */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:pl-10"
        >
          <div className="flex items-center gap-4 mb-8">
             <div className="h-[1px] w-12 bg-primary/50" />
             <h2 className="text-xs font-black text-primary uppercase tracking-[0.5em]">Visionary Engineering</h2>
          </div>
          
          <h3 className="text-5xl md:text-6xl font-black mb-10 leading-[1.1] uppercase italic">
            Architecting <span className="gradient-text">Scalable</span> <br /> 
            Digital Frontiers.
          </h3>
          
          <p className="text-secondary text-lg mb-12 leading-relaxed font-medium tracking-tight">
            I specialize in engineering high-performance <span className="text-white">AI ecosystems</span> that bridge the gap between 
            complex research and efficient production deployments. My approach combines 
            deep technical expertise with a relentless focus on <span className="text-white">optimization and precision</span>.
          </p>

          <div className="grid sm:grid-cols-2 gap-12 mb-16">
            <div className="group">
              <div className="flex items-center gap-4 text-white mb-4">
                 <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Database size={18} className="text-primary" />
                 </div>
                 <span className="font-black uppercase text-[11px] tracking-[0.2em]">Neural Architectures</span>
              </div>
              <p className="text-secondary text-xs leading-relaxed font-bold opacity-80">Designing complex models tailored for specialized inference tasks.</p>
            </div>
            <div className="group">
              <div className="flex items-center gap-4 text-white mb-4">
                 <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Layout size={18} className="text-primary" />
                 </div>
                 <span className="font-black uppercase text-[11px] tracking-[0.2em]">Eco-System Ops</span>
              </div>
              <p className="text-secondary text-xs leading-relaxed font-bold opacity-80">Scalable MLOps pipelines ensuring stability at global scale.</p>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 gap-10 border-t border-white/5 pt-12">
             <div className="flex flex-col">
                <span className="text-5xl font-black italic text-primary">12+</span>
                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-secondary mt-2">Core Deployments</span>
             </div>
             <div className="flex flex-col">
                <span className="text-5xl font-black italic text-white flex items-center">
                  99<span className="text-primary">%</span>
                </span>
                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-secondary mt-2">Precision Rate</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
