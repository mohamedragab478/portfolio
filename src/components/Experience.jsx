import { motion } from 'framer-motion';
import { BrainCircuit, Network, Eye, Database, Cpu, MonitorPlay, Clock, CheckCircle2, Calendar } from 'lucide-react';

const experiences = [
  {
    title: "Computer Vision Specialized Training",
    company: "NTI",
    duration: "72 hrs",
    status: "Ongoing",
    icon: <Eye size={20} className="text-primary" />,
    description: "Advanced training in Computer Vision, exploring deep learning architectures for image and video analysis."
  },
  {
    title: "Data Science Professional Track",
    company: "DEPI",
    duration: "6 months",
    status: "Ongoing",
    icon: <Database size={20} className="text-primary" />,
    description: "Comprehensive data science pipeline training encompassing data wrangling, EDA, predictive modeling, and evaluation."
  },
  {
    title: "AI Track",
    company: "NTI / Huawei Egyptian Talent Academy",
    duration: "80 hrs",
    status: "Completed",
    icon: <BrainCircuit size={20} className="text-primary" />,
    description: "Intensive training program focused on core AI models, neural networks optimization, and practical deployment."
  },
  {
    title: "CCNA",
    company: "Digital Egypt Youth Program",
    duration: "120 hrs",
    status: "Completed",
    icon: <Network size={20} className="text-primary" />,
    description: "In-depth routing, switching, and networking fundamentals training for building scalable infrastructures."
  },
  {
    title: "IoT & Embedded Systems Internship",
    company: "NTI",
    duration: "120 hrs",
    status: "Completed",
    icon: <Cpu size={20} className="text-primary" />,
    description: "Hands-on internship designing embedded systems and integrating hardware with Internet of Things protocols."
  },
  {
    title: "NVIDIA Deep Learning Institute (DLI)",
    company: "NVIDIA",
    duration: "Training",
    status: "Completed",
    icon: <MonitorPlay size={20} className="text-primary" />,
    description: "Specialized training in deep learning fundamentals and GPU-accelerated computing applied to AI tasks."
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Training & Internships
            </h2>
            <div className="hidden md:block h-[2px] w-24 bg-primary/50" />
          </div>
          <p className="text-secondary font-medium tracking-tight">Technical Foundations & Intensive Programs</p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-8 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative ml-8 md:ml-0 group"
            >
              {/* Timeline Node */}
              <div className={`absolute -left-[45px] md:-left-[57px] w-12 h-12 bg-[#05011a] border-2 rounded-full flex items-center justify-center top-0 transition-colors duration-300 ${exp.status === 'Ongoing' ? 'border-primary shadow-[0_0_15px_rgba(124,58,237,0.4)]' : 'border-white/10 group-hover:border-primary/50'}`}>
                {exp.icon}
              </div>
              
              {/* Content Card */}
              <div className={`p-6 md:p-8 rounded-3xl bg-white/5 border transition-all duration-300 ${exp.status === 'Ongoing' ? 'border-primary/50 shadow-[0_0_30px_rgba(124,58,237,0.1)]' : 'border-white/10 hover:border-primary/30'}`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">{exp.title}</h3>
                    <h4 className="text-sm md:text-base text-primary font-semibold">{exp.company}</h4>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        exp.status === 'Ongoing' 
                          ? 'border-primary/50 bg-primary/10 text-primary' 
                          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      }`}>
                      {exp.status === 'Ongoing' ? <Clock size={12} /> : <CheckCircle2 size={12} />}
                      {exp.status}
                    </span>
                    <span className="flex items-center gap-1.5 text-secondary/60 text-xs font-bold uppercase tracking-wider">
                      <Calendar size={12} />
                      {exp.duration}
                    </span>
                  </div>
                </div>
                
                <p className="text-secondary leading-relaxed text-sm md:text-base">
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
