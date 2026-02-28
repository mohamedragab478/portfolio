import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Phone, Github, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappNumber = "+20123524477";
    const text = `*Portfolio Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const socials = [
    { icon: <Github size={24} />, href: "https://github.com/amerelfalwo" },
    { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/amir-elfalw-b3a3212b8/" },
    { icon: <MessageSquare size={24} />, href: "https://x.com/Amirelfalw" },
  ];

  return (
    <section id="contact" className="section-padding bg-transparent">
      <div className="text-center mb-24">
        <h2 className="text-sm font-black text-primary uppercase tracking-[0.5em] mb-4">Direct Channel</h2>
        <h3 className="text-5xl md:text-6xl font-black italic">Let's <span className="gradient-text">Sync.</span></h3>
      </div>

      <div className="grid lg:grid-cols-5 gap-16 items-start">
        {/* Connection Strategy */}
        <div className="lg:col-span-2 space-y-10">
           <div className="glass-card p-12 border-primary/20">
              <h4 className="text-2xl font-black uppercase italic mb-10">Contact Matrix</h4>
              <div className="space-y-8">
                <a href="mailto:amer003100@gmail.com" className="flex items-center gap-6 group">
                  <div className="p-5 bg-primary/10 rounded-3xl group-hover:bg-primary transition-all">
                    <Mail className="text-primary group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-secondary tracking-widest">Digital Mail</p>
                    <p className="text-base font-black italic">amer003100@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-6 group">
                  <div className="p-5 bg-primary/10 rounded-3xl">
                    <Phone className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-secondary tracking-widest">Encryption Line</p>
                    <p className="text-base font-black italic">+20 123 524477</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-16 border-t border-white/5">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-8">Node Connections</p>
                 <div className="flex gap-5">
                    {socials.map((s, i) => (
                      <a key={i} href={s.href} target="_blank" rel="noopener" className="p-4 glass-card border-white/5 hover:border-primary/50 text-secondary hover:text-white hover:glow-aura transition-all">
                        {s.icon}
                      </a>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Transmission Form */}
        <div className="lg:col-span-3">
          <motion.form 
            onSubmit={handleSubmit}
            className="glass-card p-12 border-primary/20 space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black text-secondary tracking-widest">Protocol Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Amir Elrefai"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:border-primary focus:outline-none transition-colors font-black text-sm"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black text-secondary tracking-widest">Relay Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="example@mail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:border-primary focus:outline-none transition-colors font-black text-sm"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-black text-secondary tracking-widest">Payload Message</label>
              <textarea 
                rows="5"
                required
                placeholder="I have a project in mind..."
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-primary focus:outline-none transition-colors font-black text-sm resize-none"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-primary text-white font-black uppercase tracking-[0.3em] rounded-[2rem] hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-4 group"
            >
              EXECUTE TRANSMISSION <Send size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
