import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Wifi, Settings, ExternalLink, Briefcase, Eye, Database, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { skillIcons } from '../utils/skillIcons';

const ProfessionalDevelopment = memo(() => {
  const [trainings, setTrainings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const snap = await getDocs(collection(db, "trainings"));
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrainings(data.reverse());
      } catch (error) {
        console.error("Error fetching trainings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  const getTrainingIcon = (title, provider, isCompleted) => {
    const t = (title + " " + provider).toLowerCase();
    const iconClass = isCompleted ? "w-4 h-4 text-accent/50" : "w-4 h-4 text-accent";
    
    if (t.includes('vision') || t.includes('image')) return <Eye className={iconClass} />;
    if (t.includes('data')) return <Database className={iconClass} />;
    if (t.includes('ai') || t.includes('machine learning') || t.includes('deep learning')) return <Brain className={iconClass} />;
    if (t.includes('web') || t.includes('frontend') || t.includes('backend') || t.includes('react')) return <Code className={iconClass} />;
    if (t.includes('network') || t.includes('ccna') || t.includes('dey')) return <Wifi className={iconClass} />;
    return <Settings className={iconClass} />;
  };

  return (
    <section id="professional-development" className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-20 text-center">
          <motion.div 
             initial={{ opacity: 0, y: -20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "100px" }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent mb-6"
          >
             <Briefcase className="w-4 h-4 text-accent" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Continuous Growth</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
            Training & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Courses</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
             <div className="w-12 h-12 border-4 border-[#7c3aed] border-t-[#d8b4fe] rounded-full animate-spin" />
          </div>
        ) : trainings.length === 0 ? null : (
          <div className="relative border-l border-borderColor ml-4 md:ml-8 space-y-12 pb-12">
            {trainings.map((tr, index) => {
              const tColor = "text-[#f97316]";
              return (
              <motion.div 
                key={tr.id}
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline Bullet */}
                <div className={`absolute left-[-17px] top-6 w-8 h-8 rounded-full bg-background border-2 ${tr.isCompleted ? 'border-[#d8b4fe] shadow-none' : 'border-[#7c3aed] shadow-[0_0_15px_rgba(124,58,237,0.5)]'} flex items-center justify-center z-10 transition-colors`}>
                  {getTrainingIcon(tr.title, tr.provider, tr.isCompleted)}
                </div>

                {/* Content Card */}
                <div className="p-6 md:p-8 bg-surface/40 border border-white/5 hover:border-white/10 glass-card rounded-3xl backdrop-blur-xl transition-all duration-500 flex flex-col gap-4">
                  
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex flex-col gap-1.5">
                      <h3 className={`text-lg md:text-xl font-bold tracking-tight leading-snug ${tColor}`}>{tr.title}</h3>
                      <span className="text-white/50 font-medium uppercase text-[10px] tracking-widest">{tr.provider}</span>
                    </div>
                    
                    <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {tr.isCompleted ? (
                           <div className="flex items-center gap-1.5 px-3 py-1 border border-emerald-500/50 rounded-full text-emerald-500 text-[10px] uppercase font-black tracking-widest bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                             <CheckCircle2 size={12} /> DONE
                           </div>
                        ) : (
                           <div className="flex items-center gap-1.5 px-3 py-1 border border-amber-500/50 rounded-full text-amber-500 text-[10px] uppercase font-black tracking-widest bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                             <Clock size={12} /> ONGOING
                           </div>
                        )}
                        <div className="flex items-center gap-1.5 px-3 py-1 text-[#d8b4fe] bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest">
                           <Clock size={12} /> {tr.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {tr.description && (
                    <p className="text-[#a09eb5] text-sm leading-relaxed max-w-2xl mt-2">{tr.description}</p>
                  )}

                  {/* Skills (if any) */}
                  {tr.skillsListed && tr.skillsListed.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tr.skillsListed.map((skill, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-surface/20 border border-borderColor rounded-lg text-[9px] font-black uppercase tracking-wider text-accent/60 hover:text-accent hover:border-accent hover:bg-accent/10 transition-all cursor-default">
                          {skillIcons[skill] && <img src={skillIcons[skill]} alt={skill} loading="lazy" decoding="async" className="w-3.5 h-3.5 object-contain" />}
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  {tr.isCompleted && tr.certificateUrl && (
                    <div className="mt-4 flex shrink-0 border-t border-borderColor pt-6 w-full md:w-auto">
                      <a href={tr.certificateUrl} target="_blank" rel="noreferrer" className="w-full md:w-auto h-fit flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 hover:border-emerald-400 rounded-xl text-emerald-500 hover:text-accent text-[10px] font-black uppercase tracking-[0.2em] transition-all group/btn">
                        View Certificate
                        <ExternalLink className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )})}
          </div>
        )}
      </div>
    </section>
  );
});
export default ProfessionalDevelopment;
