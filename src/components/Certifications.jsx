import { motion } from 'framer-motion';
import { Award, ExternalLink, Loader, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const snap = await getDocs(collection(db, "certifications"));
        setCertifications(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCerts();
  }, []);

  return (
    <section id="certifications" className="py-32 relative overflow-hidden">
      {/* Premium Ambient Background */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#7c3aed]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:mb-28 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-surface/30 backdrop-blur-md mb-8">
            <Award className="w-4 h-4 text-[#d8b4fe]" />
            <span className="text-[#d8b4fe] text-xs font-bold tracking-[0.2em] uppercase">Qualifications</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Endorsements</span>
          </h2>
          <p className="text-muted/70 font-medium tracking-tight max-w-2xl mx-auto text-lg leading-relaxed">
            Certified expertise in state-of-the-art AI technologies and frameworks, validated by industry leaders.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader className="w-10 h-10 text-[#7c3aed] animate-spin" />
            <p className="text-muted/50 tracking-[0.3em] uppercase text-[10px] font-bold animate-pulse">Retrieving Credentials</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-10 rounded-[2rem] border border-white/5 bg-surface/20 hover:bg-surface/40 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-default"
              >
                  {/* Subtle sweeping hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/0 via-[#7c3aed]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                  
                  {/* Left Side: Info */}
                  <div className="flex-1 z-10 w-full md:w-auto">
                     <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#d8b4fe] bg-[#7c3aed]/10 px-3 py-1 rounded-full border border-[#7c3aed]/20">
                           {cert.issuer}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-muted/60">
                           {cert.date || cert.duration}
                        </span>
                     </div>
                     
                     <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight group-hover:text-[#d8b4fe] transition-colors leading-tight">
                        {cert.title}
                     </h3>
                  </div>

                  {/* Right Side: Badges, Skills, Actions */}
                  <div className="flex flex-col items-start md:items-end gap-4 mt-6 md:mt-0 z-10 shrink-0">
                     
                     <div className="flex flex-wrap items-center justify-end gap-3 md:mt-auto">
                        {cert.isVerified !== false ? (
                           cert.verificationUrl ? (
                              <a href={cert.verificationUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/50 hover:bg-emerald-500 hover:border-emerald-400 rounded-xl text-emerald-400 hover:text-accent text-[11px] font-black uppercase tracking-[0.2em] transition-all group/btn shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                <CheckCircle2 size={16} /> VERIFIED
                                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                              </a>
                           ) : (
                              <div className="flex items-center justify-center gap-1.5 px-5 py-2.5 border border-emerald-500/50 rounded-xl text-emerald-500 text-[11px] uppercase font-black tracking-widest bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)] cursor-default">
                                <CheckCircle2 size={16} /> VERIFIED
                              </div>
                           )
                        ) : (
                           cert.verificationUrl && (
                              <a href={cert.verificationUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/20 hover:bg-[#7c3aed] hover:border-[#7c3aed] rounded-xl text-white/70 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all group/btn">
                                View Certificate
                                <ExternalLink className="w-3 h-3 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                              </a>
                           )
                        )}
                     </div>

                     {/* Skills Pills */}
                     {cert.skills && Array.isArray(cert.skills) && cert.skills.length > 0 && (
                       <div className="flex flex-wrap md:justify-end gap-2">
                          {cert.skills.map((skill, sIdx) => (
                             <span 
                                key={sIdx} 
                                className="px-3 py-1.5 rounded-full border border-white/5 bg-white/5 text-[9px] font-bold text-muted/80 tracking-widest uppercase group-hover:border-white/10 group-hover:text-white transition-colors"
                             >
                                {skill}
                             </span>
                          ))}
                       </div>
                     )}
                     
                  </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
