import { useState, useMemo, memo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { GraduationCap, MapPin, ShieldCheck, CheckCircle2, X, Sparkles, Maximize2 } from 'lucide-react';
import { useCertificates, useEducationDegree } from '../hooks/useData';
import { portfolioData } from '../data/portfolioData';

const tween = { type: 'tween', duration: 0.3, ease: 'easeOut' };

const DEFAULT_EDUCATION = portfolioData.educationDegree;

const Education = memo(() => {
  const { certificates: fetchedCerts, isLoading } = useCertificates();
  const { education: fetchedEdu } = useEducationDegree();
  const [selectedCert, setSelectedCert] = useState(null);

  const education = fetchedEdu || DEFAULT_EDUCATION;

  const certifications = useMemo(() => {
    return fetchedCerts || [];
  }, [fetchedCerts]);

  // Helper to convert Google Drive view links to preview links if needed
  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com/file/d/')) {
      return url.replace(/\/view.*$/, '/preview');
    }
    return url;
  };

  const getCertImage = (cert) => {
    return cert.imageUrl || cert.verificationUrl || cert.image || '';
  };

  return (
    <section id="education" className="py-32 relative overflow-hidden">
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
                          {education.period || education.year}
                       </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 hidden sm:block" />
                       <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 flex items-center gap-1.5 font-mono">
                          <MapPin className="w-3 h-3 text-purple-400" /> {education.location || education.grade || 'Egypt'}
                       </span>
                   </div>
                   
                   <h3 className="text-3xl md:text-5xl font-black text-white/90 tracking-tight mb-2 transition-colors leading-tight group-hover:text-white">
                      {education.degree}
                   </h3>
                    <h4 className="text-sm md:text-md font-bold text-purple-400/80 uppercase tracking-widest mb-6">
                      {education.university || education.institution}
                   </h4>
                   <p className="text-slate-400 leading-relaxed max-w-2xl text-sm font-medium group-hover:text-slate-300 transition-colors">
                      {education.description || education.details}
                   </p>
                </div>

                 <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full border border-slate-700/50 bg-slate-800/50 group-hover:bg-purple-500/20 group-hover:border-purple-500/30 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500 z-10 shrink-0 ml-10 shadow-sm">
                    <GraduationCap className="w-10 h-10 text-slate-400 group-hover:text-purple-400 transition-colors duration-500" />
                </div>
            </m.div>
          </div>

          {/* Certifications List */}
          {isLoading ? (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-6 pl-4 mt-8 flex items-center gap-3 font-mono">
                 <span className="w-8 h-[1px] bg-purple-500/20" /> Professional Endorsements
              </h3>
              <div className="grid md:grid-cols-2 gap-6 animate-pulse">
                {[1, 2].map((i) => (
                  <div key={i} className="h-64 rounded-3xl bg-slate-900/40 border border-slate-700/30 p-6 flex flex-col justify-between">
                    <div className="h-6 w-1/3 bg-white/5 rounded-full" />
                    <div className="h-8 w-2/3 bg-white/5 rounded-xl" />
                    <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          ) : certifications.length > 0 ? (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/25 mb-6 pl-4 mt-8 flex items-center gap-3 font-mono">
                 <span className="w-8 h-[1px] bg-purple-500/20" /> Professional Endorsements
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => {
                  const certImg = getCertImage(cert);

                  return (
                    <m.div
                      key={cert.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "100px" }}
                      transition={{ ...tween, delay: index * 0.05 }}
                      className="group h-[320px] [perspective:1000px] cursor-pointer"
                      onClick={() => {
                        if (certImg) setSelectedCert(cert);
                      }}
                    >
                      <div className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${certImg ? 'group-hover:[transform:rotateY(180deg)]' : ''} transition-transform`}>
                        
                        {/* Front Face of Card */}
                        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] flex flex-col justify-between rounded-3xl bg-slate-900/80 md:bg-slate-900/40 border border-slate-700/50 hover:border-purple-500/40 p-6 md:p-8 md:backdrop-blur-md shadow-lg">
                          <div>
                            <div className="flex items-center justify-between gap-4 mb-4">
                              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-cyan-300 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 font-mono">
                                {cert.issuer || cert.institution || "Authority"}
                              </span>
                              <span className="text-xs font-bold font-mono text-slate-400">
                                {cert.date ? (typeof cert.date === 'string' && cert.date.includes('T') ? cert.date.split('T')[0] : (cert.date ? new Date(cert.date).toLocaleDateString() : '')) : ''}
                              </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-black tracking-tight text-white/90 leading-snug mb-2 group-hover:text-purple-300 transition-colors">
                              {cert.title}
                            </h3>
                          </div>

                          {certImg && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-mono font-bold tracking-wider w-fit my-2">
                              <Sparkles size={12} className="text-cyan-400 animate-pulse" /> Hover to flip & view certificate
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
                            <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                              {(cert.skillsListed || cert.skills || []).slice(0, 3).map(skill => (
                                <span key={skill} className="px-2.5 py-1 bg-slate-800/50 border border-slate-700/50 rounded-lg text-[9px] font-bold uppercase tracking-widest text-slate-300 font-mono">
                                  {skill}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-1.5 px-3.5 py-1.5 border border-emerald-500/30 rounded-xl text-emerald-400 text-[10px] uppercase font-black tracking-widest bg-emerald-500/10 shrink-0">
                              <CheckCircle2 size={13} /> VERIFIED
                            </div>
                          </div>
                        </div>

                        {/* Back Face of Card (3D Flip View) */}
                        {certImg && (
                          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-3xl overflow-hidden bg-slate-950 border border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.25)] flex items-center justify-center p-2">
                            <img 
                              src={getEmbedUrl(certImg)} 
                              alt={cert.title}
                              className="w-full h-full object-cover rounded-2xl bg-black/40"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 bg-slate-950/40 hover:bg-slate-950/20 transition-colors flex items-center justify-center pointer-events-none p-4">
                              <div className="px-5 py-2.5 bg-purple-600/90 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2">
                                <Maximize2 size={14} /> Click to Enlarge
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </m.div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Certificate Modal Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#030014]/90 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <m.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[85vh] bg-[#0c0c1d] border border-purple-500/30 rounded-3xl shadow-[0_0_60px_rgba(168,85,247,0.3)] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/60 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg leading-tight">{selectedCert.title}</h3>
                    <p className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mt-0.5">
                      {selectedCert.issuer || selectedCert.institution || 'Authority Record'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-300 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 w-full bg-[#06060e] p-4 flex items-center justify-center overflow-hidden">
                <img 
                  src={getEmbedUrl(getCertImage(selectedCert))} 
                  className="max-w-full max-h-full object-contain rounded-2xl border border-white/10 shadow-2xl"
                  alt={selectedCert.title}
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
