import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, Layout, Globe, Command, Award, Layers, Terminal, Code } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const DynamicIcon = ({ name, className }) => {
  const icons = {
    Database, Layout, Globe, Command, Award, Layers, Terminal, Code
  };
  const Icon = icons[name] || Database;
  return <Icon className={className} size={18} />;
};

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'portfolioConfig', 'about'));
        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        } else {
          setAboutData({
            heading: "Architecting Scalable Digital Frontiers",
            paragraph: "I specialize in engineering high-performance AI ecosystems that bridge the gap between complex research and efficient production deployments. My approach combines deep technical expertise with a relentless focus on optimization and precision.",
            imageUrl: "/my_img.jpeg",
            floatingTag: "Full-Stack AI",
            features: [
              { title: "Neural Architectures", description: "Designing complex models tailored for specialized inference tasks.", icon: "Database" },
              { title: "Eco-System Ops", description: "Scalable MLOps pipelines ensuring stability at global scale.", icon: "Layout" }
            ],
            stats: [
              { value: "12+", label: "Core Deployments" },
              { value: "99%", label: "Precision Rate" }
            ]
          });
        }
      } catch (error) {
        console.error("Error fetching about config:", error);
        // Fallback on error so the section never stays stuck
        setAboutData({
          heading: "Architecting Scalable Digital Frontiers",
          paragraph: "I specialize in engineering high-performance AI ecosystems that bridge the gap between complex research and efficient production deployments. My approach combines deep technical expertise with a relentless focus on optimization and precision.",
          imageUrl: "/my_img.jpeg",
          floatingTag: "Full-Stack AI",
          features: [
            { title: "Neural Architectures", description: "Designing complex models tailored for specialized inference tasks.", icon: "Database" },
            { title: "Eco-System Ops", description: "Scalable MLOps pipelines ensuring stability at global scale.", icon: "Layout" }
          ],
          stats: [
            { value: "12+", label: "Core Deployments" },
            { value: "99%", label: "Precision Rate" }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (isLoading) {
    return (
      <section id="about" className="py-32 bg-transparent relative overflow-hidden min-h-[800px] flex items-center justify-center">
        <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="w-12 h-12 border-4 border-[#7c3aed]/30 border-t-[#d8b4fe] rounded-full animate-spin z-10" />
      </section>
    );
  }

  return (
    <section id="about" className="py-32 bg-transparent relative overflow-hidden">
      {/* Ambient Depth */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">
        {/* Left: Expert Story */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="lg:pr-10 order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-surface/30 backdrop-blur-md mb-8">
             <ShieldCheck className="w-4 h-4 text-[#d8b4fe]" />
             <span className="text-[#d8b4fe] text-xs font-bold tracking-[0.2em] uppercase">Visionary Engineering</span>
          </div>
          
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-10 leading-[1.1] uppercase tracking-tighter text-white whitespace-pre-line">
            {aboutData.heading.split(' ').map((word, i, arr) => {
              // Highlight the last word typically, or we can just render normal if hard to split perfectly.
              // We'll just highlight the middle word or specific keywords if needed, but doing generic fallback.
               if (i === 1) return <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">{word} </span>;
               return word + ' ';
            })}
          </h3>
          
          <p className="text-muted/80 text-lg mb-12 leading-relaxed font-medium whitespace-pre-line">
            {aboutData.paragraph}
          </p>

          <div className="grid sm:grid-cols-2 gap-10 mb-16">
            {aboutData.features?.map((feat, idx) => (
               <div key={idx} className="group p-6 rounded-3xl border border-white/5 bg-surface/20 hover:bg-surface/40 hover:border-[#7c3aed]/30 transition-all duration-500 cursor-default">
                 <div className="flex items-center gap-4 text-white mb-4">
                    <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:bg-[#7c3aed]/20 group-hover:border-[#7c3aed]/50 transition-all duration-500">
                       <DynamicIcon name={feat.icon} className="text-[#d8b4fe] group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-black uppercase text-[10px] tracking-[0.2em]">{feat.title}</span>
                 </div>
                 <p className="text-muted/60 text-xs leading-relaxed font-bold">{feat.description}</p>
               </div>
            ))}
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 gap-10 border-t border-white/5 pt-12">
             {aboutData.stats?.map((stat, idx) => (
                <div key={idx} className="group flex flex-col items-start">
                   <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe] group-hover:scale-105 transition-transform duration-500 origin-left">
                     {stat.value}
                   </span>
                   <span className="text-[10px] uppercase font-black tracking-[0.3em] text-muted/50 mt-4">{stat.label}</span>
                </div>
             ))}
          </div>
        </motion.div>

        {/* Right: Creative Image Display */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative px-8 md:px-0 order-1 lg:order-2"
        >
          <div className="relative mx-auto w-full max-w-[500px]">
             {/* Background Layers */}
             <div className="absolute -inset-2 bg-[#7c3aed]/5 border border-[#7c3aed]/20 rounded-[3rem] -rotate-6 transition-transform group-hover:rotate-0 duration-700" />
             <div className="absolute -inset-2 border border-white/5 rounded-[3rem] rotate-3" />
             
             {/* Main Image Frame */}
             <div className="relative z-10 aspect-[4/5] rounded-[3rem] bg-surface/50 border border-white/10 shadow-2xl group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed]/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
                <img 
                  src={aboutData.imageUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110 filter grayscale group-hover:grayscale-0"
                />
                
                {/* Floating Tags/Labels */}
                <div className="absolute top-8 left-8 p-3 bg-surface/60 border border-white/10 rounded-2xl backdrop-blur-md z-20 shadow-lg shadow-black/50">
                   <Award className="text-[#d8b4fe] w-5 h-5" />
                </div>
                <div className="absolute bottom-8 right-8 p-3 bg-surface/60 border border-[#7c3aed]/30 rounded-2xl backdrop-blur-md z-20 shadow-lg shadow-black/50">
                   <Command className="text-[#7c3aed] w-5 h-5" />
                </div>
             </div>

             {/* Orbital Elements */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute -inset-16 border border-white/5 rounded-full pointer-events-none"
             >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#7c3aed] rounded-full blur-[2px] shadow-[0_0_20px_rgba(124,58,237,1)]" />
             </motion.div>
          </div>

          {/* Floating Achievements/Tech Stack */}
          <div className="absolute -bottom-10 -right-6 z-20 flex flex-col gap-4">
             <motion.div 
               whileHover={{ x: -10 }}
               className="px-6 py-4 bg-surface/80 border border-[#7c3aed]/30 rounded-full flex items-center gap-3 shadow-xl backdrop-blur-xl"
             >
                <Layers className="text-[#d8b4fe] w-4 h-4" />
                <span className="text-[10px] items-center font-black text-white uppercase tracking-[0.3em]">{aboutData.floatingTag || 'Full-Stack AI'}</span>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
