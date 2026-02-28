import { motion } from 'framer-motion';
import { Layers, Shield, Cpu, Code2, Database, Globe } from 'lucide-react';

const Skills = () => {
  const categories = [
    { title: "Deep Learning", icon: <Layers size={20} />, list: ["PyTorch", "TensorFlow", "CNN/RNN", "ANN"] },
    { title: "Computer Vision", icon: <Cpu size={20} />, list: ["OpenCV", "YOLO v11", "Segmentation", "Detection"] },
    { title: "NLP & RAG", icon: <Globe size={20} />, list: ["LLMs", "LangChain", "Vector DBs", "RAG"] },
    { title: "Embedded & IoT", icon: <Shield size={20} />, list: ["Jetson Nano", "ESP32", "C++", "RTOS"] },
    { title: "Development", icon: <Code2 size={20} />, list: ["React", "Python", "Tailwind", "Git"] },
    { title: "Infrastructure", icon: <Database size={20} />, list: ["Docker", "MLOps", "Linux", "MLflow"] },
  ];

  return (
    <section id="skills" className="section-padding bg-transparent relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="text-center mb-24">
        <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-4">Stack Intelligence</h2>
        <h3 className="text-4xl md:text-5xl font-black italic">Core <span className="gradient-text">Competencies.</span></h3>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8 }}
            className="glass-card p-10 border-white/5 hover:border-primary/40 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
               {cat.icon}
            </div>
            <div className="flex items-center gap-4 mb-10">
               <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  {cat.icon}
               </div>
               <h4 className="text-lg font-black tracking-tight uppercase">{cat.title}</h4>
            </div>
            <div className="flex flex-wrap gap-3">
               {cat.list.map((skill, si) => (
                 <span key={si} className="text-[10px] uppercase font-black px-4 py-1.5 bg-white/5 rounded-xl border border-white/5 text-secondary hover:text-white hover:border-primary/30 transition-all">
                    {skill}
                 </span>
               ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
