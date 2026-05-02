import { useState, useEffect, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { GraduationCap, MapPin, ExternalLink, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const tween = { type: 'tween', duration: 0.3, ease: 'easeOut' };

const Education = memo(() => {
  const [education, setEducation] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        const [degSnap, certSnap, trainingSnap] = await Promise.all([
          getDoc(doc(db, 'portfolioConfig', 'educationDegree')),
          getDocs(collection(db, 'certifications')),
          getDocs(collection(db, 'trainings'))
        ]);
        
        if (degSnap.exists()) {
          setEducation(degSnap.data());
        } else {
          setEducation({
            degree: "B.Sc. Computer Science",
            university: "Mansoura University",
            location: "Mansoura, Egypt",
            period: "2020 — 2024",
            description: "Specialized in Artificial Intelligence and High-Performance Software Engineering. Graduated with a focus on neural architectures and deep learning frameworks."
          });
        }

        let allCerts = [];
        if (!certSnap.empty) {
          allCerts = certSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        }

        let trainingCerts = [];
        if (trainingSnap && !trainingSnap.empty) {
           trainingCerts = trainingSnap.docs
             .map(doc => ({ id: doc.id, ...doc.data() }))
             .filter(t => t.isCompleted)
             .map(t => ({
                id: 'tr_' + t.id,
                title: t.title,
                issuer: t.provider,
                date: t.duration,
                skills: t.skillsListed || [],
                verificationUrl: t.certificateUrl || '',
                isVerified: true,
                syncedFromTraining: true
             }));
        }

        setCertifications([...allCerts, ...trainingCerts]);
      } catch (error) {
        console.error("Error fetching academic data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAcademicData();
  }, []);

  // Helper to convert Google Drive view links to preview links if needed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com/file/d/')) {
      return url.replace(/\/view.*$/, '/preview');
    }
    return url;
  };

  if (isLoading || !education) {
    return (
      <section id="education" className="py-32 relative overflow-hidden min-h-[600px] flex flex-col items-center justify-center gap-4">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="w-10 h-10 border-[3px] border-purple-500/20 border-t-purple-400 rounded-full animate-spin z-10" />
        <p className="text-white/30 tracking-[0.3em] uppercase text-[10px] font-bold font-mono z-10">Loading Data</p>
      </section>
    );
  }

  return (
    <section id="education" className="py-32 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <m.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '80px' }}
          transition={tween}
          className="mb-20 md:mb-24 text-center"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-purple-500/15 bg-purple-500/5 mb-8">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-purple-300/70 font-mono">Academic & Professional</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.03em] mb-5 text-white">
            Expertise &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">Growth</span>
          </h2>
          <p className="text-white/35 font-medium max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A solid foundation in computer science paired with specialized certifications in AI and edge computing.
          </p>
        </m.div>

        <div className="flex flex-col gap-12 w-full">
          
          {/* Main Degree - Grand Minimalist Row */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-6 pl-4 flex items-center gap-3 font-mono">
               <span className="w-8 h-[1px] bg-purple-500/20" /> University Degree
            </h3>
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-12 rounded-3xl bg-slate-900/80 md:bg-slate-900/40 border border-slate-700/50 hover:border-purple-500/40 transition-colors duration-300 overflow-hidden cursor-default shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] md:backdrop-blur-md"
            >
                <div className="flex-1 w-full z-10">
                   <div className="flex flex-wrap items-center gap-3 mb-4">
                       <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full font-mono">
                          {education.period}
                       </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hidden sm:block" />
                       <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 flex items-center gap-1.5 font-mono">
                          <MapPin className="w-3 h-3 text-purple-400" /> {education.location}
                      </span>
                   </div>
                   
                   <h3 className="text-3xl md:text-5xl font-black text-white/90 tracking-tight mb-2 transition-colors leading-tight group-hover:text-white">
                      {education.degree}
                   </h3>
                    <h4 className="text-sm md:text-md font-bold text-purple-400/80 uppercase tracking-widest mb-6">
                      {education.university}
                   </h4>
                   <p className="text-slate-400 leading-relaxed max-w-2xl text-sm font-medium group-hover:text-slate-300 transition-colors">
                      {education.description}
                   </p>
                </div>

                 <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full border border-slate-700/50 bg-slate-800/50 group-hover:bg-purple-500/20 group-hover:border-purple-500/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500 z-10 shrink-0 ml-10 shadow-sm">
                    <GraduationCap className="w-10 h-10 text-slate-400 group-hover:text-purple-400 transition-colors duration-500" />
                </div>
            </m.div>
          </div>

          {/* Certifications List */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-6 pl-4 mt-8 flex items-center gap-3 font-mono">
                 <span className="w-8 h-[1px] bg-purple-500/20" /> Professional Endorsements
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => {
                  return (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ ...tween, delay: index * 0.05 }}
                    className="group relative flex flex-col rounded-3xl bg-slate-900/80 md:bg-slate-900/40 border border-slate-700/50 hover:border-purple-500/40 transition-colors duration-300 overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] md:backdrop-blur-md"
                    onClick={() => cert.verificationUrl && setSelectedCert(cert)}
                  >
                      {/* Preview Top Section */}
                      {cert.verificationUrl && (
                        <div className="relative w-full h-56 bg-slate-900/80 border-b border-slate-700/50 overflow-hidden flex items-center justify-center group/preview">
                           <div className="absolute inset-[-50px] transition-all duration-500 pointer-events-none flex items-center justify-center group-hover/preview:scale-105">
                             <iframe 
                               src={getEmbedUrl(cert.verificationUrl)}
                               className="w-[140%] h-[150%] pointer-events-none"
                               style={{ transform: "scale(1.2)" }}
                               tabIndex="-1"
                             />
                           </div>
                           
                           {/* Hover Overlay */}
                           <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 flex items-center justify-center z-20 pointer-events-none">
                             <div className="px-6 py-2.5 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 font-bold uppercase tracking-widest text-xs backdrop-blur-md translate-y-4 group-hover/preview:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                               <ExternalLink size={14} />
                               View Credential
                             </div>
                           </div>
                        </div>
                      )}

                      <div className="flex flex-col w-full z-10 h-full p-6 md:p-8">
                         {/* Top Row: Info */}
                         <div className="flex justify-between gap-4 w-full mb-6">
                            <div className="flex-1">
                               <div className="flex flex-wrap items-center gap-2 mb-3">
                                   <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 font-mono">
                                      {cert.issuer || cert.institution || "Authority"}
                                   </span>
                                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                                     {cert.date || new Date().getFullYear()}
                                  </span>
                               </div>
                               <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 leading-tight group-hover:text-white transition-colors">
                                  {cert.title}
                               </h3>
                            </div>
                            
                            {/* Desktop: Right side Icon/Logo */}
                             <div className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-700/50 bg-slate-800/50 group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-all duration-500 shrink-0 shadow-sm group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                               {cert.issuerLogo || cert.issuerLogoUrl ? (
                                 <img src={cert.issuerLogo || cert.issuerLogoUrl} alt={cert.title} loading="lazy" decoding="async" className="w-6 h-6 object-contain filter brightness-0 invert" />
                               ) : (
                                  <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors duration-500" />
                               )}
                            </div>
                         </div>
                         {/* Bottom Row: Skills & Link */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto pt-6 border-t border-slate-700/50">
                            {/* Skills Learned */}
                            <div className="flex flex-wrap gap-2">
                              {(cert.skillsListed || cert.skills || []).map(skill => (
                                 <span key={skill} className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-[9px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-purple-300 group-hover:border-purple-500/30 transition-colors font-mono">
                                  {skill}
                                </span>
                              ))}
                            </div>

                            {/* Verified Badge */}
                            <div className="flex items-center justify-end shrink-0">
                               <div className="flex items-center justify-center gap-1.5 px-4 py-2 border border-emerald-500/30 rounded-xl text-emerald-400 text-[10px] uppercase font-black tracking-widest bg-emerald-500/10 shadow-sm cursor-default">
                                 <CheckCircle2 size={14} /> VERIFIED
                               </div>
                            </div>
                          </div>
                      </div>
                  </m.div>
                )})}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal / Lightbox */}
      <AnimatePresence>
        {selectedCert && selectedCert.verificationUrl && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#030014]/90 md:backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <m.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[85vh] bg-[#0c0c1d] border border-white/[0.06] rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.1)] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/[0.06] bg-white/[0.02]">
                <h3 className="font-bold text-purple-300">{selectedCert.title}</h3>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] rounded-full text-white/40 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 w-full bg-[#06060e]/50 p-4">
                <iframe 
                  src={getEmbedUrl(selectedCert.verificationUrl)} 
                  className="w-full h-full rounded-xl bg-black border border-white/10 shadow-sm"
                  title={selectedCert.title}
                  allow="autoplay"
                />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default Education;
