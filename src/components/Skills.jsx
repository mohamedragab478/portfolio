import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useState, useEffect, memo, useMemo } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MarqueeRow = memo(({ items, direction = 1 }) => (
  <div className="flex overflow-hidden py-4 group">
    <motion.div 
      animate={{ 
        x: direction > 0 ? [0, "-100%"] : ["-100%", 0] 
      }}
      transition={{ 
        duration: 40, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="flex gap-6 whitespace-nowrap min-w-full items-center pl-6"
    >
      {[...items, ...items, ...items].map((skill, idx) => (
        <div 
          key={idx}
          className="flex items-center gap-4 px-8 py-5 rounded-3xl border border-white/5 bg-surface/20 hover:bg-surface/40 hover:border-[#7c3aed]/30 shadow-lg shadow-transparent hover:shadow-[#7c3aed]/5 transition-all duration-500 overflow-hidden relative group/skill shrink-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/0 via-[#7c3aed]/10 to-transparent translate-x-[-100%] group-hover/skill:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
          
          <div className="w-8 h-8 flex items-center justify-center z-10 bg-white/5 rounded-xl p-1.5 border border-white/5 group-hover/skill:bg-[#7c3aed]/20 transition-colors">
            <img 
              src={skill.icon} 
              alt={skill.name} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain filter group-hover/skill:scale-110 transition-transform duration-500" 
            />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-muted/60 group-hover/skill:text-white transition-colors duration-500 z-10">
            {skill.name}
          </span>
        </div>
      ))}
    </motion.div>
  </div>
));

MarqueeRow.displayName = 'MarqueeRow';

const Skills = memo(() => {
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [toolsLibraries, setToolsLibraries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "skills"));
        const allSkills = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setTechnicalSkills(allSkills.filter(s => s.category === "Technical Skills" || !s.category));
        setToolsLibraries(allSkills.filter(s => s.category === "Tools & Libraries" || s.category === "Tools"));
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-[#7c3aed]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-[#d8b4fe]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-20 md:mb-28 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-surface/30 backdrop-blur-md mb-8">
             <Zap className="w-4 h-4 text-[#d8b4fe]" />
             <span className="text-[#d8b4fe] text-xs font-bold tracking-[0.2em] uppercase">Technical Arsenal</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
            Powering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Future</span>
          </h2>
          <p className="text-muted/70 font-medium tracking-tight max-w-2xl mx-auto text-lg leading-relaxed">
            The meticulously curated stack I utilize to build scalable machine learning models and high-performance applications.
          </p>
        </motion.div>
      </div>

      {!isLoading && (
        <div className="relative flex flex-col w-full max-w-[100vw] z-10">
          <MarqueeRow items={technicalSkills} direction={1} />
          <MarqueeRow items={toolsLibraries} direction={-1} />
        </div>
      )}
    </section>
  );
});

export default Skills;
