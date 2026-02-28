const Education = () => {
  const certifications = [
    "NTI / Huawei AI Track (2024)",
    "NVIDIA DLI - Deep Learning (2024)",
    "Cisco CCNA - Networking (2023)",
    "IoT & Embedded Internship (2023)"
  ];

  return (
    <section id="education" className="section-padding bg-transparent relative">
      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="grid lg:grid-cols-5 gap-24">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.4em] mb-6">Foundations</h2>
          <h3 className="text-4xl md:text-5xl font-black italic underline decoration-primary/20 decoration-8 underline-offset-12 mb-16">Education</h3>
          
          <div className="glass-card p-12 border-primary/20 group relative overflow-hidden">
             <div className="absolute -top-10 -right-10 text-[12rem] font-black opacity-[0.03] group-hover:opacity-[0.06] transition-opacity italic">
                CS
             </div>
             <p className="text-[10px] font-black uppercase text-primary mb-4 tracking-[0.3em]">Mansoura University</p>
             <h4 className="text-3xl font-black uppercase italic mb-6">Computer Science</h4>
             <p className="text-secondary text-base font-medium leading-relaxed">
                Specialized in high-performance software engineering, computational theory, 
                and core artificial intelligence frameworks.
             </p>
          </div>
        </div>

        <div className="lg:col-span-3">
           <h2 className="text-sm font-black text-white/40 uppercase tracking-[0.4em] mb-6">Advanced Accreditation</h2>
           <h3 className="text-4xl md:text-5xl font-black italic mb-16">Certifications</h3>
           
           <div className="grid sm:grid-cols-2 gap-6">
              {certifications.map((c, i) => (
                <div key={i} className="p-8 glass-card border-white/5 hover:border-primary/40 flex items-center justify-between group">
                   <span className="text-xs font-black uppercase tracking-[0.2em] text-secondary group-hover:text-white transition-colors">{c}</span>
                   <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)] opacity-40 group-hover:opacity-100" />
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
