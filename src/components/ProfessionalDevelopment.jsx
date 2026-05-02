import { useEffect, useState, memo } from 'react';
import { m } from 'framer-motion';
import { Brain, Code, Wifi, Settings, Briefcase, Eye, Database, Clock, Calendar } from 'lucide-react';
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
        // Filter to only show ongoing trainings
        const ongoingTrainings = data.filter(t => !t.isCompleted);
        setTrainings(ongoingTrainings.reverse());
      } catch (error) {
        console.error("Error fetching trainings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  const getTrainingIcon = (title, provider) => {
    const t = (title + " " + provider).toLowerCase();
    const iconClass = "w-4 h-4 text-[#d8b4fe]";
    
    if (t.includes('vision') || t.includes('image')) return <Eye className={iconClass} />;
    if (t.includes('data')) return <Database className={iconClass} />;
    if (t.includes('ai') || t.includes('machine learning') || t.includes('deep learning')) return <Brain className={iconClass} />;
    if (t.includes('web') || t.includes('frontend') || t.includes('backend') || t.includes('react')) return <Code className={iconClass} />;
    if (t.includes('network') || t.includes('ccna') || t.includes('dey')) return <Wifi className={iconClass} />;
    return <Settings className={iconClass} />;
  };

  return (
    <section id="professional-development" className="py-24 relative z-10 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-20 text-center">
          <m.div 
             initial={{ opacity: 0, y: -20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "100px" }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 shadow-sm"
          >
             <Briefcase className="w-4 h-4 text-accent" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Continuous Growth</span>
          </m.div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
            Ongoing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Training</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 flex-col items-center gap-4">
             <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin" />
             <p className="text-white/50 tracking-[0.3em] uppercase text-[10px] font-bold animate-pulse">Loading Data</p>
          </div>
        ) : trainings.length === 0 ? (
          <div className="text-center text-white/40 font-medium py-10">No ongoing training at the moment.</div>
        ) : (
          <div className="relative ml-4 md:ml-8 space-y-12 pb-12">
            {/* Neural Circuit Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-fuchsia-500 to-purple-500 opacity-50 blur-[1px]" />
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-purple-400 opacity-80" />

            {trainings.map((tr, index) => {
              return (
              <m.div 
                key={tr.id}
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline Bullet (Pulsing) */}
                <m.div 
                  animate={{ boxShadow: ['0px 0px 0px 0px rgba(168,85,247,0)', '0px 0px 15px 5px rgba(168,85,247,0.4)', '0px 0px 0px 0px rgba(168,85,247,0)'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-[-15px] top-6 w-8 h-8 rounded-full bg-slate-900 border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)] flex items-center justify-center z-10 transition-colors group-hover:border-purple-400 group-hover:bg-purple-900/40"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                </m.div>

                {/* Content Card */}
                <div className="p-6 md:p-8 bg-slate-900/40 border border-slate-700/50 hover:border-purple-500/50 shadow-sm hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] rounded-[2rem] transition-all duration-500 flex flex-col gap-4 backdrop-blur-md">
                  
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-lg md:text-xl font-bold tracking-tight leading-snug text-white/90 group-hover:text-white transition-colors">{tr.title}</h3>
                      <span className="text-purple-400/80 font-bold uppercase text-[10px] tracking-widest">{tr.provider}</span>
                    </div>
                    
                    <div className="flex flex-col items-start md:items-end gap-2.5 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] uppercase font-black tracking-widest">
                            <Clock size={12} /> ONGOING
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 text-white/50 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest">
                           <Calendar size={12} /> {tr.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {tr.description && (
                    <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mt-2 font-medium group-hover:text-slate-300 transition-colors">{tr.description}</p>
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
