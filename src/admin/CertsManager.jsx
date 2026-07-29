import { useState, useEffect } from 'react';
import { getCertifications, addCertification, updateCertification, deleteCertification } from '../api';
import { m, AnimatePresence } from 'framer-motion';
import { Award, RefreshCw, Trash2, ExternalLink, Briefcase, Plus, Edit2, FileText, Globe, Clock, CheckCircle2, X, Image as ImageIcon } from 'lucide-react';

const CertsManager = () => {
  const [certs, setCerts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [issuerLogoUrl, setIssuerLogoUrl] = useState('');
  const [skillsListed, setSkillsListed] = useState([]);
  const [isVerified, setIsVerified] = useState(true);

  // Dropdown UI
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCerts = async () => {
    setFetching(true);
    try {
      const data = await getCertifications();
      setCerts(data);
    } catch (error) {
      console.error("Error fetching certs:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchCerts(); }, []);

  const resetForm = () => {
    setEditingId(null); setTitle(''); setIssuer(''); setDate('');
    setVerificationUrl(''); setIssuerLogoUrl(''); setSkillsListed([]); setIsVerified(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      issuer,
      date,
      verificationUrl,
      issuerLogoUrl,
      skills: skillsListed,
      isVerified,
      updatedAt: new Date().toISOString()
    };

    try {
      if (editingId) {
        await updateCertification(editingId, payload);
      } else {
        await addCertification({ ...payload, createdAt: new Date().toISOString() });
      }

      resetForm();
      fetchCerts();
    } catch (error) {
      console.error("Error saving certification:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cert) => {
    setEditingId(cert.id);
    setTitle(cert.title || '');
    setIssuer(cert.issuer || '');
    setDate(cert.date || cert.duration || '');
    setVerificationUrl(cert.verificationUrl || '');
    setIssuerLogoUrl(cert.issuerLogoUrl || cert.issuerLogo || '');
    setSkillsListed(cert.skills || []);
    setIsVerified(cert.isVerified !== false); // Default to true if undefined
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Revoke this certification?")) return;
    try {
      if (editingId === id) resetForm();
      await deleteCertification(id);
      fetchCerts();
    } catch (error) {
      console.error("Error deleting cert:", error);
    }
  };

  const handleRemoveTag = (tag) => {
    setSkillsListed(skillsListed.filter(t => t !== tag));
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
          <Award className="text-[#d8b4fe] w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Certifications Archive</h2>
          <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">Manage verified credentials & skills</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] space-y-6 shadow-[0_0_40px_rgba(124,58,237,0.05)] relative overflow-visible z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><FileText className="w-3 h-3 text-[#d8b4fe]" /> Certification Name</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="e.g. AWS Solutions Architect" />
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Globe className="w-3 h-3 text-[#d8b4fe]" /> Issuer / Provider</label>
            <input type="text" value={issuer} onChange={e => setIssuer(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="e.g. Amazon Web Services" />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><ImageIcon className="w-3 h-3 text-[#d8b4fe]" /> Issuer Logo (Optional)</label>
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setIssuerLogoUrl(reader.result);
                reader.readAsDataURL(file);
              }
            }} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-[#7c3aed]/20 file:text-[#d8b4fe] hover:file:bg-[#7c3aed]/30" />
            {issuerLogoUrl && (
              <div className="mt-2 inline-flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-xl">
                <img src={issuerLogoUrl} alt="Logo Preview" className="w-8 h-8 object-contain rounded-lg" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Clock className="w-3 h-3 text-[#d8b4fe]" /> Date Earned / Valid Until</label>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="e.g. Sept 2023 - Present" />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-accent/80 tracking-[0.2em] ml-2 flex items-center gap-2"><ImageIcon className="w-3 h-3" /> Certificate Image</label>
            <input type="file" id="certImageUpload" accept="image/*" onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setVerificationUrl(reader.result);
                reader.readAsDataURL(file);
              }
            }} className="w-full bg-background border border-green-500/30 rounded-xl py-4 px-5 text-green-100 focus:outline-none focus:border-green-500/60 transition-all text-sm font-medium placeholder:text-green-100/20 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-green-500/20 file:text-green-400 hover:file:bg-green-500/30" />
            {verificationUrl && (
              <div className="mt-2 inline-flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-xl">
                <img src={verificationUrl} alt="Certificate Preview" className="h-16 object-contain rounded-lg" />
              </div>
            )}
          </div>

          <div className="space-y-3 relative z-20 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-accent/80 tracking-[0.2em] ml-2 flex items-center gap-2"><Briefcase className="w-3 h-3" /> Topics / Skills Gained</label>
            <input 
              type="text" value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchTerm.trim() !== '') {
                  e.preventDefault();
                  if (!skillsListed.includes(searchTerm.trim())) setSkillsListed([...skillsListed, searchTerm.trim()]);
                  setSearchTerm('');
                }
              }} 
              className="w-full bg-background border border-green-500/30 rounded-xl py-4 px-5 text-green-100 focus:outline-none focus:border-green-500/60 transition-all text-sm font-medium placeholder:text-green-100/20" 
              placeholder="Type a topic (e.g. Routing, Network Security) and press Enter" 
            />
            {skillsListed.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 p-3 bg-green-500/5 rounded-xl border border-green-500/20 min-h-[48px]">
                <AnimatePresence>
                  {skillsListed.map(tag => (
                    <m.span key={tag} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="inline-flex items-center gap-2 px-3 py-1.5 bg-background border border-green-500/30 text-green-300 text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                      {tag} 
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:bg-red-500/20 ml-1 hover:text-red-400 rounded-full p-0.5 transition-colors text-green-300/50"><X size={12} /></button>
                    </m.span>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>

        {/* Verification Status Setup */}
        <div className="p-6 rounded-2xl border border-accent bg-background mt-4 relative z-10 transition-colors duration-300 data-[completed=true]:border-green-500/30 data-[completed=true]:bg-green-500/5" data-completed={isVerified}>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsVerified(!isVerified)}>
            <div>
              <h4 className={`text-sm font-black uppercase tracking-widest ${isVerified ? 'text-green-400' : 'text-accent'}`}>
                {isVerified ? "Status: VERIFIED" : "Status: PENDING VERIFICATION"}
              </h4>
              <p className="text-[10px] max-w-sm text-purple-100/50 mt-1 uppercase font-bold tracking-wider">
                {isVerified ? "Will display the Verified badge proudly." : "Will omit the Verified badge."}
              </p>
            </div>
            <div className={`w-14 h-8 rounded-full flex items-center transition-colors p-1 ${isVerified ? 'bg-green-500/20 border border-green-500/50' : 'bg-surface/20 border border-borderColor'}`}>
               <div className={`w-6 h-6 rounded-full shadow-md transform transition-transform ${isVerified ? 'translate-x-6 bg-green-400' : 'translate-x-0 bg-surface/20'}`} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 relative z-10 border-t border-[#7c3aed]/20 pt-6">
           <button type="submit" disabled={loading} className={`w-full md:w-auto px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-400 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:opacity-90 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all disabled:opacity-50 border-none hover:scale-[1.02] active:scale-[0.98]`}>
             {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : (editingId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />)} 
             {editingId ? "Update Certification" : "Publish Certification"}
           </button>
           {editingId && (
             <button type="button" onClick={resetForm} className="w-full md:w-auto px-6 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center transition-all">Cancel</button>
           )}
        </div>
      </form>

      {/* Database Grid */}
      <div className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.05)]">
         <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-sm font-black uppercase text-white tracking-widest">Verified Database</h3>
            <button onClick={fetchCerts} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/50 hover:text-white">
               <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin text-white' : ''}`} />
            </button>
         </div>

         {fetching && certs.length === 0 ? (
           <div className="flex justify-center py-12"><RefreshCw className="w-8 h-8 animate-spin text-white" /></div>
         ) : certs.length === 0 ? (
           <div className="text-center py-12 bg-[#7c3aed]/5 font-bold uppercase tracking-widest text-[11px] text-white/40 border border-dashed border-[#7c3aed]/30 rounded-2xl">
             No credentials on record.
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
             {certs.map(cert => (
               <div key={cert.id} className="p-6 border border-white/10 rounded-2xl bg-white/5 flex flex-col items-center text-center group hover:border-[#7c3aed]/50 hover:bg-[#7c3aed]/5 transition-all relative">
                 <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                    <button onClick={() => handleEdit(cert)} className="p-2 text-accent bg-accent/10 hover:bg-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-accent/20">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(cert.id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-red-500/20">
                      <Trash2 className="w-4 h-4" />
                    </button>
                 </div>
                 
                 {cert.isVerified && (
                   <div className="absolute top-4 left-4 p-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-2 group/tooltip shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="absolute left-full ml-2 px-2 py-1 bg-[#030014] border border-emerald-500/30 text-emerald-400 text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover/tooltip:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">Verified</span>
                   </div>
                 )}

                 <div className="w-16 h-16 flex items-center justify-center p-3 bg-white/10 border border-white/20 rounded-2xl mb-4 shadow-inner mt-4">
                   {cert.issuerLogo || cert.issuerLogoUrl ? <img src={cert.issuerLogo || cert.issuerLogoUrl} alt={cert.title} className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" /> : <Award className="w-8 h-8 text-[#d8b4fe]/50" />}
                 </div>
                 
                 <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4 leading-relaxed">{cert.title}</h4>
                 {cert.issuer && <p className="text-[10px] font-bold uppercase tracking-widest text-[#d8b4fe] mb-6 border-b border-white/10 pb-4 w-full">{cert.issuer}</p>}
                 
                 <a href={cert.verificationUrl} target="_blank" rel="noreferrer" className="mt-auto flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:text-[#030014] hover:bg-emerald-400 text-[10px] font-black tracking-widest uppercase rounded-lg border border-emerald-500/30 transition-all">
                   View <ImageIcon size={12} />
                 </a>
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
};

export default CertsManager;

