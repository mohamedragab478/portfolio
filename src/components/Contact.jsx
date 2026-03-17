import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, MessageSquare, Phone, Github, Linkedin, Mail, ArrowUpRight, Zap, Briefcase, Facebook, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    
    try {
      const serviceId = 'service_56yumbr';
      const templateId = 'template_x3o6b5j';
      const publicKey = '7-XBK1lVY6QkeCYLr';

      const templateParams = {
        name: formData.name,
        email: formData.email,
        title: formData.subject,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Failed to send payload. Please try again later.' });
      console.error(err);
    }
  };

  const socials = [
    { name: "Facebook", icon: <Facebook size={20} />, href: "https://www.facebook.com/amir.elref3i", color: "hover:text-blue-500" },
    { name: "Instagram", icon: <Instagram size={20} />, href: "https://www.instagram.com/amir.elref3i/", color: "hover:text-pink-500" },
    { name: "GitHub", icon: <Github size={20} />, href: "https://github.com/amerelfalwo", color: "hover:text-white" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/amir-elfalw-b3a3212b8/", color: "hover:text-blue-400" },
    { name: "Khamsat", icon: <Briefcase size={20} />, href: "https://khamsat.com/user/amir_elrefai", color: "hover:text-green-400" },
    { name: "X", icon: <MessageSquare size={20} />, href: "https://x.com/Amirelfalw", color: "hover:text-cyan-400" },
  ];

  return (
    <section id="contact" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
             <Zap className="w-4 h-4 text-primary" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Open for Collaboration</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-tight">
            Connect for <span className="gradient-text">Innovation.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-10 bg-[#05011a]/40 border-2 border-white/10 rounded-[2.5rem] backdrop-blur-xl">
               <h3 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-3">
                 Reach Out <ArrowUpRight className="text-primary" />
               </h3>
               
               <div className="space-y-6">
                 <a href="mailto:amer003100@gmail.com" className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                      <Mail className="text-primary group-hover:text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary tracking-widest mb-1">Email Protocol</p>
                      <p className="text-lg font-black italic text-white">amer003100@gmail.com</p>
                    </div>
                 </a>

                 <div className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Phone className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary tracking-widest mb-1">Direct Relay</p>
                      <p className="text-lg font-black italic text-white">+20 102 352 4477</p>
                    </div>
                 </div>
               </div>

               <div className="mt-12 pt-12 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary/60 mb-6">Digital Ecosystem</p>
                  <div className="flex gap-4">
                     {socials.map((s, i) => (
                       <a 
                        key={i} 
                        href={s.href} 
                        target="_blank" 
                        rel="noopener" 
                        className={`w-12 h-12 flex items-center justify-center border-2 border-white/10 rounded-2xl text-secondary ${s.color} hover:border-primary/50 hover:bg-primary/5 transition-all duration-300`}
                        title={s.name}
                       >
                         {s.icon}
                       </a>
                     ))}
                  </div>
               </div>
            </div>

     
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="p-10 md:p-12 bg-[#05011a]/40 border-2 border-white/10 rounded-[2.5rem] backdrop-blur-xl space-y-8 h-full"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black text-secondary/60 tracking-widest ml-2">Your Identity</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter full name"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-8 py-5 focus:border-primary focus:outline-none transition-all font-bold text-white placeholder:text-white/20"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black text-secondary/60 tracking-widest ml-2">Communication Link</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Enter email address"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-8 py-5 focus:border-primary focus:outline-none transition-all font-bold text-white placeholder:text-white/20"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black text-secondary/60 tracking-widest ml-2">Objective / Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  placeholder="Enter objective"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-8 py-5 focus:border-primary focus:outline-none transition-all font-bold text-white placeholder:text-white/20"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black text-secondary/60 tracking-widest ml-2">Proposed Payload</label>
                <textarea 
                  rows="4"
                  required
                  value={formData.message}
                  placeholder="Describe your vision or inquiry..."
                  className="w-full bg-white/5 border-2 border-white/10 rounded-3xl px-8 py-6 focus:border-primary focus:outline-none transition-all font-bold text-white placeholder:text-white/20 resize-none"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={status.loading}
                className={`w-full py-6 text-white font-black uppercase tracking-[0.4em] rounded-[2rem] transition-all flex items-center justify-center gap-4 group ${
                  status.loading ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:shadow-[0_0_50px_rgba(124,58,237,0.4)] hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {status.loading ? 'Sending...' : 'Send Message'}
                {!status.loading && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>

              {status.success && (
                <p className="text-green-400 text-xs font-bold uppercase tracking-widest text-center mt-4">Payload successfully transmitted.</p>
              )}
              {status.error && (
                <p className="text-red-400 text-xs font-bold uppercase tracking-widest text-center mt-4">{status.error}</p>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
