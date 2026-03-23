import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { m, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Plus, RefreshCw, FileText, Code, CheckCircle2, CircleDashed, Globe, Briefcase, Clock, Search, X } from 'lucide-react';

const TrainingManager = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Form State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [provider, setProvider] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [skillsListed, setSkillsListed] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTrainings = async () => {
    setFetching(true);
    try {
      const snap = await getDocs(collection(db, "trainings"));
      setTrainings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching trainings:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchTrainings(); }, []);

  const resetForm = () => {
    setEditingId(null); setTitle(''); setProvider(''); setDuration('');
    setDescription(''); setSkillsListed([]); setIsCompleted(false);
    setCertificateUrl(''); setSearchTerm('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      provider,
      duration,
      description,
      skillsListed,
      isCompleted,
      certificateUrl,
      status: "Actively Relevant",
      updatedAt: new Date().toISOString()
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "trainings", editingId), payload);
      } else {
        await addDoc(collection(db, "trainings"), { ...payload, createdAt: new Date().toISOString() });
      }

      resetForm();
      fetchTrainings();
    } catch (error) {
      console.error("Error saving training:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (training) => {
    setEditingId(training.id);
    setTitle(training.title || '');
    setProvider(training.provider || '');
    setDuration(training.duration || '');
    setDescription(training.description || '');
    setSkillsListed(training.skillsListed || []);
    setIsCompleted(training.isCompleted || false);
    setCertificateUrl(training.certificateUrl || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this training record?")) return;
    try {
      if (editingId === id) resetForm();
      await deleteDoc(doc(db, "trainings", id));
      fetchTrainings();
    } catch (error) {
      console.error("Error deleting training:", error);
    }
  };

  const handleRemoveTag = (tag) => {
    setSkillsListed(skillsListed.filter(t => t !== tag));
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
            <Briefcase className="text-[#d8b4fe] w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">{editingId ? 'Modify Training' : 'Log Training / Internship'}</h2>
            <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">Manage ongoing & certified skill pipelines</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] space-y-6 shadow-[0_0_40px_rgba(124,58,237,0.05)] relative overflow-visible z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><FileText className="w-3 h-3 text-[#d8b4fe]" /> Training Name</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="AI Engineering Track" />
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Globe className="w-3 h-3 text-[#d8b4fe]" /> Provider / Institution</label>
            <input type="text" value={provider} onChange={e => setProvider(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="e.g. NTI, Huawei" />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><Clock className="w-3 h-3 text-[#d8b4fe]" /> Duration</label>
            <input type="text" value={duration} onChange={e => setDuration(e.target.value)} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="e.g. 3 Months, 120 Hours" />
          </div>

          <div className="space-y-3 relative z-10 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2 flex items-center gap-2"><FileText className="w-3 h-3 text-[#d8b4fe]" /> Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold resize-none placeholder:text-muted/40" placeholder="Briefly describe the topics covered..." />
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

          <div className="space-y-3 relative z-10 md:col-span-2">
            <label className="text-[10px] font-black uppercase text-accent tracking-[0.2em] ml-2 flex items-center gap-2">
               <CheckCircle2 className="w-3 h-3" /> Certificate Link
            </label>
            <input 
               type="text" 
               value={certificateUrl} 
               onChange={e => setCertificateUrl(e.target.value)} 
               className="w-full bg-background border border-green-500/30 rounded-xl py-4 px-5 text-green-100 focus:outline-none focus:border-green-500/60 transition-all text-sm font-medium placeholder:text-green-100/20" 
               placeholder="https://credly.com/badges/..." 
            />
          </div>

        </div>

        {/* Verification Status Setup */}
        <div className="p-6 rounded-2xl border border-accent bg-background mt-4 relative z-10 transition-colors duration-300 data-[completed=true]:border-emerald-500/30 data-[completed=true]:bg-emerald-500/5" data-completed={isCompleted}>
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsCompleted(!isCompleted)}>
            <div>
              <h4 className={`text-sm font-black uppercase tracking-widest ${isCompleted ? 'text-emerald-400' : 'text-accent'}`}>
                {isCompleted ? "Status: COMPLETED & VERIFIED" : "Status: ONGOING / IN PROGRESS"}
              </h4>
              <p className="text-[10px] max-w-sm text-purple-100/50 mt-1 uppercase font-bold tracking-wider">
                {isCompleted ? "This training will automatically sync to your certificates section." : "This training is still ongoing."}
              </p>
            </div>
            <div className={`w-14 h-8 rounded-full flex items-center transition-colors p-1 ${isCompleted ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-surface/20 border border-borderColor'}`}>
               <div className={`w-6 h-6 rounded-full shadow-md transform transition-transform ${isCompleted ? 'translate-x-6 bg-emerald-400' : 'translate-x-0 bg-surface/20'}`} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 relative z-10 border-t border-[#7c3aed]/20 pt-6">
           <button type="submit" disabled={loading} className={`w-full md:w-auto px-10 py-5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:opacity-90 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all disabled:opacity-50 border-none hover:scale-[1.02] active:scale-[0.98]`}>
             {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : (editingId ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />)} 
             {editingId ? "Update Training" : "Log Training Track"}
           </button>
           {editingId && (
             <button type="button" onClick={resetForm} className="w-full md:w-auto px-6 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center transition-all">Cancel</button>
           )}
        </div>
      </form>

      {/* Database Grid */}
      <div className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.05)] z-10">
         <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-sm font-black uppercase text-white tracking-widest">Training Pipeline</h3>
            <button onClick={fetchTrainings} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/50 hover:text-white">
               <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin text-white' : ''}`} />
            </button>
         </div>

         {fetching && trainings.length === 0 ? (
           <div className="flex justify-center py-20"><RefreshCw className="w-8 h-8 animate-spin text-accent" /></div>
         ) : trainings.length === 0 ? (
           <div className="text-center py-20 bg-background font-bold uppercase tracking-widest text-[11px] text-accent/30 border border-dashed border-accent rounded-2xl">
             No training records found.
           </div>
         ) : (
           <div className="overflow-x-auto relative z-10">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-accent text-[10px] font-black uppercase tracking-[0.2em] text-accent/50">
                   <th className="py-5 px-6">Track / Pipeline</th>
                   <th className="py-5 px-6">Provider</th>
                   <th className="py-5 px-6 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-purple-500/10">
                 {trainings.map(tr => (
                   <tr key={tr.id} className="hover:bg-background transition-colors group">
                     <td className="py-5 px-6">
                        <span className="text-sm font-black text-accent uppercase tracking-wider">{tr.title}</span><br />
                        <span className="text-[10px] font-bold text-accent/30 uppercase tracking-widest">{tr.duration}</span>
                        {tr.isCompleted && (
                          <span className="ml-2 inline-flex items-center gap-1 text-[8px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                            Verified Sync
                          </span>
                        )}
                      </td>
                     <td className="py-5 px-6">
                        <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">{tr.provider}</span>
                     </td>
                     <td className="py-5 px-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <button onClick={() => handleEdit(tr)} className="p-3 bg-accent/10 hover:bg-accent/20 text-accent rounded-xl transition-all border border-accent opacity-0 group-hover:opacity-100"><Edit2 className="w-4 h-4" /></button>
                         <button onClick={() => handleDelete(tr.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all border border-red-500/20 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         )}
      </div>
    </div>
  );
};

export default TrainingManager;
