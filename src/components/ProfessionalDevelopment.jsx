import { useEffect, useState, memo } from 'react';
import { m } from 'framer-motion';
import { Brain, Code, Wifi, Settings, ExternalLink, Briefcase, Eye, Database, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
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
          <m.div 
             initial={{ opacity: 0, y: -20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "100px" }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent mb-6"
          >
             <Briefcase className="w-4 h-4 text-accent" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Continuous Growth</span>
          </m.div>
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
              <m.div 
                key={tr.id}
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline Bullet */}
                <div className={`absolute left-[-17px] top-6 w-8 h-8 rounded-full bg-background border-2 border-[#7c3aed] shadow-[0_0_15px_rgba(124,58,237,0.5)] flex items-center justify-center z-10 transition-colors`}>
                  {getTrainingIcon(tr.title, tr.provider, false)}
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
                        <div className="flex items-center gap-1.5 px-3 py-1 text-[#d8b4fe] bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest">
                           <Clock size={12} /> {tr.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {tr.description && (
                    <p className="text-[#a09eb5] text-sm leading-relaxed max-w-2xl mt-2">{tr.description}</p>
                  )}


                </div>
              </m.div>
            )})}
          </div>
        )}
      </div>
    </section>
  );
});
export default ProfessionalDevelopment;
