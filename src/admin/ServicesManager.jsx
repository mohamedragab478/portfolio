import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Settings, Plus, RefreshCw, Trash2, Hexagon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';

const POPULAR_ICONS = ['Code', 'Database', 'Server', 'Cpu', 'Layers', 'Zap', 'Globe', 'Smartphone', 'Monitor', 'Shield', 'Activity', 'Terminal', 'Cloud', 'Network', 'Lock', 'Key', 'Briefcase', 'Star', 'Heart', 'Award', 'Hexagon', 'Box', 'Workflow', 'Share2', 'Settings', 'Search'];

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({ iconName: '', title: '', description: '' });
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredIcons = formData.iconName.trim() === '' 
    ? POPULAR_ICONS 
    : Object.keys(LucideIcons).filter(k => /^[A-Z]/.test(k) && k.toLowerCase().includes(formData.iconName.toLowerCase())).slice(0, 30);

  const fetchServices = async () => {
    setFetching(true);
    try {
      const snap = await getDocs(collection(db, "services"));
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "services"), { ...formData, createdAt: new Date().toISOString() });
      setFormData({ iconName: '', title: '', description: '' });
      fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this service module?")) return;
    try {
      await deleteDoc(doc(db, "services", id));
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30">
          <Settings className="text-[#d8b4fe] w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7c3aed] to-[#d8b4fe]">Services Engine</h2>
          <p className="text-muted/60 text-xs font-bold tracking-widest uppercase mt-1">Manage functional capabilities</p>
        </div>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] space-y-6 shadow-[0_0_40px_rgba(124,58,237,0.05)] relative overflow-visible">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c3aed]/5 rounded-full blur-[80px] pointer-events-none" />
        <h3 className="text-sm font-black uppercase text-white tracking-widest mb-6 relative z-10">Deploy New Service</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
          
          <div className="space-y-3 relative">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">Lucide Icon Name</label>
            <div className="relative">
              <input type="text" value={formData.iconName} 
                onChange={e => {
                  setFormData({...formData, iconName: e.target.value});
                  setShowDropdown(true);
                }} 
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="e.g. Code, Database, Globe" />
              
              <AnimatePresence>
                {showDropdown && filteredIcons.length > 0 && (
                  <m.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 bg-surface border border-accent rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden max-h-48 overflow-y-auto">
                    {filteredIcons.map(icon => {
                      const IconComp = LucideIcons[icon] || LucideIcons.Code;
                      return (
                        <div key={icon} onMouseDown={(e) => e.preventDefault()} onClick={() => { setFormData({...formData, iconName: icon}); setShowDropdown(false); }} className="px-5 py-3 text-sm font-bold tracking-wider text-purple-100 hover:bg-accent/20 hover:text-accent cursor-pointer transition-colors border-b border-accent last:border-0 flex items-center gap-3">
                          <IconComp className="w-4 h-4 text-accent" />
                          {icon}
                        </div>
                      )
                    })}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">Service Title</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold placeholder:text-muted/40" placeholder="e.g. Backend Architecture" />
          </div>
        </div>
        <div className="space-y-3 relative z-10">
          <label className="text-[10px] font-black uppercase text-white/50 tracking-[0.2em] ml-2">Operational Description</label>
          <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#d8b4fe] focus:bg-[#7c3aed]/10 transition-all text-sm font-bold resize-none placeholder:text-muted/40" placeholder="Elaborate on the module capabilities..." />
        </div>
        <button type="submit" disabled={loading} className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] hover:opacity-90 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all disabled:opacity-50 border-none shadow-lg shadow-[#ec4899]/20 hover:scale-[1.02] active:scale-[0.98]">
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          {loading ? "Deploying..." : "Deploy Service"}
        </button>
      </form>

      {/* List */}
      <div className="bg-[#7c3aed]/5 backdrop-blur-md border border-[#7c3aed]/20 p-8 rounded-[2.5rem] relative overflow-hidden shadow-[0_0_40px_rgba(124,58,237,0.05)]">
         <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-sm font-black uppercase text-white tracking-widest">Active Services</h3>
            <button onClick={fetchServices} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/50 hover:text-white">
               <RefreshCw className={`w-5 h-5 ${fetching ? 'animate-spin text-white' : ''}`} />
            </button>
         </div>

         {fetching && services.length === 0 ? (
           <div className="flex justify-center py-12"><RefreshCw className="w-8 h-8 animate-spin text-white" /></div>
         ) : services.length === 0 ? (
           <div className="text-center py-12 bg-transparent font-bold uppercase tracking-widest text-[11px] text-muted/40 border border-dashed border-[#7c3aed]/30 rounded-[1.5rem]">
             No service modules initialized.
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
             {services.map(srv => (
               <div key={srv.id} className="p-6 border border-[#7c3aed]/20 rounded-[1.5rem] bg-[#7c3aed]/5 flex flex-col justify-between group hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/10 transition-all duration-500 shadow-lg shadow-[#7c3aed]/5 backdrop-blur-md">
                 <div>
                    <div className="flex justify-between items-start mb-4">
                      {(() => {
                        if (srv.iconUrl) {
                          return (
                            <div className="p-2.5 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 flex items-center justify-center">
                              <img src={srv.iconUrl} alt={srv.title} className="w-5 h-5 object-contain" onError={(e) => { e.target.style.display='none'; e.target.nextElementSibling.style.display='block'; }} />
                              <LucideIcons.Zap className="w-5 h-5 text-[#d8b4fe] hidden" />
                            </div>
                          );
                        }
                        const IconComp = LucideIcons[srv.iconName] || LucideIcons.Zap;
                        return (
                          <div className="p-2.5 bg-[#7c3aed]/10 rounded-xl border border-[#7c3aed]/30 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                            <IconComp className="w-5 h-5 text-[#d8b4fe]" />
                          </div>
                        );
                      })()}
                      <button onClick={() => handleDelete(srv.id)} className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-red-500/20">
                       <Trash2 className="w-4 h-4" />
                     </button>
                   </div>
                   <h4 className="text-lg font-black text-white uppercase tracking-wider mb-2">{srv.title}</h4>
                   <p className="text-sm font-medium text-white/60 line-clamp-3">{srv.description}</p>
                 </div>
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
};

export default ServicesManager;
