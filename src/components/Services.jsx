import { useState, useEffect, memo, useMemo } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { m } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const ServiceCard = memo(({ service, index }) => {
  const IconComponent = LucideIcons[service.icon_name] || LucideIcons[service.icon] || LucideIcons.Code;
  const tColor = "text-[#f97316]";
  
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] border border-white/5 bg-surface/20 hover:bg-surface/40 hover:border-[#7c3aed]/30 transition-all duration-500 overflow-hidden cursor-default shadow-lg shadow-transparent hover:shadow-[#7c3aed]/10"
    >
      {/* Removed sliding gradient animation for performance */}
      
      <div className="mb-8 p-5 bg-white/5 border border-white/5 rounded-2xl w-fit group-hover:bg-[#7c3aed]/20 group-hover:border-[#7c3aed]/50 transition-all duration-500 z-10">
        <IconComponent size={32} className="text-[#d8b4fe] group-hover:text-white transition-colors duration-500" />
      </div>
      
      <div className="z-10 mt-auto">
        <h3 className={`text-2xl font-black mb-4 uppercase tracking-tight transition-colors leading-tight ${tColor}`}>
          {service.title}
        </h3>
        <p className="text-muted/70 text-sm md:text-base leading-relaxed font-medium">
          {service.description}
        </p>
      </div>
    </m.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

const Services = memo(() => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "services"));
        setServices(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#7c3aed]/5 blur-[80px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <m.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          className="mb-20 md:mb-28 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/5 bg-surface/30 backdrop-blur-md mb-8">
            <LucideIcons.Layers className="w-4 h-4 text-[#d8b4fe]" />
            <span className="text-[#d8b4fe] text-xs font-bold tracking-[0.2em] uppercase">Value Proposition</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Services</span>
          </h2>
          <p className="text-muted/70 font-medium tracking-tight max-w-2xl mx-auto text-lg leading-relaxed">
            Delivering high-performance architectural solutions and specialized engineering to elevate product realities.
          </p>
        </m.div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <LucideIcons.Loader className="w-10 h-10 text-[#7c3aed] animate-spin" />
            <p className="text-muted/50 tracking-[0.3em] uppercase text-[10px] font-bold animate-pulse">Initializing Systems</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default Services;
