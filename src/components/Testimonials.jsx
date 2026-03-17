import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Industry Peer",
    role: "Senior AI Engineer",
    content: "Amir's work on the ThyraX project demonstrated a deep understanding of medical image analysis. His implementations are clean, scalable, and highly impactful.",
  },
  {
    name: "Tech Lead",
    role: "Computer Vision Specialist",
    content: "A dedicated professional. Amir consistently delivers high-quality models and understands the nuances of putting AI into production effectively.",
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Testimonials
            </h2>
          </div>
          <p className="text-secondary font-medium tracking-tight">What People Say</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 relative"
            >
              <Quote size={40} className="text-primary/20 absolute top-6 right-6" />
              <p className="text-secondary/90 italic mb-8 relative z-10">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-wide">{testimonial.name}</h4>
                  <p className="text-secondary/60 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
