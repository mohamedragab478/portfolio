import { useState, useEffect, memo } from 'react';
import { m } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const Education = memo(() => {
  const [education, setEducation] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        const [degSnap, certSnap] = await Promise.all([
          getDoc(doc(db, 'portfolioConfig', 'educationDegree')),
          getDocs(collection(db, 'certifications'))
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

        if (!certSnap.empty) {
          setCertifications(certSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      } catch (error) {
        console.error("Error fetching academic data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAcademicData();
  }, []);

  if (isLoading || !education) {
    return (
      <section id="education" className="py-32 relative overflow-hidden min-h-[600px] flex items-center justify-center">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#7c3aed]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="w-12 h-12 border-4 border-[#7c3aed]/30 border-t-[#d8b4fe] rounded-full animate-spin z-10" />
      </section>
    );
  }

  return (
    <section id="education" className="py-32 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#7c3aed]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <m.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          className="mb-20 md:mb-28 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-surface/30 backdrop-blur-md mb-8">
            <GraduationCap className="w-4 h-4 text-[#d8b4fe]" />
            <span className="text-[#d8b4fe] text-xs font-bold tracking-[0.2em] uppercase">Academic & Professional</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
            Expertise & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Growth</span>
          </h2>
          <p className="text-muted/70 font-medium tracking-tight max-w-2xl mx-auto text-lg leading-relaxed">
            A solid foundation in computer science paired with specialized certifications in AI and edge computing.
          </p>
        </m.div>

        <div className="flex flex-col gap-12 w-full">
          
          {/* Main Degree - Grand Minimalist Row */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted/50 mb-6 pl-4 flex items-center gap-3">
               <span className="w-8 h-[1px] bg-[#7c3aed]/30" /> University Degree
            </h3>
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-12 rounded-[2.5rem] border border-[#7c3aed]/20 bg-[#7c3aed]/5 hover:bg-[#7c3aed]/10 transition-all duration-500 overflow-hidden cursor-default shadow-lg shadow-[#7c3aed]/5"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/0 via-[#7c3aed]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <div className="flex-1 w-full z-10">
                   <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white bg-[#7c3aed] px-4 py-1.5 rounded-full shadow-lg shadow-[#7c3aed]/30">
                         {education.period}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                      <span className="text-[10px] font-bold tracking-widest uppercase text-[#d8b4fe] flex items-center gap-1.5">
                         <MapPin className="w-3 h-3" /> {education.location}
                      </span>
                   </div>
                   
                   <h3 className="text-3xl md:text-5xl font-black text-[#f97316] tracking-tight mb-2 transition-colors leading-tight">
                      {education.degree}
                   </h3>
                   <h4 className="text-sm md:text-md font-bold text-[#d8b4fe]/80 uppercase tracking-widest mb-6">
                      {education.university}
                   </h4>
                   
                   <p className="text-muted/80 leading-relaxed max-w-2xl text-sm font-medium">
                      {education.description}
                   </p>
                </div>

                <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/50 group-hover:bg-[#7c3aed] group-hover:scale-110 transition-all duration-500 z-10 shrink-0 ml-10 shadow-lg shadow-[#7c3aed]/10">
                   <GraduationCap className="w-10 h-10 text-[#d8b4fe] group-hover:text-white transition-colors duration-500" />
                </div>
            </m.div>
          </div>

          {/* Certifications List */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted/50 mb-6 pl-4 mt-8 flex items-center gap-3">
                 <span className="w-8 h-[1px] bg-[#7c3aed]/30" /> Professional Endorsements
              </h3>
              <div className="flex flex-col gap-4">
                {certifications.map((cert, index) => {
                  const tColor = "text-[#f97316]";
                  return (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 rounded-[1.5rem] border border-white/5 bg-surface/20 hover:bg-surface/40 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-default"
                  >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/0 via-[#7c3aed]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                      
                      <div className="flex flex-col w-full z-10">
                         {/* Top Row: Info */}
                         <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 w-full mb-4">
                            <div className="flex-1">
                               <div className="flex flex-wrap items-center gap-3 mb-3">
                                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#d8b4fe] bg-[#7c3aed]/10 px-3 py-1 rounded-full border border-[#7c3aed]/20">
                                     {cert.issuer || cert.institution || "Authority"}
                                  </span>
                                  <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                                  <span className="text-[10px] font-bold tracking-widest uppercase text-muted/40">
                                     {cert.date || new Date().getFullYear()}
                                  </span>
                               </div>
                               
                               <h3 className={`text-xl md:text-2xl font-black tracking-tight transition-colors leading-tight ${tColor}`}>
                                  {cert.title}
                               </h3>
                            </div>
                            
                            {/* Desktop: Right side Icon/Logo (optional, keeping it for aesthetic) */}
                            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/5 bg-white/5 group-hover:bg-[#7c3aed] group-hover:border-[#7c3aed] shadow-lg shadow-transparent group-hover:shadow-[#7c3aed]/20 transition-all duration-500 shrink-0">
                              {cert.issuerLogo || cert.issuerLogoUrl ? (
                                <img src={cert.issuerLogo || cert.issuerLogoUrl} alt={cert.title} loading="lazy" decoding="async" className="w-6 h-6 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                              ) : (
                                <ShieldCheck className="w-5 h-5 text-white/30 group-hover:text-white transition-colors duration-500" />
                              )}
                            </div>
                         </div>

                         {/* Bottom Row: Skills & Link */}
                         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-auto pt-4 border-t border-white/5">
                           {/* Skills Learned */}
                           <div className="flex flex-wrap gap-2">
                             {(cert.skillsListed || cert.skills || []).map(skill => (
                               <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest text-[#d8b4fe]/80 hover:text-white hover:border-[#7c3aed]/50 transition-colors">
                                 {skill}
                               </span>
                             ))}
                           </div>

                           {/* Verified Badge / Link (bottom right on desktop) */}
                           <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0 shrink-0">
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
                         </div>
                      </div>
                  </m.div>
                )})}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default Education;
