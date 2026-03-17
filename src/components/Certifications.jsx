import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';

const certifications = [
  {
    title: "AI Track",
    issuer: "NTI / Huawei Egyptian Talent Academy",
    date: "80 hrs",
    skills: ["Deep Learning", "Neural Networks", "Optimization"]
  },
  {
    title: "CCNA",
    issuer: "Digital Egypt Youth Program",
    date: "120 hrs",
    skills: ["Routing", "Switching", "Infrastructure"]
  },
  {
    title: "Computer Vision Specialized Training",
    issuer: "NTI",
    date: "Ongoing",
    skills: ["Image Analysis", "Object Detection", "Segmentation"]
  },
  {
    title: "Data Science Professional Track",
    issuer: "DEPI",
    date: "Ongoing",
    skills: ["Predictive Modeling", "Feature Engineering", "EDA"]
  },
  {
    title: "IoT & Embedded Systems Internship",
    issuer: "NTI",
    date: "120 hrs",
    skills: ["Microcontrollers", "Hardware Integration", "IoT Protocols"]
  },
  {
    title: "Deep Learning Institute (DLI) Training",
    issuer: "NVIDIA",
    date: "Completed",
    skills: ["GPU Computing", "AI Frameworks", "Acceleration"]
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-right"
        >
          <div className="flex justify-end items-center gap-4 mb-4">
            <div className="h-[2px] w-24 bg-primary/50" />
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Certifications
            </h2>
          </div>
          <p className="text-secondary font-medium tracking-tight">Professional Endorsements</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-start hover:bg-white/10 transition-colors"
            >
              <Award size={40} className="text-primary mb-6" />
              <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-secondary/80 font-semibold mb-1">{cert.issuer}</p>
              <p className="text-secondary/50 text-xs mb-6 uppercase tracking-widest">{cert.date}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {cert.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] text-white/80 uppercase tracking-wider font-bold"
                  >
                    <CheckCircle size={10} className="text-primary/70" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
