import { motion } from 'framer-motion';
import { BrainCircuit, Network, Eye, Database, Cpu, MonitorPlay, Clock, CheckCircle2, Calendar } from 'lucide-react';

const experiences = [
  {
    title: "Computer Vision Specialized Training",
    company: "NTI",
    duration: "72 hrs",
    status: "Ongoing",
    icon: <Eye size={20} className="w-5 h-5 text-[#d8b4fe]" />,
    description: "Advanced training in Computer Vision, exploring deep learning architectures for image and video analysis."
  },
  {
    title: "Data Science Professional Track",
    company: "DEPI",
    duration: "6 months",
    status: "Ongoing",
    icon: <Database size={20} className="w-5 h-5 text-[#d8b4fe]" />,
    description: "Comprehensive data science pipeline training encompassing data wrangling, EDA, predictive modeling, and evaluation."
  },
  {
    title: "AI Track",
    company: "NTI / Huawei Egyptian Talent Academy",
    duration: "80 hrs",
    status: "Completed",
    icon: <BrainCircuit size={20} className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />,
    description: "Intensive training program focused on core AI models, neural networks optimization, and practical deployment."
  },
  {
    title: "CCNA",
    company: "Digital Egypt Youth Program",
    duration: "120 hrs",
    status: "Completed",
    icon: <Network size={20} className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />,
    description: "In-depth routing, switching, and networking fundamentals training for building scalable infrastructures."
  },
  {
    title: "IoT & Embedded Systems Internship",
    company: "NTI",
    duration: "120 hrs",
    status: "Completed",
    icon: <Cpu size={20} className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />,
    description: "Hands-on internship designing embedded systems and integrating hardware with Internet of Things protocols."
  },
  {
    title: "NVIDIA Deep Learning Institute (DLI)",
    company: "NVIDIA",
    duration: "Training",
    status: "Completed",
    icon: <MonitorPlay size={20} className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />,
    description: "Specialized training in deep learning fundamentals and GPU-accelerated computing applied to AI tasks."
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#7c3aed]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:mb-28 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-surface/30 backdrop-blur-md mb-8">
            <Network className="w-4 h-4 text-[#d8b4fe]" />
            <span className="text-[#d8b4fe] text-xs font-bold tracking-[0.2em] uppercase">Milestones</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
            Training & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Internships</span>
          </h2>
          <p className="text-muted/70 font-medium tracking-tight max-w-2xl text-lg leading-relaxed mx-auto md:mx-0">
            Technical foundations and intensive programs building the engineering backbone.
          </p>
        </motion.div>

        <div className="relative border-l border-[#7c3aed]/20 ml-6 md:ml-8 space-y-12 pb-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Node */}
              <div 
                className={`absolute -left-[25px] w-12 h-12 bg-surface/80 backdrop-blur-xl border-2 rounded-full flex items-center justify-center top-4 transition-all duration-500 z-10 ${
                  exp.status === 'Ongoing' 
                    ? 'border-[#d8b4fe] shadow-lg shadow-[#d8b4fe]/20' 
                    : 'border-[#7c3aed]/30 group-hover:border-[#7c3aed] group-hover:bg-[#7c3aed]/20'
                }`}
              >
                {exp.icon}
              </div>
              
              {/* Content Card */}
              <div 
                className={`group/card relative flex flex-col p-8 md:p-10 rounded-[2.5rem] border transition-all duration-500 overflow-hidden cursor-default ${
                  exp.status === 'Ongoing' 
                    ? 'border-[#d8b4fe]/30 bg-[#7c3aed]/5 shadow-xl shadow-[#7c3aed]/10' 
                    : 'border-white/5 bg-surface/20 hover:bg-surface/40 hover:border-[#7c3aed]/30 hover:shadow-lg hover:shadow-[#7c3aed]/5'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/0 via-[#7c3aed]/5 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <div className="z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight group-hover/card:text-[#d8b4fe] transition-colors leading-tight">{exp.title}</h3>
                    <h4 className="text-sm md:text-base text-[#d8b4fe]/80 font-bold uppercase tracking-widest">{exp.company}</h4>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-3 shrink-0 flex-wrap">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        exp.status === 'Ongoing' 
                          ? 'border-[#d8b4fe]/50 bg-[#d8b4fe]/10 text-[#d8b4fe]' 
                          : 'border-white/10 bg-white/5 text-muted/60'
                      }`}>
                      {exp.status === 'Ongoing' ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                      {exp.status}
                    </span>
                    <span className="flex items-center gap-1.5 text-muted/50 text-[10px] font-bold uppercase tracking-widest bg-surface/30 px-3 py-1.5 rounded-full border border-white/5">
                      <Calendar size={12} />
                      {exp.duration}
                    </span>
                  </div>
                </div>
                
                <p className="z-10 text-muted/70 leading-relaxed text-sm md:text-base font-medium max-w-2xl">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
