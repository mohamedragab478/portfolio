import { useState, useEffect } from 'react';
import { getContactRelay, saveContactRelay } from '../api';
import { Mail, Phone, RefreshCw, Save, Github, Linkedin, Facebook, Instagram, Share2, Twitter } from 'lucide-react';

const ContactManager = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [email, setEmail] = useState("amer003100@gmail.com");
  const [phone, setPhone] = useState("+20 102 352 4477");
  const [facebook, setFacebook] = useState("https://www.facebook.com/amir.elref3i");
  const [instagram, setInstagram] = useState("https://www.instagram.com/amir.elref3i/");
  const [github, setGithub] = useState("https://github.com/amerelfalwo");
  const [linkedin, setLinkedin] = useState("https://www.linkedin.com/in/amir-elfalw-b3a3212b8/");
  const [khamsat, setKhamsat] = useState("https://khamsat.com/user/amir_elrefai");
  const [xTwitter, setXTwitter] = useState("https://x.com/Amirelfalw");

  const fetchContactData = async () => {
    setFetching(true);
    try {
      const data = await getContactRelay();
      if (data) {
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.facebook) setFacebook(data.facebook);
        if (data.instagram) setInstagram(data.instagram);
        if (data.github) setGithub(data.github);
        if (data.linkedin) setLinkedin(data.linkedin);
        if (data.khamsat) setKhamsat(data.khamsat);
        if (data.xTwitter) setXTwitter(data.xTwitter);
      }
    } catch (error) {
      console.error("Error fetching contact config:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveContactRelay({
        email,
        phone,
        facebook,
        instagram,
        github,
        linkedin,
        khamsat,
        xTwitter,
        updatedAt: new Date().toISOString()
      });
      alert("Contact Configuration Saved!");
    } catch (error) {
      console.error("Error saving contact config", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
            <Share2 className="text-[#d8b4fe] w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Contact Parameters</h2>
            <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">Manage network routing & links</p>
          </div>
        </div>
        <button onClick={fetchContactData} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/50 hover:text-white shrink-0">
           <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin text-white' : ''}`} />
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] space-y-8 shadow-[0_0_40px_rgba(124,58,237,0.05)] relative overflow-visible z-20">
        
        {/* Basic Contact Info */}
        <div>
           <h3 className="text-sm font-black uppercase text-white tracking-widest mb-6 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#7c3aed]/50" /> Direct Relays
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Mail className="w-3 h-3 text-[#d8b4fe]" /> Email Address</label>
               <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" />
             </div>
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Phone className="w-3 h-3 text-[#d8b4fe]" /> Phone Number</label>
               <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" />
             </div>
           </div>
        </div>

        {/* Social Links */}
        <div>
           <h3 className="text-sm font-black uppercase text-white tracking-widest mb-6 mt-8 flex items-center gap-3">
             <span className="w-8 h-[1px] bg-[#7c3aed]/50" /> Ecosystem Connectivity (URLs)
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Github className="w-3 h-3 text-[#d8b4fe]" /> GitHub</label>
               <input type="text" value={github} onChange={e => setGithub(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" />
             </div>
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Linkedin className="w-3 h-3 text-[#d8b4fe]" /> LinkedIn</label>
               <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" />
             </div>
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Facebook className="w-3 h-3 text-[#d8b4fe]" /> Facebook</label>
               <input type="text" value={facebook} onChange={e => setFacebook(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" />
             </div>
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Instagram className="w-3 h-3 text-[#d8b4fe]" /> Instagram</label>
               <input type="text" value={instagram} onChange={e => setInstagram(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" />
             </div>
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Share2 className="w-3 h-3 text-[#d8b4fe]" /> Khamsat</label>
               <input type="text" value={khamsat} onChange={e => setKhamsat(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" />
             </div>
             <div className="space-y-3">
               <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Twitter className="w-3 h-3 text-[#d8b4fe]" /> X (Twitter)</label>
               <input type="text" value={xTwitter} onChange={e => setXTwitter(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all font-bold placeholder:text-muted/40" />
             </div>
           </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-[#7c3aed]/20">
           <button type="submit" disabled={loading} className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] hover:opacity-90 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all disabled:opacity-50 border-none shadow-lg shadow-[#ec4899]/20 hover:scale-[1.02] active:scale-[0.98]">
             {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} 
             Synchronize Networking
           </button>
        </div>
      </form>
    </div>
  );
};

export default ContactManager;
