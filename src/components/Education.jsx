import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, ExternalLink } from 'lucide-react';

const Education = () => {
  const education = {
    degree: "B.Sc. Computer Science",
    university: "Mansoura University",
    location: "Mansoura, Egypt",
    period: "2020 — 2024",
    description: "Specialized in Artificial Intelligence and High-Performance Software Engineering. Graduated with a focus on neural architectures and deep learning frameworks."
  };

  const certifications = [
    {
      title: "NTI / Huawei AI Track",
      date: "2024",
      institution: "Huawei Academy",
      icon: <Award className="w-5 h-5 text-yellow-500" />
    },
    {
      title: "Deep Learning Specialization",
      date: "2024",
      institution: "NVIDIA DLI",
      icon: <BookOpen className="w-5 h-5 text-green-500" />
    },
    {
      title: "CCNA - Networking",
      date: "2023",
      institution: "Cisco",
      icon: <MapPin className="w-5 h-5 text-blue-500" />
    },
    {
      title: "IoT & Embedded Internship",
      date: "2023",
      institution: "Tech Innovations",
      icon: <GraduationCap className="w-5 h-5 text-purple-500" />
    }
  ];

  return (
    <section id="education" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
               <GraduationCap className="w-4 h-4 text-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Academic Background</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none mb-6">
              Expertise & <span className="gradient-text">Growth.</span>
            </h2>
            <p className="text-secondary text-base md:text-lg font-medium leading-relaxed">
              A solid foundation in computer science and specialized certifications in AI and edge computing.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Degree Card - 2/3 width */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 group"
          >
            <div className="h-full relative p-8 md:p-12 bg-[#05011a]/40 border-2 border-white/10 rounded-[2.5rem] backdrop-blur-xl group-hover:border-primary/50 transition-all duration-500 overflow-hidden">
               <div className="flex flex-col items-start h-full">
                 <div className="flex items-center gap-4 mb-8 w-full">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition-all duration-500 overflow-hidden relative">
                       <GraduationCap className="w-8 h-8 text-primary group-hover:text-white transition-colors relative z-10" />
                       <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-[9px] font-black uppercase tracking-widest text-primary mb-2 block w-fit">Bachelor's Degree</span>
                      <div className="text-secondary/60 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {education.period}
                      </div>
                    </div>
                 </div>

                 <h3 className="text-4xl md:text-5xl font-black italic uppercase text-white mb-4 leading-tight">
                    {education.degree}
                 </h3>
                 <div className="flex items-center gap-2 text-primary/80 font-bold uppercase tracking-[0.2em] text-xs mb-10">
                    <MapPin className="w-4 h-4" />
                    {education.university} • {education.location}
                 </div>
                 
                 <p className="text-secondary text-lg font-medium leading-relaxed max-w-2xl mb-12">
                    {education.description}
                 </p>

                 <div className="mt-auto pt-8 border-t border-white/10 w-full flex justify-between items-center group/btn">
                    <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40">Institution Recognized</span>
                    <ExternalLink className="w-5 h-5 text-white/20 group-hover/btn:text-primary transition-colors" />
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Side stats or highlight card - 1/3 width */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {[certifications[0], certifications[1]].map((cert, i) => (
              <div key={i} className="flex-1 p-8 bg-[#05011a]/40 border-2 border-white/10 rounded-[2rem] hover:border-primary/40 transition-all group/cert">
                 <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group-hover/cert:border-primary/40 transition-colors">
                       {cert.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{cert.date}</span>
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{cert.institution}</h4>
                 <h5 className="text-xl font-black uppercase italic text-white leading-tight">
                    {cert.title}
                 </h5>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Remaining Certifications Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {[certifications[2], certifications[3]].map((cert, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 * i }}
               className="p-8 bg-[#05011a]/40 border-2 border-white/10 rounded-[2rem] hover:border-primary/40 transition-all group/cert"
             >
                <div className="flex justify-between items-start mb-6">
                   <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group-hover/cert:border-primary/40 transition-colors">
                      {cert.icon}
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{cert.date}</span>
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">{cert.institution}</h4>
                <h5 className="text-xl font-black uppercase italic text-white leading-tight">
                   {cert.title}
                </h5>
             </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 p-8 bg-primary/5 border-2 border-dashed border-primary/20 rounded-[2rem] flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary/10 transition-all"
          >
             <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-primary" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Continual Learning</p>
             <p className="text-secondary text-xs font-medium">Pursuing Advanced AI & MLOps Certifications</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Education;

