import { useState, useEffect, memo } from 'react';
import { m } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, MessageSquare, Phone, Github, Linkedin, Mail, ArrowUpRight, Zap, Briefcase, Facebook, Instagram } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

const Contact = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const [contactData, setContactData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const snap = await getDoc(doc(db, 'portfolioConfig', 'contactRelay'));
        if (snap.exists()) {
          setContactData(snap.data());
        }
      } catch (err) {
        console.error("Error fetching contact config:", err);
      } finally {
        setIsDataLoaded(true);
      }
    };
    fetchContactInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    
    try {
      // 1. Send via EmailJS
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

      // 2. Save directly to Firestore for Inbox Manager
      await addDoc(collection(db, 'messages'), {
         name: formData.name,
         email: formData.email,
         subject: formData.subject,
         message: formData.message,
         createdAt: new Date().toISOString()
      });
      
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Failed to send payload. Please try again later.' });
      console.error(err);
    }
  };

  const getSocialList = () => {
    if (!contactData) return [];
    
    const s = [];
    if (contactData.facebook) s.push({ name: "Facebook", icon: <Facebook size={20} />, href: contactData.facebook, color: "text-[#1877F2] border-[#1877F2]/30 hover:bg-[#1877F2]/10" });
    if (contactData.instagram) s.push({ name: "Instagram", icon: <Instagram size={20} />, href: contactData.instagram, color: "text-[#E4405F] border-[#E4405F]/30 hover:bg-[#E4405F]/10" });
    if (contactData.github) s.push({ name: "GitHub", icon: <Github size={20} />, href: contactData.github, color: "text-white border-white/30 hover:bg-white/10" });
    if (contactData.linkedin) s.push({ name: "LinkedIn", icon: <Linkedin size={20} />, href: contactData.linkedin, color: "text-[#0A66C2] border-[#0A66C2]/30 hover:bg-[#0A66C2]/10" });
    if (contactData.khamsat) s.push({ name: "Khamsat", icon: <Briefcase size={20} />, href: contactData.khamsat, color: "text-[#1dbf73] border-[#1dbf73]/30 hover:bg-[#1dbf73]/10" });
    if (contactData.xTwitter) s.push({ name: "X", icon: <MessageSquare size={20} />, href: contactData.xTwitter, color: "text-[#06b6d4] border-[#06b6d4]/30 hover:bg-[#06b6d4]/10" });
    return s;
  };

  const socials = getSocialList();

  return (
    <section id="contact" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
             <Zap className="w-4 h-4 text-accent" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Open for Collaboration</span>
          </m.div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
            Connect for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Innovation.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Side: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="group relative flex flex-col p-10 bg-[#7c3aed]/5 border border-[#7c3aed]/20 rounded-[2.5rem] shadow-lg shadow-[#7c3aed]/5 backdrop-blur-md overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/0 via-[#7c3aed]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
               
               <h3 className="text-2xl font-black uppercase italic mb-8 flex items-center gap-3 relative z-10 text-white">
                 Reach Out <ArrowUpRight className="text-[#d8b4fe]" />
               </h3>
               
               <div className="space-y-6 relative z-10">
                 {!isDataLoaded ? (
                   <div className="animate-pulse space-y-4">
                     <div className="h-14 bg-white/5 rounded-2xl w-full"></div>
                     <div className="h-14 bg-white/5 rounded-2xl w-full"></div>
                   </div>
                 ) : (
                   <>
                     <a href={`mailto:${contactData?.email || 'amer003100@gmail.com'}`} className="group/item flex items-center gap-6 p-4 rounded-3xl hover:bg-[#7c3aed]/10 transition-all border border-transparent hover:border-[#7c3aed]/30">
                        <div className="w-14 h-14 bg-[#7c3aed]/10 rounded-2xl flex items-center justify-center group-hover/item:bg-[#7c3aed]/30 transition-all duration-300">
                          <Mail className="text-[#d8b4fe] w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-muted/60 tracking-widest mb-1">Email Protocol</p>
                          <p className="text-lg font-black italic text-[#d8b4fe]">{contactData?.email || 'amer003100@gmail.com'}</p>
                        </div>
                     </a>

                     <div className="group/item flex items-center gap-6 p-4 rounded-3xl hover:bg-[#7c3aed]/10 transition-all border border-transparent hover:border-[#7c3aed]/30">
                        <div className="w-14 h-14 bg-[#7c3aed]/10 rounded-2xl flex items-center justify-center group-hover/item:bg-[#7c3aed]/30 transition-all duration-300">
                          <Phone className="text-[#d8b4fe] w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-muted/60 tracking-widest mb-1">Direct Relay</p>
                          <p className="text-lg font-black italic text-[#d8b4fe]">{contactData?.phone || '+20 102 352 4477'}</p>
                        </div>
                     </div>
                   </>
                 )}
               </div>

               <div className="mt-12 pt-12 border-t border-[#7c3aed]/20 relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted/60 mb-6 flex items-center gap-3">
                     <span className="w-8 h-[1px] bg-[#7c3aed]/30" /> Digital Ecosystem
                  </p>
                  <div className="flex gap-4 flex-wrap">
                     {socials.map((s, i) => (
                       <a 
                        key={i} 
                        href={s.href} 
                        target="_blank" 
                        rel="noopener" 
                        className={`w-12 h-12 flex items-center justify-center border rounded-2xl transition-all duration-300 ${s.color}`}
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
            <m.form 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "100px" }}
              onSubmit={handleSubmit}
              className="group relative flex flex-col p-10 md:p-12 border border-[#7c3aed]/20 bg-[#7c3aed]/5 shadow-lg shadow-[#7c3aed]/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden cursor-default h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/0 via-[#7c3aed]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              <div className="grid md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black text-white/50 tracking-widest ml-2">Your Identity</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    placeholder="Enter full name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 focus:outline-none transition-all font-bold text-white placeholder:text-muted/40"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black text-white/50 tracking-widest ml-2">Communication Link</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    placeholder="Enter email address"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 focus:outline-none transition-all font-bold text-white placeholder:text-muted/40"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-3 relative z-10 mt-8 mb-8">
                <label className="text-[10px] uppercase font-black text-white/50 tracking-widest ml-2">Objective / Subject</label>
                <input 
                  type="text" 
                  required
                  value={formData.subject}
                  placeholder="Enter objective"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 focus:outline-none transition-all font-bold text-white placeholder:text-muted/40"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-3 relative z-10 mb-8">
                <label className="text-[10px] uppercase font-black text-white/50 tracking-widest ml-2">Proposed Payload</label>
                <textarea 
                  rows="4"
                  required
                  value={formData.message}
                  placeholder="Describe your vision or inquiry..."
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-5 focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 focus:outline-none transition-all font-bold text-white placeholder:text-muted/40 resize-none"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={status.loading}
                className={`w-full py-6 font-black uppercase tracking-[0.4em] rounded-[2rem] transition-all flex items-center justify-center gap-4 group border-none ${
                  status.loading ? 'bg-[#7c3aed]/50 text-white cursor-not-allowed' : 'bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white hover:opacity-90 shadow-lg shadow-[#ec4899]/20 hover:scale-[1.02] active:scale-[0.98]'
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
            </m.form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
